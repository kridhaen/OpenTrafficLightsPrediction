const n3 = require('n3');
const Helper = require('./Helper.js');
const { DataFactory } = n3;
const { namedNode } = DataFactory;

//expect recieved fragments to be in ordered by time, increasing (oldest first)
class FragmentParser{
    constructor(){
        this.phaseStart = {}; //om de start van een fase te detecteren, voor iedere observatie
        this.lastPhase = {}; //om de laatst tegengekomen fase op te slaan, voor iedere observatie
        this.lastMaxEndTime = {};   //als maxEndTime van de vorige meting kleiner is dan van de huidige, en de fase is niet aangepast, dan ontbreken waarschijnlijk enkele fragmenten
        this.lastMinEndTime = {};
        this.lastObservation = {};
    }

    static _initReturnObject(){
        return {
            "signalGroup": undefined,
            "signalPhase": undefined,
            "signalState": undefined,
            "generatedAtTime": undefined,
            "minEndTime": undefined,
            "maxEndTime": undefined,
            "observation": undefined,
            "store": undefined,
            "prefixes": undefined,
            "phaseStart": undefined,
            "lastPhaseStart": undefined,
            "lastPhase": undefined
        };
    }

    static _setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, prefixes, phaseStart, lastPhaseStart, lastPhase){
        returnObject["signalGroup"] = signalGroup;
        returnObject["signalPhase"] = signalPhase;
        returnObject["signalState"] = signalState;
        returnObject["generatedAtTime"] = generatedAtTime;
        returnObject["minEndTime"] = minEndTime;
        returnObject["maxEndTime"] = maxEndTime;
        returnObject["observation"] = observation;
        returnObject["store"] = store;
        returnObject["prefixes"] = prefixes;
        returnObject["phaseStart"] = phaseStart;
        returnObject["lastPhaseStart"] = lastPhaseStart;
        returnObject["lastPhase"] = lastPhase;
    };

    async handleFragment(fragment, onPhaseChange, onSamePhase, beforePhaseChangeCheck, afterHandle){
        let returnObject = FragmentParser._initReturnObject();
        let { store, prefixes } = await Helper.parseAndStoreQuads(fragment);

        let signalGroups = [];

        await store.getQuads(null, namedNode('http://www.w3.org/2000/01/rdf-schema#type'), namedNode('https://w3id.org/opentrafficlights#Signalgroup')).forEach(quad => {
            signalGroups.push(quad.subject.value);
            if(!this.phaseStart[quad.subject.value]){
                this.phaseStart[quad.subject.value] = -1;
            }
            if(!this.lastPhase[quad.subject.value]){
                this.lastPhase[quad.subject.value] = -1;
            }
            if(!this.lastMaxEndTime[quad.subject.value]){
                this.lastMaxEndTime[quad.subject.value] = -1;
            }
            if(!this.lastMinEndTime[quad.subject.value]){
                this.lastMinEndTime[quad.subject.value] = -1;
            }
            if(!this.lastObservation[quad.subject.value]){
                this.lastObservation[quad.subject.value] = undefined;
            }
        });

        //overlopen van alle observaties in een fragment, gesorteerd met oudste eerst
        await store.getQuads(null, namedNode('http://www.w3.org/ns/prov#generatedAtTime'), null).sort(function(a, b) {
                a = new Date(a.object.value).getTime();
                b = new Date(b.object.value).getTime();

                return a<b ? -1 : a>b ? 1 : 0;
            }
        ).forEach((observation) => {
            let generatedAtTime = observation.object.value;

            //TODO: in plaats van afronden, bij vergelijking +1 en -1 ook nog hetzelfde rekenen (interval)
            let tempGAT = Math.round((new Date(generatedAtTime).getTime())/1000)*1000;   //afronden alle data tot op seconde, anders soms precies kleine verschillen op milliseconden
            generatedAtTime = new Date(tempGAT).toISOString();

            signalGroups.forEach(signalGroup => {
                let error = 0;
                if (this.lastObservation[signalGroup]) {
                    if (new Date(this.lastObservation[signalGroup]).getTime() > new Date(generatedAtTime).getTime()) {
                        console.log("last observation bigger than new: " + this.lastObservation[signalGroup] + " - " + generatedAtTime);
                        //TODO: hoe kan dit? Duplicate observaties?
                        error = 1;
                    }
                }
                if (!error) {
                    this.lastObservation[signalGroup] = generatedAtTime;

                    let signalState = store.getQuads(namedNode(signalGroup), namedNode('https://w3id.org/opentrafficlights#signalState'), null, observation.subject)[0]; //zit altijd 1 of geen in, als de signalstate is aangepast op generatedAtTime voor de opgegeven signalgroup
                    if (signalState) {
                        let minEndTime = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#minEndTime'), null, observation.subject)[0].object.value;
                        let maxEndTime = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#maxEndTime'), null, observation.subject)[0].object.value;
                        let signalPhase = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#signalPhase'), null, observation.subject)[0].object.value;

                        let tempMET = Math.round((new Date(minEndTime).getTime()) / 1000) * 1000; //afronden alle data tot op seconde, anders soms precies kleine verschillen op milliseconden
                        minEndTime = (new Date(tempMET)).toISOString();
                        tempMET = Math.round((new Date(maxEndTime).getTime()) / 1000) * 1000;
                        maxEndTime = (new Date(tempMET)).toISOString();

                        if (this.phaseStart[signalGroup] !== -1 && this.lastPhase[signalGroup] !== -1) {
                            if (beforePhaseChangeCheck) { //dangerous, not checked validity of observation before phase change, data could be invalid (see checks)
                                FragmentParser._setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, prefixes, undefined, this.phaseStart[signalGroup], this.lastPhase[signalGroup]);
                                beforePhaseChangeCheck(returnObject);
                            }
                            if (this.lastPhase[signalGroup] !== signalPhase) {
                                //phase change
                                if((this.lastMaxEndTime[signalGroup] !== -1 && generatedAtTime > this.lastMaxEndTime[signalGroup])
                                    || (this.lastMinEndTime[signalGroup] !== -1 && generatedAtTime < this.lastMinEndTime[signalGroup])){
                                    //phase can't end after maxEndTime and before minEndTime, if this is the case, it is not the same phase or an error occurred in the data
                                    this.lastPhase[signalGroup] = -1;   //reset
                                    this.phaseStart[signalGroup] = -1;
                                }
                                else{
                                    if (onPhaseChange) {
                                        FragmentParser._setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, prefixes, generatedAtTime, this.phaseStart[signalGroup], this.lastPhase[signalGroup]);
                                        onPhaseChange(returnObject);
                                    }

                                    //prepare for next phase
                                    this.lastPhase[signalGroup] = signalPhase;
                                    this.phaseStart[signalGroup] = generatedAtTime;
                                }
                            }
                            else {
                                //same phase
                                if ((this.lastMaxEndTime[signalGroup] !== -1 && maxEndTime > this.lastMaxEndTime[signalGroup])
                                    || (this.lastMinEndTime[signalGroup] !== -1 && minEndTime < this.lastMinEndTime[signalGroup])) {
                                    //maxEndTime can not increase for same phase, minEndTime can not decrease, if this is the case, it is not the same phase or an error occurred in the data
                                    this.lastPhase[signalGroup] = -1;   //reset
                                    this.phaseStart[signalGroup] = -1;
                                } else {
                                    if (onSamePhase) {
                                        FragmentParser._setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, prefixes, this.phaseStart[signalGroup], this.phaseStart[signalGroup], this.lastPhase[signalGroup]);
                                        onSamePhase(returnObject);
                                    }
                                }
                            }
                        }
                        else {
                            if (this.phaseStart[signalGroup] === -1 && this.lastPhase[signalGroup] === -1) {
                                this.lastPhase[signalGroup] = signalPhase;
                            } else if (this.lastPhase[signalGroup] !== signalPhase) {
                                this.lastPhase[signalGroup] = signalPhase;
                                this.phaseStart[signalGroup] = generatedAtTime;
                            }
                        }
                        this.lastMaxEndTime[signalGroup] = maxEndTime;  //maximale eindtijd laatste fragment
                        this.lastMinEndTime[signalGroup] = minEndTime; //minimale eindtijd laatste fragment
                    }
                }
            });

        });
        if(afterHandle){
            FragmentParser._setReturnObject(returnObject, undefined, undefined, undefined, undefined, undefined, undefined, undefined, store, prefixes, undefined, undefined);
            afterHandle(returnObject);
        }
    }

}

module.exports = FragmentParser;