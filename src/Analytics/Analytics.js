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
            "loss": undefined});
        if(phaseDuration < 0 || phaseDuration > 3600){
            console.log("\x1b[31m",phaseDuration,"\x1b[0m");
        }
    }

    calculate(){
        for(let i = 0; i < this.list.length; i++){
            let { phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime} = this.list[i];
            let temp = this.list;
            let distribution = this.distributionStore.get("fd").getDistributions()[signalGroup][signalPhase];
            PredictionManager.predictLikelyTime(signalGroup, lastPhase, "", phaseStartDateTime, undefined, undefined, phaseStartDateTime, distribution, (likelyTime) => {
                temp[i]["lastPhaseLikelyTime"] = likelyTime;
                let phaseDuration = new Date(likelyTime) - new Date(phaseStartDateTime);
                phaseDuration = Math.round(phaseDuration/1000);
                temp[i]["predictedDuration"] = phaseDuration;
            });
        }
        return this.list;
    }

    calculateLoss(){
        let mse = 0;
        let me = 0;
        let me_without_0 = 0;
        let me_without_0_counter = 0;
        for(let i = 0; i < this.list.length; i++){
            let a = this.list[i]["predictedDuration"] - this.list[i]["phaseDuration"];
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
        console.log("I  | II\n" + "II | I_");
        console.log("MSE = "+ mse);
        console.log("ME = "+ me);   //oranje fase zijn altijd correct, dus halen waarschijnlijk de gemiddelde error naar beneden
        console.log("ME without 0 phase (orange) = "+ me_without_0);
    }


}

module.exports = Analytics;