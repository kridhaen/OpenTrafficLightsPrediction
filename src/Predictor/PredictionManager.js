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

                let predictedDuration = PredictionCalculator.calculateMeanDuration(futureDistribution);
                result.setTime(result.getTime() + predictedDuration * 1000);
                let likelyTime = result.toISOString();  //TODO: bugfix NaN
                if (minEndTime && maxEndTime && minEndTime === maxEndTime) { //als undefined, ook gelijk
                    likelyTime = minEndTime;
                } else if (likelyTime < minEndTime) {
                    likelyTime = minEndTime;
                } else if (likelyTime > maxEndTime) {
                    likelyTime = maxEndTime;
                }
                callback(likelyTime);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = PredictionManager;