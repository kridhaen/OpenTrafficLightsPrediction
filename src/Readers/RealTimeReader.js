const n3 = require('n3');

const PredictionCalculator = require('../Predictor/PredicionCalculator.js');
const Downloader = require('./Downloader.js');
const Helper = require('./Helper.js');

const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

class RealTimeReader{
    constructor(distributionStore, predictionPublisher){
        this.lastLatest = undefined;
        this.DATASET_URL = 'https://lodi.ilabt.imec.be/observer/rawdata/latest';
        this.phaseStart = {}; //om de start van een fase te detecteren, voor iedere observatie
        this.lastPhase = {}; //om de laatst tegengekomen fase op te slaan, voor iedere observatie
        this.distributionStore = distributionStore;
        this.predictionPublisher = predictionPublisher;
    }

    //latest -> green, prev: blue
    async handleLatest(latest){
        console.log("comparing");
        if(this.lastLatest){
            if(latest.length != this.lastLatest.length){    //different latest
                this.lastLatest = latest;
                console.log("\x1b[36m","different latest","\x1b[0m");
                //TODO: doe iets met de real-time fragmenten -> voorspelling maken en doorgeven aan publisher
                let store = await Helper.parseAndStoreQuads(latest);
                let signalGroups = [];

                await store.getQuads(null, namedNode('http://www.w3.org/2000/01/rdf-schema#type'), namedNode('https://w3id.org/opentrafficlights#Signalgroup')).forEach(quad => {
                    signalGroups.push(quad.subject.value);
                    if(!this.phaseStart[quad.subject.value]){
                        this.phaseStart[quad.subject.value] = -1;
                        this.lastPhase[quad.subject.value] = -1;
                    }
                });

                //console.log(signalGroups);

                //overlopen van alle observaties in een fragment, gesorteerd met oudste eerst
                await store.getQuads(null, namedNode('http://www.w3.org/ns/prov#generatedAtTime'), null).sort(function(a, b) {
                        a = new Date(a.object.value).getTime();
                        b = new Date(b.object.value).getTime();

                        return a<b ? -1 : a>b ? 1 : 0;
                    }
                ).forEach((observation) => {
                    let generatedAtTime = observation.object.value;

                    signalGroups.forEach(signalGroup => {
                        let signalState = store.getQuads(namedNode(signalGroup), namedNode('https://w3id.org/opentrafficlights#signalState'), null, observation.subject)[0]; //zit altijd 1 of geen in, als de signalstate is aangepast op generatedAtTime voor de opgegeven signalgroup
                        if(signalState) {
                            let minEndTime = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#minEndTime'), null, observation.subject)[0].object.value;
                            let maxEndTime = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#maxEndTime'), null, observation.subject)[0].object.value;
                            let signalPhase = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#signalPhase'), null, observation.subject)[0].object.value;

                            let observationUTC = {};
                            let generatedAtTimeDate = new Date(generatedAtTime);
                            observationUTC["hour"] = generatedAtTimeDate.getUTCHours();
                            observationUTC["month"] = generatedAtTimeDate.getUTCMonth();
                            observationUTC["minute"] = generatedAtTimeDate.getUTCMinutes();
                            observationUTC["day"] = generatedAtTimeDate.getUTCDay();    //0 == sunday
                            observationUTC["year"] = generatedAtTimeDate.getUTCFullYear();

                            //TODO: voorspelling berekening
                            let likelyTime = -1;
                            if(this.phaseStart[signalGroup] !== -1 && this.lastPhase[signalGroup] !== -1){
                                if(this.lastPhase[signalGroup] !== signalPhase){ //faseovergang
                                    if(this.distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]) {
                                        let predictedDuration = PredictionCalculator.calculateMeanDuration(this.distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]);
                                        likelyTime = new Date(this.phaseStart[signalGroup]) + predictedDuration;
                                        store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), likelyTime, observation.subject);
                                    }
                                    //klaarzetten voor volgende fase
                                    this.lastPhase[signalGroup] = signalPhase;
                                    this.phaseStart[signalGroup] = generatedAtTime;
                                }
                                else{
                                    if(this.distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]) {
                                        let predictedDuration = PredictionCalculator.calculateMeanDuration(this.distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]);
                                        likelyTime = new Date(this.phaseStart[signalGroup]) + predictedDuration;
                                        store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), likelyTime, observation.subject);
                                    }
                                }
                            }
                            else{
                                if(this.phaseStart[signalGroup] === -1 && this.lastPhase[signalGroup] === -1){
                                    this.lastPhase[signalGroup] = signalPhase;
                                }
                                else if(this.lastPhase[signalGroup] !== signalPhase){
                                    this.lastPhase[signalGroup] = signalPhase;
                                    this.phaseStart[signalGroup] = generatedAtTime;
                                }
                            }
                        }
                    });

                });
                await this.writeN3Store(store);
            }
        }
        else {
            this.lastLatest = latest;
        }
    }

    writeN3Store(store){
        return new Promise(async (resolve) => {
            const writer = new n3.Writer(store);
            for(let quad of store.getQuads()){
                writer.addQuad(quad);
            }
            await writer.end((error, result) => {this.predictionPublisher.setLatestEndpoint(result); resolve(result)});
        });
    }

    getLatestCyclic(cycleTime){
        console.log("running");
        let timer = cycleTime;
        let decrease = cycleTime > 100000 ? 10000 : 1000;
        setInterval(() => {
            console.log("...............running:"+Date.now()+"...............getting next fragment in: "+timer/1000+" s");
            timer -= decrease;
            if(timer <= 0){
                timer = cycleTime;
                Downloader.download(this.DATASET_URL)
                    .then((res) => { console.log("\x1b[36m","downloaded latest fragment","\x1b[0m"); return res})
                    .then((res) => this.handleLatest(res))
                    .catch(e => console.log(e));
                console.log("\x1b[35m","ready for next latest","\x1b[0m");
            }
        }, decrease);
    }

}

module.exports = RealTimeReader;