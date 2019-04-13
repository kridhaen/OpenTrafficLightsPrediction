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

        let realTimeReader = new RealTimeReader(distributionStore, predictionPublisher, realTimeFragmentParser);
        realTimeReader.getLatestCyclic(6000);

    });
