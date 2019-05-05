const PredictionCalculator = require('./PredicionCalculator.js');

//TODO: als min === max, kan al terug geven voordat moet worden gerekend
//TODO: remove phaseDuration param -> debugging
//TODO: confidence -> vb %dat de predictedValue wel degelijk voorkwam tov alle voorkomens (die ook nog kunnen voorkomen, dus in futureDistribution)
class PredictionManager{
    static predictLikelyTime(phaseDuration, signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, callback){
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
                let predictedDuration = PredictionCalculator.calculateMeanDuration(futureDistribution);
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
                //debug
                if(maxEndTime && phaseDuration && new Date(phaseStart).getTime()+phaseDuration*1000 > new Date(maxEndTime).getTime()+2000){
                    console.log("Phase longer than max! -> phaseDuration: "+phaseDuration +" predictedDuration: "+ predictedDuration+ " maxEndTime: "+maxEndTime +" endTime: "+new Date(new Date(phaseStart).getTime()+phaseDuration*1000).toISOString());
                }
                if(maxEndTime && observationTime.getTime() > new Date(maxEndTime).getTime()){
                    console.log("observation longer than max! -> observation: "+observationTime.toISOString() + " maxEndTime: "+ maxEndTime);
                }
                callback(likelyTime);   //TODO: undefined likelyTime if prediction not possible
            }
        } catch (e) {
            //console.log(e);
        }
    }
}

module.exports = PredictionManager;