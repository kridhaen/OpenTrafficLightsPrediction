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

    static calculateMedianDuration(frequencyDistribution){
        let count = 0;
        Object.keys(frequencyDistribution).forEach((duration) => {
            count+=frequencyDistribution[duration];
        });
        let runner = 0;
        let median = undefined;
        let i = 0;
        let list = Object.keys(frequencyDistribution);
        while(median === undefined && i<list.length){
            if(count/2 > runner && count/2 <= runner+frequencyDistribution[list[i]]){
                median = list[i];
            }
            runner+=frequencyDistribution[list[i]];
            i++;
        }
        if(count === 0){
            return undefined;
        }
        else {
            return parseInt(median, 10);
        }
    }
}

module.exports = PredictionCalculator;