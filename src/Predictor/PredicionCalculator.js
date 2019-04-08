class PredictionCalculator{
    static calculateMeanDuration(frequencyDistribution){
        let weightedSum = 0;
        let count = 0;
        Object.keys(frequencyDistribution).forEach((duration) => {
            count++;
            weightedSum = weightedSum + duration * frequencyDistribution[duration];
        });
        return Math.round(weightedSum / count);
    }

}