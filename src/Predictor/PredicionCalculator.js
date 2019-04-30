class PredictionCalculator{
    static calculateMeanDuration(frequencyDistribution){
        let weightedSum = 0;
        let count = 0;
        Object.keys(frequencyDistribution).forEach((duration) => {
            count+=frequencyDistribution[duration];
            weightedSum = weightedSum + duration * frequencyDistribution[duration];
        });
        if(count === 0){
            return undefined;
        }
        else {
            return Math.round(weightedSum / count); //TODO: kan delen door 0 -> NaN
        }
    }
}

module.exports = PredictionCalculator;