const DistributionStore = require('./Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('./Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('./Readers/RealTimeReader.js');
const PredictionPublisher = require('./Publisher/PredictionPublisher.js');
const FragmentParser = require('./Readers/FragmentParser.js');
const DistributionManager = require('./Distributions/DistributionManager.js');

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);

let historicFragmentParser = new FragmentParser();
let historicFileSystemReader = new HistoricFileSystemReader(historicFragmentParser, distributionStore);

let realTimeFragmentParser = new FragmentParser();

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        predictionPublisher.setJSONDistributionEndpoint("distribution/fd", distributionStore.get("fd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tfd", distributionStore.get("tfd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tgfd", distributionStore.get("tgfd").getDistributions());

        let realTimeReader = new RealTimeReader(realTimeFragmentParser, distributionStore, predictionPublisher);
        realTimeReader.getLatestCyclic(1000);

    });
