const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const n3 = require('n3');
const https = require("https");
const PredictionCalculator = require('../Predictor/PredicionCalculator.js');

const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class RealTimeReader{
    constructor(distributionStore, predictionPublisher){
        this.lastLatest = undefined;
        this.DATASET_URL = 'https://lodi.ilabt.imec.be/observer/rawdata/latest';
        this.phaseStart = {}; //om de start van een fase te detecteren, voor iedere observatie
        this.lastPhase = {}; //om de laatst tegengekomen fase op te slaan, voor iedere observatie
        this.distributionStore = distributionStore;
        this.predictionPublisher = predictionPublisher;
    }

    download(_url){
        return new Promise((resolve,reject) => {

            https.get(_url, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                console.log("\x1b[31m\x1b[47m",err,"\x1b[0m"); reject(err);
                reject(err);
            });

        });
    }

    download2(_url){
        console.log("\x1b[32m","downloading: "+_url,"\x1b[0m");
        //const caAgent = new https.Agent({ca: rootca});
        return new Promise((resolve,reject) => {

            fetch(_url, { timeout: 2000000 })
                .then(function(response) {
                    resolve(response.text());
                })
                .catch(err => {console.log("\x1b[31m\x1b[47m",err,"\x1b[0m"); reject(err)});
        });
    }

    download1(_url){
        console.log("\x1b[32m","downloading: "+_url,"\x1b[0m");
        const httpAgent = new https.Agent({ rejectUnauthorized: false });
        return new Promise((resolve,reject) => {

            axios.get(_url, {httpAgent})
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(err => {console.log("\x1b[31m\x1b[47m",err,"\x1b[0m"); reject(err)});
        });
    }

    parseAndStoreQuads(_doc) {
        return new Promise(resolve => {
            const parser = new n3.Parser();
            const store = new n3.Store();
            parser.parse(_doc, (error, quad, prefixes) => {
                if (quad)
                    store.addQuad(quad);
                else
                    return resolve(store);
            });
        })
    }

    //latest -> green, prev: blue
    async handleLatest(latest){
        console.log("comparing");
        console.log(latest);
        if(this.lastLatest){
            if(latest.length != this.lastLatest.length){    //different latest
                this.lastLatest = latest;
                console.log("\x1b[36m","different latest","\x1b[0m");
                //TODO: doe iets met de real-time fragmenten -> voorspelling maken en doorgeven aan publisher
                let store = await this.parseAndStoreQuads(latest);
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
                                    console.log(signalGroup);
                                    let test = this.distributionStore.get('fd')[signalGroup];
                                    console.log(test);
                                    if(this.distributionStore.get('fd')[signalGroup][signalPhase]) {
                                        let predictedDuration = PredictionCalculator.calculateMeanDuration(this.distributionStore.get('fd')[signalGroup][signalPhase]);
                                        likelyTime = new Date(this.phaseStart[signalGroup]) + predictedDuration;

                                        let x = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#minEndTime'), null, observation.subject)[0];
                                        console.log(x);
                                        store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), likelyTime, observation.subject);
                                    }
                                    //klaarzetten voor volgende fase
                                    this.lastPhase[signalGroup] = signalPhase;
                                    this.phaseStart[signalGroup] = generatedAtTime;
                                }
                                else{
                                    if(this.distributionStore.get('fd')[signalGroup][signalPhase]) {
                                        let predictedDuration = PredictionCalculator.calculateMeanDuration(this.distributionStore.get('fd')[signalGroup][signalPhase]);
                                        likelyTime = new Date(this.phaseStart[signalGroup]) + predictedDuration;

                                        let x = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#minEndTime'), null, observation.subject)[0];
                                        console.log(x);
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

                const writer = new n3.Writer(store);
                await writer.end((error, result) => {this.predictionPublisher.setLatestEndpoint(result); console.log(result)});

            }
        }
        else {
            this.lastLatest = latest;
        }
    }

    getLatestCyclic(cycleTime){
        console.log("running");
        setInterval(() => { //changed interval to every 3 hours get all previous files
            //try{
            this.download(this.DATASET_URL)
                .then((res) => { console.log("\x1b[36m","downloaded latest fragment","\x1b[0m"); return res})
                .then((res) => this.handleLatest(res))
                .catch(e => console.log(e));
            console.log("\x1b[35m","ready for next latest","\x1b[0m");
        }, cycleTime); //3 hour = 10800000 seconds, 3600000 = 1 hour

        //prevent termination of program when not using interval
        let timer = cycleTime;
        let decrease = cycleTime > 100000 ? 10000 : 1000;
        setInterval(() => {
            console.log("...............running:"+Date.now()+"...............getting next fragment in: "+timer/1000+" s");
            timer -= decrease;
            if(timer <= 0){
                timer = cycleTime;
            }
        }, decrease);
    }

}

module.exports = RealTimeReader;