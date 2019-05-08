const PredictionCalculator = require('./PredictionCalculator.js');

//TODO: als min === max, kan al terug geven voordat moet worden gerekend
//TODO: remove phaseDuration param -> debugging
//TODO: confidence -> vb %dat de predictedValue wel degelijk voorkwam tov alle voorkomens (die ook nog kunnen voorkomen, dus in futureDistribution)
class PredictionManager{
    //simple median value
    static predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution){
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
                //if futureDistribution = empty -> predictedDuration = undefined
                let likelyTime = undefined;

                //TODO: mean or median -> median better results
                // let predictedDuration = PredictionCalculator.calculateMeanDuration(futureDistribution);
                let predictedDuration = PredictionCalculator.calculateMedianDuration(futureDistribution);
                // let predictedDuration = PredictionCalculator.calculateMostCommonDuration(futureDistribution);

                if(predictedDuration !== undefined){
                    result.setTime(result.getTime() + predictedDuration * 1000);
                    likelyTime = result.toISOString();
                }
                if (minEndTime && maxEndTime && minEndTime === maxEndTime) { //TODO: min en max niet precies -> duration komt soms niet helemaal overeen (zie hieronder) -> voorspelling zit afwijking op!!!
                    likelyTime = minEndTime;
                } else if (likelyTime!== undefined && likelyTime < minEndTime) {
                    likelyTime = minEndTime;
                } else if (likelyTime !== undefined && likelyTime > maxEndTime) {
                    likelyTime = maxEndTime;
                }
                //TODO: als geen prediction meer mogelijk, maar alle historische waarden liggen onder minEndTime -> minEndTime als prediction (en omgekeerd voor max)?
                // if(likelyTime === undefined){
                //     likelyTime = minEndTime;
                // }
                return likelyTime;   //TODO: undefined likelyTime if prediction not possible
            }
        } catch (e) {
            //console.log(e);
        }
    }

    //next is same as previous
    static predictLikelyTimeSamePrevious(lastPhaseDuration, signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution){
        try {
            if (distribution && Object.keys(distribution).length > 0) {
                let result = new Date(phaseStart);
                let likelyTime = undefined;
                let predictedDuration = lastPhaseDuration;
                if(predictedDuration !== undefined){
                    result.setTime(result.getTime() + predictedDuration * 1000);
                    likelyTime = result.toISOString();
                }
                if (minEndTime && maxEndTime && minEndTime === maxEndTime) { //TODO: min en max niet precies -> duration komt soms niet helemaal overeen (zie hieronder) -> voorspelling zit afwijking op!!!
                    likelyTime = minEndTime;
                } else if (likelyTime!== undefined && likelyTime < minEndTime) {
                    likelyTime = minEndTime;
                } else if (likelyTime !== undefined && likelyTime > maxEndTime) {
                    likelyTime = maxEndTime;
                }
                //TODO: als geen prediction meer mogelijk, maar alle historische waarden liggen onder minEndTime -> minEndTime als prediction (en omgekeerd voor max)?
                return likelyTime;   //TODO: undefined likelyTime if prediction not possible
            }
        } catch (e) {
            //console.log(e);
        }
    }

    static predictLikelyTimeBasedOnPreviousPrediction(lastPhaseDuration, lastPredictedDuration, signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution){
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
                //if futureDistribution = empty -> predictedDuration = undefined
                let likelyTime = undefined;
                let lastPredictionRelativeError = (lastPredictedDuration-lastPhaseDuration)/lastPhaseDuration;
                let predictedDuration = PredictionCalculator.calculatePartDuration(futureDistribution, lastPredictionRelativeError);
                if(predictedDuration !== undefined){
                    result.setTime(result.getTime() + predictedDuration * 1000);
                    likelyTime = result.toISOString();
                }
                if (minEndTime && maxEndTime && minEndTime === maxEndTime) { //TODO: min en max niet precies -> duration komt soms niet helemaal overeen (zie hieronder) -> voorspelling zit afwijking op!!!
                    likelyTime = minEndTime;
                } else if (likelyTime!== undefined && likelyTime < minEndTime) {
                    likelyTime = minEndTime;
                } else if (likelyTime !== undefined && likelyTime > maxEndTime) {
                    likelyTime = maxEndTime;
                }
                //TODO: als geen prediction meer mogelijk, maar alle historische waarden liggen onder minEndTime -> minEndTime als prediction (en omgekeerd voor max)?
                return likelyTime;   //TODO: undefined likelyTime if prediction not possible
            }
        } catch (e) {
            //console.log(e);
        }
    }
}

module.exports = PredictionManager;