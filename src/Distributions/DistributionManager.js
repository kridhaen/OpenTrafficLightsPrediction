
class DistributionManager{
    static storeInDistribution(generatedAtTime, phaseStart, signalGroup, lastPhase, observationUTC, distrubutionStore){
        let frequencyDistribution = distrubutionStore.get('fd');
        let timeFrequencyDistribution = distrubutionStore.get('tfd');
        let timeGroupedFrequencyDistribution = distrubutionStore.get('tgfd');

        let phaseDuration = new Date(generatedAtTime) - new Date(phaseStart[signalGroup]);
        //console.log("date: " + generatedAtTimeDate + "   duration: " + phaseDuration+"   phase: "+lastPhase[signalGroup]+" signalGroup: "+signalGroup);


        //opslaan in tabel frequentieverdeling
        frequencyDistribution.add(signalGroup, lastPhase[signalGroup], Math.round(phaseDuration/1000));

        //opslaan in frequentieverdeling op tijdstippen gesplitst
        timeFrequencyDistribution.add(signalGroup, lastPhase[signalGroup], observationUTC["year"], observationUTC["month"], observationUTC["day"], observationUTC["hour"], Math.floor(observationUTC["minute"]/20)*20, Math.round(phaseDuration/1000));

        //opslaan in frequentietabel gesplitst op week of weekend en op uur
        timeGroupedFrequencyDistribution.add(signalGroup, lastPhase[signalGroup], observationUTC["day"]===0||6 ? 1 : 0, observationUTC["hour"], Math.round(phaseDuration/1000));
    }
}

module.exports = DistributionManager;
