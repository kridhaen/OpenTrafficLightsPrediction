const FrequencyDistribution = require("./Types/FrequencyDistribution.js");
const TimeFrequencyDistribution = require('./Types/TimeFrequencyDistribution.js');
const TimeGroupedFrequencyDistribution = require('./Types/TimeGroupedFrequencyDistribution.js');
const Helper = require("../Readers/Helper.js");

class DistributionManager{
    static createDistributions(distributionStore){
        let timeFrequencyDistribution = new TimeFrequencyDistribution();
        let frequencyDistribution = new FrequencyDistribution();
        let timeGroupedFrequencyDistribution = new TimeGroupedFrequencyDistribution();

        distributionStore.add(frequencyDistribution, "fd");
        distributionStore.add(timeFrequencyDistribution, "tfd");
        distributionStore.add(timeGroupedFrequencyDistribution, "tgfd");
    }


    static storeInDistribution(phaseEndDateTime, phaseStartDateTime, signalGroup, signalPhase, distributionStore){
        let frequencyDistribution = distributionStore.get('fd');
        let timeFrequencyDistribution = distributionStore.get('tfd');
        let timeGroupedFrequencyDistribution = distributionStore.get('tgfd');

        let phaseStartDate = Helper.splitDateInParts(phaseStartDateTime);   //put the date in distributions based on start time of the phase

        let phaseDuration = new Date(phaseEndDateTime).getTime() - new Date(phaseStartDateTime).getTime();

        //opslaan in tabel frequentieverdeling
        frequencyDistribution.add(signalGroup, signalPhase, Math.round(phaseDuration/1000));

        //opslaan in frequentieverdeling op tijdstippen gesplitst
        timeFrequencyDistribution.add(signalGroup, signalPhase, phaseStartDate["year"], phaseStartDate["month"], phaseStartDate["day"], phaseStartDate["hour"], Math.floor(phaseStartDate["minute"]/20)*20, Math.round(phaseDuration/1000));

        //opslaan in frequentietabel gesplitst op week of weekend en op uur
        timeGroupedFrequencyDistribution.add(signalGroup, signalPhase, phaseStartDate["day"]===(0||6) ? 1 : 0, phaseStartDate["hour"], Math.round(phaseDuration/1000));
    }
}

module.exports = DistributionManager;
