const PredictionCalculator = require('./PredicionCalculator.js');

//TODO: signalState not used
//TODO: als min === max, kan al terug geven voordat moet worden gerekend
class PredictionManager{
    static predictLikelyTime(signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, callback){
        try {
            if (distribution && Object.keys(distribution).length > 0) {
                let result = new Date(phaseStart);
                let observationTime = new Date(generatedAtTime);

                let elapsedDuration = (observationTime.getTime() - result.getTime()) / 1000;
                let futureDistribution = {};
                Object.keys(distribution).forEach((key) => {    //calculate mean only over future durations, not past
                    if (key > elapsedDuration) {  //TODO: should > or >= ?
                        futureDistribution[key] = distribution[key];
                    }
                });
                //if futureDistribution = empty -> predictedDuration = NaN
                let likelyTime = undefined;
                let predictedDuration = PredictionCalculator.calculateMeanDuration(futureDistribution);
                if(predictedDuration !== undefined){
                    result.setTime(result.getTime() + predictedDuration * 1000);
                    likelyTime = result.toISOString();
                }
                else {
                    let x = "help";
                }
                if (minEndTime && maxEndTime && minEndTime === maxEndTime) { //als undefined, ook gelijk
                    likelyTime = minEndTime;
                } else if (likelyTime!== undefined && likelyTime < minEndTime) {
                    likelyTime = minEndTime;
                } else if (likelyTime !== undefined && likelyTime > maxEndTime) {
                    likelyTime = maxEndTime;
                }
                callback(likelyTime);   //TODO: undefined likelyTime if prediction not possible
            }
        } catch (e) {
            //console.log(e);
        }
    }
}

module.exports = PredictionManager;