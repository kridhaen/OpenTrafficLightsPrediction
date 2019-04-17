const n3 = require('n3');
const Helper = require('./Helper.js');
const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

//expect recieved fragments to be in ordered by time, increasing (oldest first)
class FragmentParser{
    constructor(){
        this.phaseStart = {}; //om de start van een fase te detecteren, voor iedere observatie
        this.lastPhase = {}; //om de laatst tegengekomen fase op te slaan, voor iedere observatie
        this.lastMaxEndTime = {};   //als maxEndTime van de vorige meting kleiner is dan van de huidige, en de fase is niet aangepast, dan ontbreken waarschijnlijk enkele fragmenten
    }

    static initReturnObject(){
        return {
            "signalGroup": undefined,
            "signalPhase": undefined,
            "signalState": undefined,
            "generatedAtTime": undefined,
            "minEndTime": undefined,
            "maxEndTime": undefined,
            "observationUTC": undefined,
            "observation": undefined,
            "store": undefined,
            "prefixes": undefined,
            "phaseStart": undefined,
            "lastPhase": undefined
        };
    }

    static setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observationUTC, observation, store, prefixes, phaseStart, lastPhase){
        returnObject["signalGroup"] = signalGroup;
        returnObject["signalPhase"] = signalPhase;
        returnObject["signalState"] = signalState;
        returnObject["generatedAtTime"] = generatedAtTime;
        returnObject["minEndTime"] = minEndTime;
        returnObject["maxEndTime"] = maxEndTime;
        returnObject["observationUTC"] = observationUTC;
        returnObject["observation"] = observation;
        returnObject["store"] = store;
        returnObject["prefixes"] = prefixes;
        returnObject["phaseStart"] = phaseStart;
        returnObject["lastPhase"] = lastPhase;
    };

    async handleFragment(fragment, onPhaseChange, onSamePhase, beforePhaseChangeCheck, afterHandle){
        let returnObject = FragmentParser.initReturnObject();
        let { store, prefixes } = await Helper.parseAndStoreQuads(fragment);

        let signalGroups = [];

        await store.getQuads(null, namedNode('http://www.w3.org/2000/01/rdf-schema#type'), namedNode('https://w3id.org/opentrafficlights#Signalgroup')).forEach(quad => {
            signalGroups.push(quad.subject.value);
            if(!this.phaseStart[quad.subject.value]){
                this.phaseStart[quad.subject.value] = -1;
                this.lastPhase[quad.subject.value] = -1;
                this.lastMaxEndTime[quad.subject.value] = -1;
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

                    if(this.phaseStart[signalGroup] !== -1 && this.lastPhase[signalGroup] !== -1){
                        if(beforePhaseChangeCheck){
                            FragmentParser.setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observationUTC, observation, store, prefixes, this.phaseStart, this.lastPhase);
                            beforePhaseChangeCheck(returnObject);
                        }
                        if(this.lastPhase[signalGroup] !== signalPhase){ //faseovergang
                            if(onPhaseChange){
                                FragmentParser.setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observationUTC, observation, store, prefixes, this.phaseStart, this.lastPhase);
                                onPhaseChange(returnObject);
                            }

                            //klaarzetten voor volgende fase
                            this.lastPhase[signalGroup] = signalPhase;
                            this.phaseStart[signalGroup] = generatedAtTime;
                        }
                        else{   //zelfde fase
                            if(this.lastMaxEndTime[signalGroup] !== -1 && maxEndTime > this.lastMaxEndTime[signalGroup]){  //volgende maxtime in zelfde fase eindigt later, maar was max, dus ergens iets niet juist -> ongeldig, reset
                                this.lastPhase[signalGroup] = -1;
                                this.phaseStart[signalGroup] = -1;
                            }
                            else{
                                if(onSamePhase){
                                    FragmentParser.setReturnObject(returnObject, signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observationUTC, observation, store, prefixes, this.phaseStart, this.lastPhase);
                                    onSamePhase(returnObject);
                                }
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
                    this.lastMaxEndTime[signalGroup] = maxEndTime;  //maximale eindtijd laatste fragment
                }
            });

        });
        if(afterHandle){
            FragmentParser.setReturnObject(returnObject, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, store, prefixes, undefined, undefined);
            afterHandle(returnObject);
        }
    }

}

module.exports = FragmentParser;