const DistributionStore = require('../../Distributions/DistributionStore.js');
const TestFileReader = require('./TestFileReader.js');
const PredictionPublisher = require('../../Publisher/PredictionPublisher.js');
const FragmentParser = require('../../Readers/FragmentParser.js');
const DistributionManager = require('../../Distributions/DistributionManager.js');
const DurationsManager = require('../../Distributions/DurationsManager.js');
const Analytics = require('../../Analytics/Result.js');

//const filepath = "./previous";
const filepath =  "./previous";

let testRuns = 10;
let runCounter = 0;
let results = [];

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);
let durationsManager = new DurationsManager(1);

let analytics = new Analytics(distributionStore, durationsManager);
let observations = 0;
let changes = 0;
let same = 0;
let clearNoEndYet = 0;

let historicFragmentParser = new FragmentParser();  //TODO: remove file?
let testHistoricFragmentParser = new FragmentParser();
let historicFileSystemReader = new TestFileReader(filepath, 10, async (fragment, file) => {

    await historicFragmentParser.handleFragment(fragment, file, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
        DistributionManager.storeInDistribution(generatedAtTime, lastPhaseStart, signalGroup, lastPhase, distributionStore);    //correct
        changes++;
    }, (returnObject) => {
        same++
    }, () => {observations++}, undefined, (signalGroup) => {

    });
},async (fragment, file) => {

    await testHistoricFragmentParser.handleFragment(fragment, file, (returnObject) => {
        let {signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime} = returnObject;
        analytics.add(undefined, generatedAtTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, generatedAtTime, generatedAtTime, lastPhaseStart); //TODO: uitwerken
        durationsManager.add(signalGroup, lastPhase, new Date(generatedAtTime).getTime() / 1000 - new Date(lastPhaseStart).getTime() / 1000);
        changes++;
    }, (returnObject) => {
        let {signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime} = returnObject;
        analytics.add(undefined, lastPhaseStart, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, generatedAtTime, undefined, lastPhaseStart);
        same++
    }, () => {
        observations++
    }, undefined, (signalGroup) => {
        analytics.clearNoEndYetList(signalGroup); //TODO: clear ook lijst, want als ongeldig kan einde niet meer worden gevonden, want is gereset, dus volgende einde hoort misschien niet bij diegene in de lijst
        clearNoEndYet++;
    });
}, () => {
    historicFragmentParser = new FragmentParser();
    testHistoricFragmentParser = new FragmentParser();
    distributionStore = new DistributionStore();
    DistributionManager.createDistributions(distributionStore);
    durationsManager = new DurationsManager(1);
    analytics = new Analytics(distributionStore, durationsManager);
}, () => {
    analytics.calculate();
    results[runCounter] = analytics.showLoss();
    runCounter++;
    // distributionStore = new DistributionStore();
    // DistributionManager.createDistributions(distributionStore);
    // durationsManager = new DurationsManager(1);
    // analytics = new Analytics(distributionStore, durationsManager);

}, () => {
    predictionPublisher.setJSONDistributionEndpoint("result", results);
});

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {

        console.log("same: "+ same+"\nchanges: "+changes+"\nobservations: "+observations+"\nerrors in fragmentParser: "+(observations-changes-same)+"\ncleared NoEndYet: "+clearNoEndYet+"\n");
        historicFragmentParser.printDebugInfo();
        console.log("calculate predictions");
        let analyticsList = analytics.calculate();
        predictionPublisher.setJSONDistributionEndpoint("analytics", analyticsList);
        console.log("calculate deviations");
        let deviations = analytics.showLoss();
        predictionPublisher.setJSONDistributionEndpoint("deviations", deviations);


    });
