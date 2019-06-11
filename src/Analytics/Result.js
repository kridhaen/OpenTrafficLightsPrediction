let PredictionManager = require("../Predictor/PredictionManager.js");
let Helper = require("../Readers/Helper.js");
const DurationsManager = require('../Distributions/DurationsManager.js');
const PredictionCalculator = require('../Predictor/PredictionCalculator.js');

class Analytics{
    constructor(distributionStore, durationsManager){
        this.distributionStore = distributionStore;
        this.durationsManager = durationsManager;
        this.list = [];
        this.noEndYet = {};
        this.clearedNoEndYetListEntries = 0;
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
        let result = {
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
            "lastSamePhaseDuration": undefined,
            "deviation": {}
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

        let obj = {};
        this.durationsManager.getLastHistory(signalGroup,signalPhase) && this.durationsManager.getLastHistory(signalGroup,signalPhase).forEach((item)=>{obj[item] = 1});
        result["lastSamePhaseDuration"] = PredictionCalculator.calculateMedianDuration(obj);
        this.list.push(result);
        if(result.phaseDuration < 0 || result.phaseDuration > 3600){
            console.log("\x1b[31m",result.phaseDuration,"\x1b[0m");
        }
    }

    calculate(){
        console.log("debug info:");
        console.log(" -> clearedNoEndYetListEntries: "+this.clearedNoEndYetListEntries); //TODO:is noPhaseDuration + onSamePhaseResets -> hoe???
        console.log(" -> list length: "+this.list.length);
        for(let i = 0; i < this.list.length; i++){
            let { phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationTime, phaseDuration, lastSamePhaseDuration, lastPhaseEndDateTime, lastPhaseStartDateTime} = this.list[i];
            let observationUTC = Helper.splitDateInParts(phaseStartDateTime);
            let distributions = [
                this.distributionStore.get("fd").get(signalGroup,signalPhase),
                this.distributionStore.get("tfd").get(signalGroup,signalPhase,observationUTC["year"],observationUTC["month"],observationUTC["day"],observationUTC["hour"],Math.floor(observationUTC["minute"]/20)*20),
                this.distributionStore.get("tgfd").get(signalGroup,signalPhase,observationUTC["day"]===(0||6) ? 1 : 0,observationUTC["hour"])
            ];
            let distributionNames = ["fd","tfd","tgfd"];
            //median
            for(let j = 0; j < distributionNames.length; j++){
                if(!this.list[i]["phaseLikelyTime"][distributionNames[j]]){
                    this.list[i]["phaseLikelyTime"][distributionNames[j]] = {};
                }
                if(!this.list[i]["predictedDuration"][distributionNames[j]]){
                    this.list[i]["predictedDuration"][distributionNames[j]] = {};
                }

                let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], PredictionCalculator.calculateMedianDuration);
                if(likelyTime !== undefined){
                    this.list[i]["phaseLikelyTime"][distributionNames[j]]["median"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    this.list[i]["predictedDuration"][distributionNames[j]]["median"] = predictedPhaseDuration;
                }
            }
            //mean
            for(let j = 0; j < distributionNames.length; j++){
                let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], PredictionCalculator.calculateMeanDuration);
                if(likelyTime !== undefined){
                    this.list[i]["phaseLikelyTime"][distributionNames[j]]["mean"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    this.list[i]["predictedDuration"][distributionNames[j]]["mean"] = predictedPhaseDuration;
                }
            }
            //mostCommon
            for(let j = 0; j < distributionNames.length; j++){
                let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], PredictionCalculator.calculateMostCommonDuration);
                if(likelyTime !== undefined){
                    this.list[i]["phaseLikelyTime"][distributionNames[j]]["mostCommon"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    this.list[i]["predictedDuration"][distributionNames[j]]["mostCommon"] = predictedPhaseDuration;
                }
            }
            //samePrevious
            for(let j = 0; j < distributionNames.length; j++){
                let likelyTime = PredictionManager.predictLikelyTimeSamePrevious(lastSamePhaseDuration,signalGroup, signalPhase,  minEndTime, maxEndTime, phaseStartDateTime);
                if(likelyTime !== undefined){
                    this.list[i]["phaseLikelyTime"][distributionNames[j]]["samePrevious"] = likelyTime;
                    let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
                    this.list[i]["predictedDuration"][distributionNames[j]]["samePrevious"] = predictedPhaseDuration;
                }
            }
            //vorige fase duurde langer dan verwacht -> nu ook langer dan verwacht voorspellen
            // for(let j = 0; j < distributionNames.length; j++){
            //     let lastPhaseDuration = new Date(lastPhaseEndDateTime).getTime()/1000 - new Date(lastPhaseStartDateTime).getTime()/1000;
            //     let lastPhaseMedian = PredictionManager.predictLikelyTime(signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[j], (dist) => {PredictionCalculator.calculateMedianDuration(dist)});
            //
            //     let likelyTime = PredictionManager.predictLikelyTimeSamePrevious(lastSamePhaseDuration,signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distributions[i]);
            //     if(likelyTime !== undefined){
            //         this.list[i]["phaseLikelyTime"][distributionNames[j]]["spicy"] = likelyTime;
            //         let predictedPhaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
            //         predictedPhaseDuration = Math.round(predictedPhaseDuration/1000);
            //         this.list[i]["predictedDuration"][distributionNames[j]]["spicy"] = predictedPhaseDuration;
            //     }
            // }

        }
        return this.list;
    }

    calculateAllLoss(){
        let distributionNames = ["fd","tfd","tgfd"];
        let types = ["median","mean","mostCommon","samePrevious"];
        for(let i = 0; i < this.list.length; i++){
            let { deviation, phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationTime, phaseDuration, lastSamePhaseDuration, lastPhaseEndDateTime, lastPhaseStartDateTime} = this.list[i];
            for(let j = 0; j < distributionNames.length; j++){
                for(let k = 0; k < types.length; k++){
                    if(!deviation[j]){
                        deviation[j] = {};
                    }
                    deviation[j][k] = this._calculateLossForObservation(distributionNames[j], types[k]);
                }
            }
        }
    }

    _calculateLossForObservation(distributionName, type){
        let returnObject = {
            abs_me: 0,
            abs_mse: 0,
            abs_me_without_0: 0,
            abs_mse_without_0: 0,
            abs_me_without_0_counter: 0,
            abs_me_with_minmax: 0,
            abs_mse_with_minmax: 0,
            abs_me_with_minmax_counter: 0,
            abs_me_phased: {},
            abs_mse_phased: {},
            rel_me: 0,
            rel_mse: 0,
            rel_me_without_0: 0,
            rel_mse_without_0: 0,
            rel_me_without_0_counter: 0,
            rel_me_with_minmax: 0,
            rel_mse_with_minmax: 0,
            rel_me_with_minmax_counter: 0,
            rel_me_phased: {},
            rel_mse_phased: {},
            errors: 0,
            noPhaseDuration: 0,
            noPrediction: 0,
            noPhaseStartDateTime: 0,
            noPhaseEndDateTime: 0,
            minMaxSame: 0,
            totalObservations: 0
        };

        for(let i = 0; i < this.list.length; i++){
            returnObject.totalObservations++;
            if(Number.isInteger(this.list[i]["predictedDuration"][distributionName][type]) && Number.isInteger(this.list[i]["phaseDuration"])){
                let a = this.list[i]["predictedDuration"][distributionName] - this.list[i]["phaseDuration"];
                let rel = new Date(this.list[i]["observationTime"]).getTime()/1000 - new Date(this.list[i]["phaseEndDateTime"]).getTime()/1000;
                let rel_a = a/rel;
                if(this.list[i]["minEndTime"] === this.list[i]["maxEndTime"]){  //abs and rel mse and me for everything
                    returnObject.minMaxSame++;
                    returnObject.abs_me_with_minmax += ((a < 0) ? a*-1 : a);
                    returnObject.abs_mse_with_minmax += a*a;
                    returnObject.abs_me_with_minmax_counter ++;
                    returnObject.rel_me_with_minmax += ((rel_a < 0) ? rel_a * -1 : rel_a);
                    returnObject.rel_mse_with_minmax += rel_a*rel_a;
                    returnObject.rel_me_with_minmax_counter ++;

                }
                else {  //only when min !== max
                    returnObject.abs_mse += a*a;
                    returnObject.abs_me += ((a < 0) ? a*-1 : a);
                    returnObject.rel_mse += rel_a*rel_a;
                    returnObject.rel_me += ((rel_a < 0) ? rel_a * -1 : rel_a);
                    if(this.list[i]["signalPhase"] !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0"){    //without 0 phases
                        returnObject.abs_me_without_0 += ((a < 0) ? a*-1 : a);
                        returnObject.abs_mse_without_0 += a*a;
                        returnObject.abs_me_without_0_counter ++;
                        returnObject.rel_me_without_0 += ((rel_a < 0) ? rel_a * -1 : rel_a);
                        returnObject.rel_mse_without_0 += rel_a*rel_a;
                        returnObject.rel_me_without_0_counter ++;
                    }
                    //for each phase separated
                    if(!returnObject.rel_me_phased[this.list[i]["signalPhase"]]){
                        returnObject.rel_me_phased[this.list[i]["signalPhase"]] = 0;
                    }
                    if(!returnObject.rel_mse_phased[this.list[i]["signalPhase"]]){
                        returnObject.rel_mse_phased[this.list[i]["signalPhase"]] = 0;
                    }
                    returnObject.rel_me_phased[this.list[i]["signalPhase"]]+= ((rel_a < 0) ? rel_a * -1 : rel_a);
                    returnObject.rel_mse_phased[this.list[i]["signalPhase"]]+= rel_a*rel_a;
                }


            }

            else {
                !Number.isInteger(this.list[i]["predictedDuration"][distributionName][type]) && returnObject.noPrediction++;
                !this.list[i]["phaseStartDateTime"] && returnObject.noPhaseStartDateTime++;
                !this.list[i]["phaseEndDateTime"] && returnObject.noPhaseEndDateTime++;
                !Number.isInteger(this.list[i]["phaseDuration"]) && returnObject.noPhaseDuration++;
                returnObject.errors++;
            }
        }
    }

    _calculateLoss(distributionName, type){
        console.log("calculate loss started");
        let returnObject = {
            abs_me: 0,
            abs_mse: 0,
            rel_me: 0,
            rel_mse: 0,
            abs_rel_me_mse_counter: 0,

            abs_me_without_0: 0,
            abs_mse_without_0: 0,
            rel_me_without_0: 0,
            rel_mse_without_0: 0,
            abs_rel_me_mse_without_0_counter: 0,

            abs_me_with_minmax: 0,
            abs_mse_with_minmax: 0,
            rel_me_with_minmax: 0,
            rel_mse_with_minmax: 0,
            abs_rel_me_mse_with_minmax_counter: 0,

            abs_me_phased: {},
            abs_mse_phased: {},
            rel_me_phased: {},
            rel_mse_phased: {},
            abs_rel_me_mse_phased_counter: {},

            success: 0,
            errors: 0,
            noPhaseDuration: 0,
            noPrediction: 0,
            noPhaseStartDateTime: 0,
            noPhaseEndDateTime: 0,
            minMaxSame: 0,
            totalObservations: 0
        };
        let signalPhases = {};

        for(let i = 0; i < this.list.length; i++){
            returnObject.totalObservations++;
            if(Number.isInteger(this.list[i]["predictedDuration"][distributionName][type]) && Number.isInteger(this.list[i]["phaseDuration"])){
                //let a = this.list[i]["predictedDuration"][distributionName][type] - this.list[i]["phaseDuration"];  //is afgerond
                let a = new Date(this.list[i]["phaseLikelyTime"][distributionName][type]).getTime()/1000 - new Date(this.list[i]["phaseEndDateTime"]).getTime()/1000;  //is niet afgerond
                let rel = new Date(this.list[i]["observationTime"]).getTime()/1000 - new Date(this.list[i]["phaseEndDateTime"]).getTime()/1000;
                let rel_a = 0;
                if(rel !== 0){
                    rel_a = a/rel;
                }
                 //abs and rel mse and me for everything
                if (this.list[i]["minEndTime"] === this.list[i]["maxEndTime"]) {
                    returnObject.minMaxSame++;
                }
                returnObject.abs_me_with_minmax += ((a < 0) ? a*-1 : a);
                returnObject.abs_mse_with_minmax += a*a;
                returnObject.rel_me_with_minmax += ((rel_a < 0) ? rel_a * -1 : rel_a);
                returnObject.rel_mse_with_minmax += rel_a*rel_a;
                returnObject.abs_rel_me_mse_with_minmax_counter++;

                //only when min !== max
                if(this.list[i]["minEndTime"] !== this.list[i]["maxEndTime"]) {
                    returnObject.abs_mse += a*a;
                    returnObject.abs_me += ((a < 0) ? a*-1 : a);
                    returnObject.rel_mse += rel_a*rel_a;
                    returnObject.rel_me += ((rel_a < 0) ? rel_a * -1 : rel_a);
                    returnObject.abs_rel_me_mse_counter++;

                    //without 0 phases
                    if(this.list[i]["signalPhase"] !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0"){
                        returnObject.abs_me_without_0 += ((a < 0) ? a*-1 : a);
                        returnObject.abs_mse_without_0 += a*a;
                        returnObject.rel_me_without_0 += ((rel_a < 0) ? rel_a * -1 : rel_a);
                        returnObject.rel_mse_without_0 += rel_a*rel_a;
                        returnObject.abs_rel_me_mse_without_0_counter++;
                    }

                    //for each phase separated //TODO: controle
                    if(!returnObject.abs_me_phased[this.list[i]["signalPhase"]]){
                        returnObject.abs_me_phased[this.list[i]["signalPhase"]] = 0;
                    }
                    if(!returnObject.abs_mse_phased[this.list[i]["signalPhase"]]){
                        returnObject.abs_mse_phased[this.list[i]["signalPhase"]] = 0;
                    }
                    if(!returnObject.rel_me_phased[this.list[i]["signalPhase"]]){
                        returnObject.rel_me_phased[this.list[i]["signalPhase"]] = 0;
                    }
                    if(!returnObject.rel_mse_phased[this.list[i]["signalPhase"]]){
                        returnObject.rel_mse_phased[this.list[i]["signalPhase"]] = 0;
                    }
                    if(!returnObject.abs_rel_me_mse_phased_counter[this.list[i]["signalPhase"]]){
                        returnObject.abs_rel_me_mse_phased_counter[this.list[i]["signalPhase"]] = 0;
                    }
                    returnObject.abs_me_phased[this.list[i]["signalPhase"]]+= ((a < 0) ? a * -1 : a);
                    returnObject.abs_mse_phased[this.list[i]["signalPhase"]]+= a*a;
                    returnObject.rel_me_phased[this.list[i]["signalPhase"]]+= ((rel_a < 0) ? rel_a * -1 : rel_a);
                    returnObject.rel_mse_phased[this.list[i]["signalPhase"]]+= rel_a*rel_a;
                    returnObject.abs_rel_me_mse_phased_counter[this.list[i]["signalPhase"]]++;

                    signalPhases[this.list[i]["signalPhase"]] = 0;
                }
            }

            else {
                !Number.isInteger(this.list[i]["predictedDuration"][distributionName][type]) && returnObject.noPrediction++;
                !this.list[i]["phaseStartDateTime"] && returnObject.noPhaseStartDateTime++;
                !this.list[i]["phaseEndDateTime"] && returnObject.noPhaseEndDateTime++;
                !Number.isInteger(this.list[i]["phaseDuration"]) && returnObject.noPhaseDuration++;
                returnObject.errors++;
            }
        }

        returnObject.abs_me = returnObject.abs_me / returnObject.abs_rel_me_mse_counter;
        returnObject.rel_me = returnObject.rel_me / returnObject.abs_rel_me_mse_counter;
        returnObject.abs_mse = returnObject.abs_mse / returnObject.abs_rel_me_mse_counter;
        returnObject.rel_mse = returnObject.rel_mse / returnObject.abs_rel_me_mse_counter;

        returnObject.abs_me_without_0 = returnObject.abs_me_without_0 / returnObject.abs_rel_me_mse_without_0_counter;
        returnObject.abs_mse_without_0 = returnObject.abs_mse_without_0 / returnObject.abs_rel_me_mse_without_0_counter;
        returnObject.rel_me_without_0 = returnObject.rel_me_without_0 / returnObject.abs_rel_me_mse_without_0_counter;
        returnObject.rel_mse_without_0 = returnObject.rel_mse_without_0 / returnObject.abs_rel_me_mse_without_0_counter;

        returnObject.abs_me_with_minmax = returnObject.abs_me_with_minmax / returnObject.abs_rel_me_mse_with_minmax_counter;
        returnObject.rel_me_with_minmax = returnObject.rel_me_with_minmax / returnObject.abs_rel_me_mse_with_minmax_counter;
        returnObject.abs_mse_with_minmax = returnObject.abs_mse_with_minmax / returnObject.abs_rel_me_mse_with_minmax_counter;
        returnObject.rel_mse_with_minmax = returnObject.rel_mse_with_minmax / returnObject.abs_rel_me_mse_with_minmax_counter;

        for(let key of Object.keys(signalPhases)){
            returnObject.abs_me_phased[key] = returnObject.abs_me_phased[key] / returnObject.abs_rel_me_mse_phased_counter[key];
            returnObject.abs_mse_phased[key] = returnObject.abs_mse_phased[key] / returnObject.abs_rel_me_mse_phased_counter[key];
            returnObject.rel_me_phased[key] = returnObject.rel_me_phased[key] / returnObject.abs_rel_me_mse_phased_counter[key];
            returnObject.rel_mse_phased[key] = returnObject.rel_mse_phased[key] / returnObject.abs_rel_me_mse_phased_counter[key];
        }

        returnObject.success = this.list.length - returnObject.errors;
        return returnObject;
    }

    showLoss(){
        console.log("showLoss started");
        let deviations = {};
        let distributionNames = ["fd","tfd","tgfd"];
        let types = ["median","mean","mostCommon","samePrevious"];
        for(let j = 0; j < distributionNames.length; j++){
            if(!deviations[distributionNames[j]]){
                deviations[distributionNames[j]] = {};
            }
            for(let k = 0; k < types.length; k++){
                console.log("calculating for: "+distributionNames[j] + " " + types[k]);
                deviations[distributionNames[j]][types[k]] = this._calculateLoss(distributionNames[j], types[k]);
            }
        }
        console.log(deviations);
        return deviations;
    };


}

module.exports = Analytics;