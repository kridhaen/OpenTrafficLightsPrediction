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
        else{
            //console.log(phaseDuration);
        }
    }

    calculate(){
        for(let i = 0; i < this.list.length; i++){
            let { phaseStartDateTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime} = this.list[i];
            let temp = this.list;
            PredictionManager.predictLikelyTime(signalGroup, lastPhase, "", phaseStartDateTime, undefined, undefined, phaseStartDateTime, this.distributionStore, (likelyTime) => {
                temp[i]["lastPhaseLikelyTime"] = likelyTime;
                let phaseDuration = new Date(likelyTime) - new Date(phaseStartDateTime);
                phaseDuration = Math.round(phaseDuration/1000);
                temp[i]["predictedDuration"] = phaseDuration;
            });
        }
        return this.list;
    }

    calculateLoss(){
        let loss = 0;
        for(let i = 0; i < this.list.length; i++){
            let a = this.list[i]["predictedDuration"] - this.list[i]["phaseDuration"];
            loss += a*a;
        }
        loss = loss / this.list.length;
        console.log("I  | II\n" + "II | I_");
        console.log("= "+ loss);
    }


}

module.exports = Analytics;