const n3 = require('n3');

const Downloader = require('./Downloader.js');
const PredictionManager = require('../Predictor/PredictionManager.js');
const Helper = require('./Helper.js');

const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

class RealTimeReader{
    constructor(onLatest){
        this.lastLatest = undefined;
        this.DATASET_URL = 'https://lodi.ilabt.imec.be/observer/rawdata/latest';
        // this.phaseStart = {}; //om de start van een fase te detecteren, voor iedere observatie
        // this.lastPhase = {}; //om de laatst tegengekomen fase op te slaan, voor iedere observatie
        // this.distributionStore = distributionStore;
        // this.predictionPublisher = predictionPublisher;
        // this.fragmentParser = fragmentParser;
        // this.afterHandle = this.afterHandle.bind(this);
        // this.beforePhaseChangeCheck = this.beforePhaseChangeCheck.bind(this);
        this.onLatest = onLatest;
    }

    //latest -> green, prev: blue
    async handleLatest(latest){
        console.log("comparing");
        console.log(latest);
        if(this.lastLatest){
            if(latest.length != this.lastLatest.length){    //different latest
                this.lastLatest = latest;
                console.log("\x1b[36m","different latest","\x1b[0m");
                await this.onLatest(latest);
                //await this.fragmentParser.handleFragment(latest, undefined, undefined, this.beforePhaseChangeCheck, this.afterHandle);
                console.log("\x1b[36m","latest handling complete","\x1b[0m")
            }
        }
        else {
            this.lastLatest = latest;
        }
    }

    // f = async (latest) => {
    //     await fragmentParser.handleFragment(latest, undefined, undefined,
    //         (signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observationUTC, observation, store, phaseStart, lastPhase) => {
    //             PredictionManager.predictLikelyTime(signalGroup, signalPhase, signalState, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
    //                 store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), literal(likelyTime,namedNode("http://www.w3.org/2001/XMLSchema#date")), observation.subject);
    //             })
    //         },
    //         async (store) => {
    //             await Helper.writeN3Store(store).then((result) => {predictionPublisher.setLatestEndpoint(result)});
    //         }
    //     );
    // };

    // beforePhaseChangeCheck(signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observationUTC, observation, store, phaseStart, lastPhase){
    //     PredictionManager.predictLikelyTime(signalGroup, signalPhase, signalState, minEndTime, maxEndTime, phaseStart, this.distributionStore, (likelyTime) => {
    //         store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), literal(likelyTime,namedNode("http://www.w3.org/2001/XMLSchema#date")), observation.subject);
    //     });
    // }
    //
    // async afterHandle(store){
    //     await Helper.writeN3Store(store).then((result) => {this.predictionPublisher.setLatestEndpoint(result)});
    // }

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
                    .then((res) => { console.log("\x1b[35m","downloaded latest fragment","\x1b[0m"); return res})
                    .then((res) => this.handleLatest(res))
                    .catch(e => console.log(e));
                console.log("\x1b[35m","ready for next latest","\x1b[0m");
            }
        }, decrease);
    }

}

module.exports = RealTimeReader;