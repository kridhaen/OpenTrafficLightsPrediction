let PredictionManager = require("../Predictor/PredictionManager.js");
let Helper = require("../Readers/Helper.js");

class Analytics{
    constructor(distributionStore){
        this.distributionStore = distributionStore;
        this.list = [];
        // this.phaseEndChecker = {};
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
        if(!this.noEndYet[signalGroup]){    //bij change is phaseEndDateTime al ingevuld en dus niet nodig, bij same is last = signalPhase en is bovenstaande voldoende
            this.noEndYet[signalGroup] = {};
        }
        if(!this.noEndYet[signalGroup][lastPhase]){
            this.noEndYet[signalGroup][lastPhase] = [];
        }
        // if(!this.phaseEndChecker[signalGroup]){
        //     this.phaseEndChecker[signalGroup] = {};
        // }
        // if(!this.phaseEndChecker[signalGroup][signalPhase]){
        //     this.phaseEndChecker[signalGroup][signalPhase] = phaseEndDateTime;
        // }
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
            "phaseLikelyTime": undefined,
            "predictedDuration": undefined,
            "predictedDurationTFD": undefined,
            "predictedDurationTGFD": undefined,
            "loss": undefined
        };
        if(lastPhaseEndDateTime !== undefined){ //als op faseovergang -> geldt als eindtijd vorige fase -> invullen bij diegene die nog niet waren ingevuld
            let phaseDuration = new Date(lastPhaseEndDateTime).getTime() - new Date(lastPhaseStartDateTime).getTime();
            phaseDuration = Math.round(phaseDuration/1000);

            //result.phaseDuration = phaseDuration;   // fout, is duration van vorige fase, niet van huidige!!!
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

    calculate(){
        for(let i = 0; i < this.list.length; i++){
            let { phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationTime, phaseDuration} = this.list[i];
            let temp = this.list;
            let observationUTC = Helper.splitDateInParts(phaseStartDateTime);
            let distribution = this.distributionStore.get("fd").get(signalGroup,signalPhase);
            //TODO: remove phaseDuration param -> debugging
            PredictionManager.predictLikelyTime(phaseDuration, signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distribution, (likelyTime) => {
                if(likelyTime !== undefined){
                    temp[i]["phaseLikelyTime"] = likelyTime;
                    let phaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    phaseDuration = Math.round(phaseDuration/1000);
                    temp[i]["predictedDuration"] = phaseDuration;
                }
            });
            let distribution2 = this.distributionStore.get("tfd").get(signalGroup,signalPhase,observationUTC["year"],observationUTC["month"],observationUTC["day"],observationUTC["hour"],Math.floor(observationUTC["minute"]/20)*20);
            //TODO: remove phaseDuration param -> debugging
            PredictionManager.predictLikelyTime(phaseDuration, signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distribution2, (likelyTime) => {
                if(likelyTime !== undefined){
                    temp[i]["phaseLikelyTimeTFD"] = likelyTime;
                    let phaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    phaseDuration = Math.round(phaseDuration/1000);
                    temp[i]["predictedDurationTFD"] = phaseDuration;
                }
            });
            let distribution3 = this.distributionStore.get("tgfd").get(signalGroup,signalPhase,observationUTC["day"]===(0||6) ? 1 : 0,observationUTC["hour"]);
            //TODO: remove phaseDuration param -> debugging
            PredictionManager.predictLikelyTime(phaseDuration, signalGroup, signalPhase, observationTime, minEndTime, maxEndTime, phaseStartDateTime, distribution3, (likelyTime) => {
                if(likelyTime !== undefined){
                    temp[i]["phaseLikelyTimeTGFD"] = likelyTime;
                    let phaseDuration = new Date(likelyTime).getTime() - new Date(phaseStartDateTime).getTime();
                    phaseDuration = Math.round(phaseDuration/1000);
                    temp[i]["predictedDurationTGFD"] = phaseDuration;
                }
            });
        }
        return this.list;
    }

    _calculateLossExperimental(likelyTimeName){
        let mse = 0;
        let me = 0;
        let me_without_0 = 0;
        let me_without_0_counter = 0;
        let errors = 0;
        let noPhaseDuration = 0;
        let noPrediction = 0;
        let noPhaseStartDateTime = 0;
        let noPhaseEndDateTime = 0;
        let minMaxSame = 0;
        for(let i = 0; i < this.list.length; i++) {
            if (this.list[i][likelyTimeName] && this.list[i]["phaseEndDateTime"]) {
                if (this.list[i]["minEndTime"] === this.list[i]["maxEndTime"]) {
                    minMaxSame++;
                } else {
                    let a = new Date(this.list[i][likelyTimeName]).getTime()/1000 - new Date(this.list[i]["phaseEndDateTime"]).getTime()/1000;
                    let rel = new Date(this.list[i]["observationTime"]).getTime()/1000 - new Date(this.list[i]["phaseEndDateTime"]).getTime()/1000;
                    a = a/rel;
                    mse += a * a;
                    me += ((a < 0) ? a * -1 : a);
                    if (this.list[i]["signalPhase"] !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0") {
                        me_without_0 += ((a < 0) ? a * -1 : a);
                        me_without_0_counter++;
                    }
                }
            } else {
                !Number.isInteger(this.list[i][likelyTimeName]) && noPrediction++;
                !this.list[i]["phaseStartDateTime"] && noPhaseStartDateTime++;
                !this.list[i]["phaseEndDateTime"] && noPhaseEndDateTime++;
                !Number.isInteger(this.list[i]["phaseDuration"]) && noPhaseDuration++;
                let c = this.list[i];   //TODO: remove debugging code
                errors++;
                //console.log("error in data @"+durationName+": predicted duration = "+this.list[i][durationName] + " | phaseDuration = "+this.list[i]["phaseDuration"]);
            }
        }
        mse = mse / (this.list.length-errors);
        me = me / (this.list.length-errors);
        me_without_0 = me_without_0 / me_without_0_counter;
        console.log("-------------------------------------------------------------");
        console.log("total predictions: "+this.list.length);
        console.log("succeeded: "+(this.list.length-errors));
        console.log("errors: "+errors);
        console.log(" -> no phaseDuration: "+ noPhaseDuration);
        console.log(" -> no prediction: "+ noPrediction);
        console.log(" -> no phaseStartDateTime: "+ noPhaseStartDateTime);
        console.log(" -> no phaseEndDateTime: "+ noPhaseEndDateTime);
        console.log("debug info:");
        console.log(" -> clearedNoEndYetListEntries: "+this.clearedNoEndYetListEntries); //TODO:is noPhaseDuration + onSamePhaseResets -> hoe???
        console.log("loss calculation for: "+likelyTimeName);
        console.log("MSE % = "+ mse);
        console.log("ME % = "+ me);   //oranje fase zijn altijd correct, dus halen waarschijnlijk de gemiddelde error naar beneden
        console.log("ME without 0 phase (orange) % = "+ me_without_0);
        console.log("Count predictions without 0 phases = "+me_without_0_counter);
        console.log("minMaxSame =  "+minMaxSame);
    }

    _calculateLoss(durationName){ //TODO: if likelyTime is undef? wordt gedeeld door totaal aantal, maar zijn die ook allemaal ingevuld? Hierboven is phaseDuration dan niet te groot? of is het niet ingevuld?
        let mse = 0;
        let me = 0;
        let me_without_0 = 0;
        let me_without_0_counter = 0;
        let errors = 0;
        let noPhaseDuration = 0;
        let noPrediction = 0;
        let noPhaseStartDateTime = 0;
        let noPhaseEndDateTime = 0;
        for(let i = 0; i < this.list.length; i++){
            if(Number.isInteger(this.list[i][durationName]) && Number.isInteger(this.list[i]["phaseDuration"])){
                let a = this.list[i][durationName] - this.list[i]["phaseDuration"];
                mse += a*a;
                me += ((a < 0) ? a*-1 : a) ;
                if(this.list[i]["signalPhase"] !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0"){
                    me_without_0 += ((a < 0) ? a*-1 : a) ;
                    me_without_0_counter ++;
                }
            }
            else {
                !Number.isInteger(this.list[i][durationName]) && noPrediction++;
                !this.list[i]["phaseStartDateTime"] && noPhaseStartDateTime++;
                !this.list[i]["phaseEndDateTime"] && noPhaseEndDateTime++;
                !Number.isInteger(this.list[i]["phaseDuration"]) && noPhaseDuration++;
                let c = this.list[i];   //TODO: remove debugging code
                errors++;
                //console.log("error in data @"+durationName+": predicted duration = "+this.list[i][durationName] + " | phaseDuration = "+this.list[i]["phaseDuration"]);
            }
        }
        mse = mse / (this.list.length-errors);
        me = me / (this.list.length-errors);
        me_without_0 = me_without_0 / me_without_0_counter;
        console.log("-------------------------------------------------------------");
        console.log("total predictions: "+this.list.length);
        console.log("succeeded: "+(this.list.length-errors));
        console.log("errors: "+errors);
        console.log(" -> no phaseDuration: "+ noPhaseDuration);
        console.log(" -> no prediction: "+ noPrediction);
        console.log(" -> no phaseStartDateTime: "+ noPhaseStartDateTime);
        console.log(" -> no phaseEndDateTime: "+ noPhaseEndDateTime);
        console.log("debug info:");
        console.log(" -> clearedNoEndYetListEntries: "+this.clearedNoEndYetListEntries); //TODO:is noPhaseDuration + onSamePhaseResets -> hoe???
        console.log("loss calculation for: "+durationName);
        console.log("MSE = "+ mse);
        console.log("ME = "+ me);   //oranje fase zijn altijd correct, dus halen waarschijnlijk de gemiddelde error naar beneden
        console.log("ME without 0 phase (orange) = "+ me_without_0);
        console.log("Count predictions without 0 phases = "+me_without_0_counter);
    }

    showLoss(){
        this._calculateLoss("predictedDuration");
        this._calculateLoss("predictedDurationTFD");
        this._calculateLoss("predictedDurationTGFD");
        this._calculateLossExperimental("phaseLikelyTime");
        this._calculateLossExperimental("phaseLikelyTimeTFD");
        this._calculateLossExperimental("phaseLikelyTimeTGFD");
    };


}

module.exports = Analytics;