let PredictionManager = require("../Predictor/PredictionManager.js");

class Analytics{
    constructor(distributionStore){
        this.distributionStore = distributionStore;
        this.list = [];
        this.phaseData = {};
    }

    add(phaseEndDateTime, phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationUTC){
        let phaseDuration = new Date(phaseEndDateTime).getTime() - new Date(phaseStartDateTime).getTime();
        phaseDuration = Math.round(phaseDuration/1000);
        this.list.push({
            "signalGroup": signalGroup,
            "signalPhase": signalPhase,
            "lastPhase": lastPhase,
            "phaseEndDateTime": phaseEndDateTime,
            "phaseStartDateTime": phaseStartDateTime,
            "minEndTime": minEndTime,
            "maxEndTime": maxEndTime,
            "phaseDuration": phaseDuration,
            "observationUTC": observationUTC,
            "lastPhaseLikelyTime": undefined,
            "predictedDuration": undefined,
            "predictedDurationTFD": undefined,
            "predictedDurationTGFD": undefined,
            "loss": undefined});
        if(phaseDuration < 0 || phaseDuration > 3600){
            console.log("\x1b[31m",phaseDuration,"\x1b[0m");
        }
    }

    calculate(){
        for(let i = 0; i < this.list.length; i++){
            let { phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, observationUTC} = this.list[i];
            let temp = this.list;
            let distribution = this.distributionStore.get("fd").get(signalGroup,lastPhase);
            PredictionManager.predictLikelyTime(signalGroup, lastPhase, "", phaseStartDateTime, undefined, undefined, phaseStartDateTime, distribution, (likelyTime) => {
                temp[i]["lastPhaseLikelyTime"] = likelyTime;
                let phaseDuration = new Date(likelyTime) - new Date(phaseStartDateTime);
                phaseDuration = Math.round(phaseDuration/1000);
                temp[i]["predictedDuration"] = phaseDuration;
            });
            let distribution2 = this.distributionStore.get("tfd").get(signalGroup,lastPhase,observationUTC["year"],observationUTC["month"],observationUTC["day"],observationUTC["hour"],Math.floor(observationUTC["minute"]/20)*20);
            PredictionManager.predictLikelyTime(signalGroup, lastPhase, "", phaseStartDateTime, undefined, undefined, phaseStartDateTime, distribution2, (likelyTime) => {
                let phaseDuration = new Date(likelyTime) - new Date(phaseStartDateTime);
                phaseDuration = Math.round(phaseDuration/1000);
                temp[i]["predictedDurationTFD"] = phaseDuration;
            });
            let distribution3 = this.distributionStore.get("tgfd").get(signalGroup,lastPhase,observationUTC["day"]===(0||6) ? 1 : 0,observationUTC["hour"]);
            PredictionManager.predictLikelyTime(signalGroup, lastPhase, "", phaseStartDateTime, undefined, undefined, phaseStartDateTime, distribution3, (likelyTime) => {
                let phaseDuration = new Date(likelyTime) - new Date(phaseStartDateTime);
                phaseDuration = Math.round(phaseDuration/1000);
                temp[i]["predictedDurationTGFD"] = phaseDuration;
            });
        }
        return this.list;
    }

    _calculateLoss(durationName){ //TODO: if likelyTime is undef? wordt gedeeld door totaal aantal, maar zijn die ook allemaal ingevuld? Hierboven is phaseDuration dan niet te groot? of is het niet ingevuld?
        let mse = 0;
        let me = 0;
        let me_without_0 = 0;
        let me_without_0_counter = 0;
        for(let i = 0; i < this.list.length; i++){
            let a = this.list[i][durationName] - this.list[i]["phaseDuration"];
            mse += a*a;
            me += ((a < 0) ? a*-1 : a) ;
            if(this.list[i]["signalPhase"] !== "https://w3id.org/opentrafficlights/thesauri/signalphase/3"){
                me_without_0 += ((a < 0) ? a*-1 : a) ;
                me_without_0_counter ++;
            }
        }
        mse = mse / this.list.length;
        me = me / this.list.length;
        me_without_0 = me_without_0 / me_without_0_counter;
        console.log("I  | II\n" + "II | I_\n" + "for: "+durationName);
        console.log("MSE = "+ mse);
        console.log("ME = "+ me);   //oranje fase zijn altijd correct, dus halen waarschijnlijk de gemiddelde error naar beneden
        console.log("ME without 0 phase (orange) = "+ me_without_0);
    }

    showLoss(){
        this._calculateLoss("predictedDuration");
        this._calculateLoss("predictedDurationTFD");
        this._calculateLoss("predictedDurationTGFD");
    };


}

module.exports = Analytics;