const DistributionStore = require('./Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('./Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('./Readers/RealTimeReader.js');
const PredictionPublisher = require('./Publisher/PredictionPublisher.js');

let distributionStore = new DistributionStore();
let historicFileSystemReader = new HistoricFileSystemReader();

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync(distributionStore)
    .then(() => {

        let realTimeReader = new RealTimeReader(distributionStore, predictionPublisher);
        realTimeReader.getLatestCyclic(6000);


        // let predictionPublisher = new PredictionPublisher(8080);
        // predictionPublisher.setLatestEndpoint();
    });


