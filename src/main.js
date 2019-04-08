const DistributionStore = require('./Distributions/DistributionStore.js');
const FragmentConverter = require('./Readers/HistoricFileSystemReader.js');
const PredictionPublisher = require('./Publisher/PredictionPublisher.js');

let distributionStore = new DistributionStore();
let fragmentConverter = new FragmentConverter();
fragmentConverter.readAndParseSync(distributionStore);




let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.setLatestEndpoint();

