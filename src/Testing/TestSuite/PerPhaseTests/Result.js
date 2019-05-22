let PredictionManager = require("../../../Predictor/PredictionManager.js");
let Helper = require("../../../Readers/Helper.js");
const PredictionCalculator = require('../../../Predictor/PredictionCalculator.js');
const DistributionManager = require('../../../Distributions/DistributionManager.js');
const DistributionStore = require('../../../Distributions/DistributionStore.js');

class Analytics{
    constructor(distributionStore){
        this.distributionStore = distributionStore;
        this.list = [];
        this.noEndYet = {};
        this.clearedNoEndYetListEntries = 0;
        this.idGen = "0";
    }

    clearNoEndYetList(signalGroup){
        if(this.noEndYet[signalGroup]){
            Object.keys(this.noEndYet[signalGroup]).forEach((item) => {
                this.clearedNoEndYetListEntries += this.noEndYet[signalGroup][item].length;
            });
        }
        this.noEndYet[signalGroup] = {};
    }

    //TODO: lastphase or signalPhase???
    //phaseEndDateTime never given, phase doesn't know when he will end, only if the previous phase ended in lastPhaseEndDateTime
    add(phaseEndDateTime, phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationTime, lastPhaseEndDateTime, lastPhaseStartDateTime){
        if(!this.noEndYet[signalGroup]){
            this.noEndYet[signalGroup] = {};
        }
        if(!this.noEndYet[signalGroup][signalPhase]){
            this.noEndYet[signalGroup][signalPhase] = [];
        }
        if(!this.noEndYet[signalGroup][lastPhase]){ //bij change is phaseEndDateTime al ingevuld en dus niet nodig, bij same is last = signalPhase en is bovenstaande voldoende
            this.noEndYet[signalGroup][lastPhase] = [];
        }
        if(lastPhaseEndDateTime !== undefined){
            this.idGen = (Number.parseInt(this.idGen, 10) +1) + "";
        }
        let result = {
            "id": this.idGen,
            "signalGroup": signalGroup,
            "signalPhase": signalPhase,
            "lastPhase": lastPhase,
            "phaseEndDateTime": phaseEndDateTime,
            "phaseStartDateTime": phaseStartDateTime,
            "lastPhaseEndDateTime": lastPhaseEndDateTime,
            "lastPhaseStartDateTime": lastPhaseStartDateTime,
            "minEndTime": minEndTime,
            "maxEndTime": maxEndTime,
            "observationTime": observationTime,
            "phaseDuration": undefined,
            "phaseLikelyTime": {},
            "predictedDuration": {},
            "AE": {}
        };
        if(lastPhaseEndDateTime !== undefined){ //als op faseovergang -> geldt als eindtijd vorige fase -> invullen bij diegene die nog niet waren ingevuld
            let phaseDuration = new Date(lastPhaseEndDateTime).getTime() - new Date(lastPhaseStartDateTime).getTime();
            phaseDuration = Math.round(phaseDuration/1000);
            //phaseDuration is duration van vorige fase, niet van huidige!!!
            //dus vorige kan duur, maar huidige moet nog wachten op duur, dus in noEndYet pushen
            this.noEndYet[signalGroup][signalPhase].push(result); //dus eigenlijk altijd pushen in noEndYet, want phaseEndTime is nooit ingevuld

            for(let i of this.noEndYet[signalGroup][lastPhase]){
                i["phaseDuration"] = phaseDuration;
                i["phaseEndDateTime"] = lastPhaseEndDateTime;
            }
            this.noEndYet[signalGroup][lastPhase] = [];
        }
        else {
            this.noEndYet[signalGroup][signalPhase].push(result);
        }
        this.list.push(result);
        if(result.phaseDuration < 0 || result.phaseDuration > 3600){
            console.log("\x1b[31m",result.phaseDuration,"\x1b[0m");
        }
    }

