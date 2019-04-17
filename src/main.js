const n3 = require('n3');
const DistributionStore = require('./Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('./Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('./Readers/RealTimeReader.js');
const PredictionPublisher = require('./Publisher/PredictionPublisher.js');
const FragmentParser = require('./Readers/FragmentParser.js');
const DistributionManager = require('./Distributions/DistributionManager.js');
const PredictionManager = require('./Predictor/PredictionManager.js');
const Helper = require('./Readers/Helper.js');
const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);

let historicFragmentParser = new FragmentParser();
let historicFileSystemReader = new HistoricFileSystemReader(async (fragment) => {
        await historicFragmentParser.handleFragment(fragment, (returnObject) => {
            let { signalGroup, generatedAtTime, observationUTC, phaseStart, lastPhase } = returnObject;
            DistributionManager.storeInDistribution(generatedAtTime, phaseStart, signalGroup, lastPhase, observationUTC, distributionStore);
    }, undefined, undefined, undefined);
});

let realTimeFragmentParser = new FragmentParser();

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        predictionPublisher.setJSONDistributionEndpoint("distribution/fd", distributionStore.get("fd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tfd", distributionStore.get("tfd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tgfd", distributionStore.get("tgfd").getDistributions());

        let realTimeReader = new RealTimeReader(async (latest) => {
            await realTimeFragmentParser.handleFragment(latest, undefined, undefined,
                (returnObject) => {
                    let { signalGroup, signalPhase, signalState, minEndTime, maxEndTime, observation, store, phaseStart } = returnObject;
                    PredictionManager.predictLikelyTime(signalGroup, signalPhase, signalState, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
                        store.addQuad(signalState.object, namedNode('https://w3id.org/opentrafficlights#likelyTime'), literal(likelyTime,namedNode("http://www.w3.org/2001/XMLSchema#date")), observation.subject);
                    })
                },
                async (returnObject) => {
                    let { store, prefixes } = returnObject;
                    await Helper.writeN3Store(store).then((result) => {predictionPublisher.setLatestEndpoint(prefixes+"\n"+result)});
                }
            );
        });
        realTimeReader.getLatestCyclic(1000);

    });
