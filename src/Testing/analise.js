const n3 = require('n3');
const DistributionStore = require('../Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('../Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('../Readers/RealTimeReader.js');
const PredictionPublisher = require('../Publisher/PredictionPublisher.js');
const FragmentParser = require('../Readers/FragmentParser.js');
const DistributionManager = require('../Distributions/DistributionManager.js');
const DurationsManager = require('../Distributions/DurationsManager.js');
const PredictionManager = require('../Predictor/PredictionManager.js');
const Helper = require('../Readers/Helper.js');
const Analytics = require('../Analytics/Result.js');
const { DataFactory } = n3;
const { namedNode, literal } = DataFactory;

const datasetUrl = 'https://lodi.ilabt.imec.be/observer/rawdata/latest';
//const filepath = "./previous";
const filepath =  "./previous_small";

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);
let durationsManager = new DurationsManager(5);

let analytics = new Analytics(distributionStore, durationsManager);
let observations = 0;
let changes = 0;
let same = 0;
let clearNoEndYet = 0;

let a = process.hrtime();
let timeDuration = 0;
let timeCount = 0;
let showCount = 0;

let historicFragmentParser = new FragmentParser();  //TODO: remove file?
let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment, file) => {

    let c = process.hrtime();
    //TODO: remove file param -> debugging
    await historicFragmentParser.handleFragment(fragment, file, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
        DistributionManager.storeInDistribution(generatedAtTime, lastPhaseStart, signalGroup, lastPhase, distributionStore);    //correct
        analytics.add(undefined, generatedAtTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, generatedAtTime, generatedAtTime, lastPhaseStart); //TODO: uitwerken
        durationsManager.add(signalGroup, lastPhase, new Date(generatedAtTime).getTime()/1000 - new Date(lastPhaseStart).getTime()/1000);
        changes++;
    }, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
        analytics.add(undefined, lastPhaseStart, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, generatedAtTime, undefined, lastPhaseStart);
        same++
    }, () => {observations++}, undefined, (signalGroup) => {
        analytics.clearNoEndYetList(signalGroup); //TODO: clear ook lijst, want als ongeldig kan einde niet meer worden gevonden, want is gereset, dus volgende einde hoort misschien niet bij diegene in de lijst
        clearNoEndYet++;
    });
    let d = process.hrtime(c);
    timeDuration+= (d[1] / 1000000000);
    timeCount++;
    showCount++;
    if(showCount === 1000){
        console.log(timeDuration/timeCount);
        console.log(timeDuration);
        showCount = 0;
    }
});

let realTimeFragmentParser = new FragmentParser();

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        let b = process.hrtime(a);
        console.log(b);
        predictionPublisher.setJSONDistributionEndpoint("distribution/fd", distributionStore.get("fd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tfd", distributionStore.get("tfd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tgfd", distributionStore.get("tgfd").getDistributions());

        // let realTimeReader = new RealTimeReader(datasetUrl, async (latest) => {
        //     await realTimeFragmentParser.handleFragment(latest, undefined, undefined,
        //         (returnObject) => {
        //             let { signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, lastPhaseStart, lastPhase } = returnObject;
        //             let distribution = distributionStore.get("fd").get(signalGroup,signalPhase);
        //             PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, lastPhaseStart, distribution, (likelyTime) => {
        //                 store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), literal(likelyTime,namedNode("http://www.w3.org/2001/XMLSchema#date")), observation.subject);
        //             })
        //         },
        //         async (returnObject) => {
        //             let { store, prefixes } = returnObject;
        //             await Helper.writeN3Store(store, prefixes).then((result) => {predictionPublisher.setLatestEndpoint(result)});
        //         }
        //     );
        // });

        //realTimeReader.getLatestCyclic(1000); //TODO: uncomment + bugfix last observation bigger than new and invalid time value for predictlikelytime
        console.log("same: "+ same+"\nchanges: "+changes+"\nobservations: "+observations+"\nerrors in fragmentParser: "+(observations-changes-same)+"\ncleared NoEndYet: "+clearNoEndYet+"\n");
        historicFragmentParser.printDebugInfo();
        console.log("calculate predictions");
        let analyticsList = analytics.calculate();
        predictionPublisher.setJSONDistributionEndpoint("analytics", analyticsList);
        //HistoricFileSystemReader.printToFile({analyticsList}, "analyticsList", ".txt");
        console.log("calculate deviations");
        let deviations = analytics.showLoss();
        predictionPublisher.setJSONDistributionEndpoint("deviations", deviations);


    });