    calculate(run, list){
        //console.log("debug info:");
        //console.log(" -> clearedNoEndYetListEntries: "+this.clearedNoEndYetListEntries); //TODO:is noPhaseDuration + onSamePhaseResets -> hoe???
        //console.log(" -> list length: "+list.length);
        for(let i = 0; i < list.length; i++){
            let { phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationTime, phaseDuration, lastSamePhaseDuration, lastPhaseEndDateTime, lastPhaseStartDateTime} = list[i];
            let observationUTC = Helper.splitDateInParts(phaseStartDateTime);
            let distributions = [
                this.distributionStore.get("fd").get(signalGroup,signalPhase),
                this.distributionStore.get("tfd").get(signalGroup,signalPhase,observationUTC["year"],observationUTC["month"],observationUTC["day"],observationUTC["hour"],Math.floor(observationUTC["minute"]/20)*20),
                this.distributionStore.get("tgfd").get(signalGroup,signalPhase,observationUTC["day"]===(0||6) ? 1 : 0,observationUTC["hour"])
            ];

            (distributions[0] === undefined || distributions[1] === undefined || distributions[2] === undefined) && list[i].signalGroup === 'https://opentrafficlights.org/id/signalgroup/K648/4' && list[i].signalPhase === 'https://w3id.org/opentrafficlights/thesauri/signalphase/6' && console.log(distributions);

            let distributionNames = ["fd","tfd","tgfd"];
            //median
            for(let j = 0; j < distributionNames.length; j++){
                if(!list[i]["phaseLikelyTime"][run]){
                    list[i]["phaseLikelyTime"][run] = {};
                }
                if(!list[i]["phaseLikelyTime"][run][distributionNames[j]]){
                    list[i]["phaseLikelyTime"][run][distributionNames[j]] = {};
                }
                if(!list[i]["predictedDuration"][run]){
                    list[i]["predictedDuration"][run] = {};
                }
                if(!list[i]["predictedDuration"][run][distributionNames[j]]){
                    list[i]["predictedDuration"][run][distributionNames[j]] = {};
                }

                let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], PredictionCalculator.calculateMedianDuration);
                if(likelyTime !== undefined){
                    list[i]["phaseLikelyTime"][run][distributionNames[j]]["median"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    list[i]["predictedDuration"][run][distributionNames[j]]["median"] = predictedPhaseDuration;
                }
            }
            //mean
            for(let j = 0; j < distributionNames.length; j++){
                let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], PredictionCalculator.calculateMeanDuration);
                if(likelyTime !== undefined){
                    list[i]["phaseLikelyTime"][run][distributionNames[j]]["mean"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    list[i]["predictedDuration"][run][distributionNames[j]]["mean"] = predictedPhaseDuration;
                }
            }
            //mostCommon
            for(let j = 0; j < distributionNames.length; j++){
                let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], PredictionCalculator.calculateMostCommonDuration);
                if(likelyTime !== undefined){
                    list[i]["phaseLikelyTime"][run][distributionNames[j]]["mostCommon"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    list[i]["predictedDuration"][run][distributionNames[j]]["mostCommon"] = predictedPhaseDuration;
                }
            }
        }
        this.calculateSecondsBeforeChange(run, list);
        return list[0];
    }

    calculateSecondsBeforeChange(run, list){
        for(let item of list){
            item["secondsBeforeChange"] = (new Date(item.phaseEndDateTime).getTime() - new Date(item.observationTime).getTime())/1000;
            let deviations = {};
            let distributionNames = ["fd","tfd","tgfd"];
            let types = ["median","mean","mostCommon"];
            for(let j = 0; j < distributionNames.length; j++){
                if(!deviations[distributionNames[j]]){
                    deviations[distributionNames[j]] = {};
                }
                for(let k = 0; k < types.length; k++){
                    // let a = new Date(item["phaseLikelyTime"][distributionNames[j]][types[k]]).getTime()/1000 - new Date(item["phaseEndDateTime"]).getTime()/1000;  //is niet afgerond
                    // let rel = new Date(item["observationTime"]).getTime()/1000 - new Date(item["phaseEndDateTime"]).getTime()/1000;
                    // let rel_a = 0;
                    // if(rel !== 0){
                    //     rel_a = a/rel;
                    // }
                    //TODO: afronding 200ms
                    deviations[distributionNames[j]][types[k]] = new Date(item["phaseLikelyTime"][run][distributionNames[j]][types[k]]).getTime()/1000 - new Date(item["phaseEndDateTime"]).getTime()/1000+0.2;
                }
            }

            item["AE"][run] = deviations;
        }
    }

    testOnObservations(observationsList, dataParts){
        let shuffle = (a) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };
        let observationsPerId  = {};
        let idObject = {};
        for(let item of observationsList){
            idObject[item.id] = 0;
            if(!observationsPerId[item.id]){
                observationsPerId[item.id] = [];
            }
            observationsPerId[item.id].push(item);
        }
        let idArray = Object.keys(idObject);
        shuffle(idArray);
        let phasesPerPart = Math.round(idArray.length/dataParts);
        let testPartStart = 0;
        let testPartEnd = 0;
        console.log("\x1b[31m", "total phases in array: "+idArray.length, "\x1b[0m");
        for(let testRun = 0; testRun < dataParts; testRun++){
            console.log("\x1b[31m", "starting run: " + testRun, "\x1b[0m");
            //await temp.onBeforeRun();
            this.distributionStore = new DistributionStore();
            DistributionManager.createDistributions(this.distributionStore);

            testPartStart = testRun * phasesPerPart;
            testPartEnd = testPartStart + phasesPerPart;

            let i = 0;
            let fileRunner = 0;
            for (let id of idArray) {  //alle files overlopen, gesorteerd volgens naam, wat overeenkomt met de datum, oudste eerst
                if(fileRunner < testPartStart || fileRunner > testPartEnd){
                    //await temp.onLearnFile(fragment, file);
                    i++;
                    let item = observationsPerId[id][0];    //just 1, doesnt matter which because same phase data
                    item && DistributionManager.storeInDistribution(item.phaseEndDateTime, item.phaseStartDateTime, item.signalGroup, item.signalPhase, this.distributionStore);
                }
                fileRunner++;
            }
            console.log("\x1b[31m", "learning phases: "+i, "\x1b[0m");
            i = 0;
            for (let fileNr = testPartStart; fileNr <= testPartEnd; fileNr++){
                //await temp.onTestFile(fragment, files[fileNr]);
                //console.log(fileNr);
                let id = idArray[fileNr];
                //console.log(id);
                let phasesWithId = observationsPerId[id];
                !phasesWithId && console.log("error here");
                phasesWithId && i++;
                phasesWithId && this.calculate(testRun, phasesWithId);
            }
            console.log("\x1b[31m", "testing phases: "+i, "\x1b[0m");

            //temp.onRunComplete();
            console.log("run "+ testRun+" completed");
        }
        console.log("all runs completed");

        //after all runs
    }

    executeTestSuite(){
        // let grouped = this.transformListToGroupedList();
        // dan voor iedere in grouped
        let newList = [];
        for(let item of this.list){
            if(item.phaseDuration !== undefined){
                newList.push(item);
            }
        }
        this.list = newList;
        this.testOnObservations(this.list, 20);

        // let counter = 0;
        // let gevonden = undefined;
        // while(!gevonden && counter < this.list.length){
        //     console.log(counter);
        //     if(this.list[counter].minEndTime !== this.list[counter].maxEndTime){
        //         gevonden = this.list[counter];
        //     }
        //     counter++;
        // }
        // return gevonden;
        return this.parseResultsAfterExecution(this.list);
        //return this.list;
    }

    //nu nog resultaten groeperen voordat ze worden teruggegeven door de executeTestSuite
    parseResultsAfterExecution(list){
        console.log("items in list after execution: "+list.length);
        let distributionNames = ["fd","tfd","tgfd"];
        let types = ["median","mean","mostCommon"];
        let results = {};
        for(let item of list){
            if(!results[item.signalGroup]){
                results[item.signalGroup] = {};
            }
            if(!results[item.signalGroup][item.signalPhase]){
                results[item.signalGroup][item.signalPhase] = {};
            }
            for(let distributionName of distributionNames){
                if(!results[item.signalGroup][item.signalPhase][distributionName]){
                    results[item.signalGroup][item.signalPhase][distributionName] = {};
                }
                for(let type of types){
                    if(!results[item.signalGroup][item.signalPhase][distributionName][type]){
                        results[item.signalGroup][item.signalPhase][distributionName][type] = {
                            abs_e: 0,
                            abs_se: 0,
                            rel_e: 0,
                            abs_rel_me_mse_counter: 0,

                            abs_e_with_minmax: 0,
                            abs_se_with_minmax: 0,
                            rel_e_with_minmax: 0,
                            abs_rel_me_mse_with_minmax_counter: 0,

                            abs_e_time_list: {},

                            errors: 0
                        };
                    }
                    Object.keys(item.AE).forEach((runNr) => {
                        let a = item.AE[runNr][distributionName][type];
                        if(a){
                            results[item.signalGroup][item.signalPhase][distributionName][type].abs_e_with_minmax+= ((a < 0) ? a*-1 : a);
                            results[item.signalGroup][item.signalPhase][distributionName][type].rel_e_with_minmax+= ((a < 0) ? a*-1 : a)/item.secondsBeforeChange;
                            results[item.signalGroup][item.signalPhase][distributionName][type].abs_se_with_minmax+= a*a;
                            results[item.signalGroup][item.signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter+=1;
                            if(item.minEndTime !== item.maxEndTime){
                                results[item.signalGroup][item.signalPhase][distributionName][type].abs_e+= ((a < 0) ? a*-1 : a);
                                results[item.signalGroup][item.signalPhase][distributionName][type].rel_e+= ((a < 0) ? a*-1 : a)/item.secondsBeforeChange;
                                results[item.signalGroup][item.signalPhase][distributionName][type].abs_se+= a*a;
                                results[item.signalGroup][item.signalPhase][distributionName][type].abs_rel_me_mse_counter+=1;
                            }
                            if(!results[item.signalGroup][item.signalPhase][distributionName][type].abs_e_time_list[Math.round(item.secondsBeforeChange)]){
                                results[item.signalGroup][item.signalPhase][distributionName][type].abs_e_time_list[Math.round(item.secondsBeforeChange)] = [];
                            }
                            results[item.signalGroup][item.signalPhase][distributionName][type].abs_e_time_list[Math.round(item.secondsBeforeChange)].push({x: item.secondsBeforeChange, y: ((a < 0) ? a*-1 : a)});

                        }
                        else{
                            results[item.signalGroup][item.signalPhase][distributionName][type].errors+= 1;
                        }
                    });
                }
            }
        }
        Object.keys(results).forEach((signalGroup) => {
            Object.keys(results[signalGroup]).forEach((signalPhase) => {
                for(let distributionName of distributionNames){
                    for(let type of types){
                        if(results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_counter !== 0){
                            results[signalGroup][signalPhase][distributionName][type].abs_me =
                                results[signalGroup][signalPhase][distributionName][type].abs_e
                                / results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_counter;
                            results[signalGroup][signalPhase][distributionName][type].abs_mse =
                                results[signalGroup][signalPhase][distributionName][type].abs_se
                                / results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_counter;
                            results[signalGroup][signalPhase][distributionName][type].rel_me =
                                results[signalGroup][signalPhase][distributionName][type].rel_e
                                / results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_counter;
                        }
                        if(results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter !== 0){
                            results[signalGroup][signalPhase][distributionName][type].abs_me_with_minmax =
                                results[signalGroup][signalPhase][distributionName][type].abs_e_with_minmax
                                / results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter;
                        }
                        if(results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter !== 0){
                            results[signalGroup][signalPhase][distributionName][type].abs_mse_with_minmax =
                                results[signalGroup][signalPhase][distributionName][type].abs_se_with_minmax
                                / results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter;
                        }
                        if(results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter !== 0){
                            results[signalGroup][signalPhase][distributionName][type].rel_me_with_minmax =
                                results[signalGroup][signalPhase][distributionName][type].rel_e_with_minmax
                                / results[signalGroup][signalPhase][distributionName][type].abs_rel_me_mse_with_minmax_counter;
                        }

                        Object.keys(results[signalGroup][signalPhase][distributionName][type].abs_e_time_list).forEach((secondsBefore) => {
                            //calculate mean
                            let total = 0;
                            let counter = 0;
                            for(let item of results[signalGroup][signalPhase][distributionName][type].abs_e_time_list[secondsBefore]){
                                total+= item.y;
                                counter++;
                            }
                            let mean = total/counter;
                            if(!results[signalGroup][signalPhase][distributionName][type].abs_e_result_time_list){
                                results[signalGroup][signalPhase][distributionName][type].abs_e_result_time_list = [];
                            }
                            results[signalGroup][signalPhase][distributionName][type].abs_e_result_time_list.push( {x: secondsBefore, y: mean});
                        });
                    }
                }
            });
        });
        return results;
    }

    //can be used to first group before splitting in parts for training
    transformListToGroupedList(){
        let grouped = {};
        for(let item of this.list){
            if(!grouped[item.signalGroup]){
                grouped[item.signalGroup] = {};
            }
            if(!grouped[item.signalGroup][item.signalPhase]){
                grouped[item.signalGroup][item.signalPhase] = [];
            }
            grouped[item.signalGroup][item.signalPhase].push(item);
        }
        return grouped;
    }
}

module.exports = Analytics;