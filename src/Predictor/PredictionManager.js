const PredictionCalculator = require('./PredicionCalculator.js');

class PredictionManager{
    static predictLikelyTime(signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, phaseStart, distributionStore, callback){
        if(distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]) {
            let distribution = distributionStore.get('fd').getDistributions()[signalGroup][signalPhase];
            let result = new Date(phaseStart);

            let elapsedDuration = (generatedAtTime.getTime() - result.getTime()) / 1000;
            let futureDistribution = {};
            Object.keys(distribution).forEach((key) => {
                if(key > elapsedDuration){  //TODO: should > or >= ?
                    futureDistribution[key] = distribution[key];
                }
            });

            let predictedDuration = PredictionCalculator.calculateMeanDuration(futureDistribution);
            result.setTime(result.getTime() + predictedDuration * 1000);
            let likelyTime = result.toISOString();
            if(minEndTime === maxEndTime){
                likelyTime = minEndTime;
            }
            else if(likelyTime < minEndTime){
                likelyTime = minEndTime;
            }
            else if(likelyTime > maxEndTime){
                likelyTime = maxEndTime;
            }
            callback(likelyTime);
        }
    }
}

module.exports = PredictionManager;