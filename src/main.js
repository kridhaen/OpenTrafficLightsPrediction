const n3 = require('n3');
const DistributionStore = require('./Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('./Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('./Readers/RealTimeReader.js');
const PredictionPublisher = require('./Publisher/PredictionPublisher.js');
const FragmentParser = require('./Readers/FragmentParser.js');
const DistributionManager = require('./Distributions/DistributionManager.js');
const PredictionManager = require('./Predictor/PredictionManager.js');
const PredictionCalculator = require('./Predictor/PredictionCalculator.js');
const Helper = require('./Readers/Helper.js');
const { DataFactory } = n3;
const { namedNode, literal } = DataFactory;

const datasetUrl = 'https://lodi.ilabt.imec.be/observer/rawdata/latest';
const filepath = "./previous_empty";

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);

let historicFragmentParser = new FragmentParser();
let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment, file) => {
        await historicFragmentParser.handleFragment(fragment, file, (returnObject) => {
            let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase} = returnObject;
            DistributionManager.storeInDistribution(generatedAtTime, lastPhaseStart, signalGroup, lastPhase, distributionStore);    //correct
    }, undefined, undefined, undefined);

});

let realTimeFragmentParser = new FragmentParser(false, true);

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        predictionPublisher.setJSONDistributionEndpoint("distribution/fd", distributionStore.get("fd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tfd", distributionStore.get("tfd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tgfd", distributionStore.get("tgfd").getDistributions());

        let realTimeReader = new RealTimeReader(datasetUrl, async (latest) => {
            await realTimeFragmentParser.handleFragment(latest, undefined,
                (returnObject) => {
                    let { signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, lastPhaseStart, lastPhase, phaseStart } = returnObject;
                    DistributionManager.storeInDistribution(generatedAtTime, lastPhaseStart, signalGroup, lastPhase, distributionStore);    //correct
                },
                undefined,
                (returnObject) => {
                    let { signalGroup, signalPhase, signalState, generatedAtTime, minEndTime, maxEndTime, observation, store, lastPhaseStart, lastPhase, phaseStart } = returnObject;
                    let observationUTC = Helper.splitDateInParts(phaseStart);
                    let distribution = distributionStore.get("fd").get(signalGroup,signalPhase);
                    // let distribution = distributionStore.get("tfd").get(signalGroup,signalPhase,observationUTC["year"],observationUTC["month"],observationUTC["day"],observationUTC["hour"],Math.floor(observationUTC["minute"]/20)*20);
                    let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMedianDuration);
                    !likelyTime ? console.log("no likelyTime") : console.log(likelyTime);
                    likelyTime && store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), literal(likelyTime,namedNode("http://www.w3.org/2001/XMLSchema#date")), observation.subject);
                },
                async (returnObject) => {
                    let { store, prefixes } = returnObject;
                    await Helper.writeN3Store(store, prefixes).then((result) => {predictionPublisher.setLatestEndpoint(result)});
                }
            );
        });

        realTimeReader.getLatestCyclic(1000); //TODO: uncomment + bugfix last observation bigger than new and invalid time value for predictlikelytime

    });
