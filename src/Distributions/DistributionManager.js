const FrequencyDistribution = require("./Types/FrequencyDistribution.js");
const TimeFrequencyDistribution = require('./Types/TimeFrequencyDistribution.js');
const TimeGroupedFrequencyDistribution = require('./Types/TimeGroupedFrequencyDistribution.js');

class DistributionManager{
    static createDistributions(distributionStore){
        let timeFrequencyDistribution = new TimeFrequencyDistribution();
        let frequencyDistribution = new FrequencyDistribution();
        let timeGroupedFrequencyDistribution = new TimeGroupedFrequencyDistribution();

        distributionStore.add(frequencyDistribution, "fd");
        distributionStore.add(timeFrequencyDistribution, "tfd");
        distributionStore.add(timeGroupedFrequencyDistribution, "tgfd");
    }


    static storeInDistribution(phaseEndDateTime, phaseStartDateTime, signalGroup, signalPhase, observationUTC, distributionStore){
        let frequencyDistribution = distributionStore.get('fd');
        let timeFrequencyDistribution = distributionStore.get('tfd');
        let timeGroupedFrequencyDistribution = distributionStore.get('tgfd');

        //TODO: klopt dit wel??
        let phaseDuration = new Date(phaseEndDateTime) - new Date(phaseStartDateTime);

        //opslaan in tabel frequentieverdeling
        frequencyDistribution.add(signalGroup, signalPhase, Math.round(phaseDuration/1000));

        //opslaan in frequentieverdeling op tijdstippen gesplitst
        timeFrequencyDistribution.add(signalGroup, signalPhase, observationUTC["year"], observationUTC["month"], observationUTC["day"], observationUTC["hour"], Math.floor(observationUTC["minute"]/20)*20, Math.round(phaseDuration/1000));

        //opslaan in frequentietabel gesplitst op week of weekend en op uur
        timeGroupedFrequencyDistribution.add(signalGroup, signalPhase, observationUTC["day"]===(0||6) ? 1 : 0, observationUTC["hour"], Math.round(phaseDuration/1000));
    }
}

module.exports = DistributionManager;
