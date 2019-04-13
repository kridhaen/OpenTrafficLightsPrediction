const PredictionCalculator = require('./PredicionCalculator.js');
const n3 = require('n3');
const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

class PredictionManager{
    static predictLikelyTime(signalGroup, signalPhase, signalState, minEndTime, maxEndTime, phaseStart, distributionStore, callback){
        if(distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]) {
            let predictedDuration = PredictionCalculator.calculateMeanDuration(distributionStore.get('fd').getDistributions()[signalGroup][signalPhase]);
            let result = new Date(phaseStart[signalGroup]);
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