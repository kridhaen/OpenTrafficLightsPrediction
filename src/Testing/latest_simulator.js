const n3 = require('n3');
const DistributionStore = require('../Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('../Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('../Readers/RealTimeReader.js');
const PredictionPublisher = require('../Publisher/PredictionPublisher.js');
const FragmentParser = require('../Readers/FragmentParser.js');
const DistributionManager = require('../Distributions/DistributionManager.js');
const PredictionManager = require('../Predictor/PredictionManager.js');
const Helper = require('../Readers/Helper.js');
const Analytics = require('../Analytics/Analytics.js');
const { DataFactory } = n3;
const { namedNode, literal } = DataFactory;

const filepath =  "./latest";

let predictionPublisher = new PredictionPublisher(8080);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment, file) => {
    console.log(file);
    console.log("publish");
    predictionPublisher.setLatestEndpoint(fragment);
    console.log("sleep");
    await sleep(1000);
    console.log("sleep done");
});



predictionPublisher.start();
let loop = function(){
    historicFileSystemReader.readAndParseSync()
        .then(() => {
            loop();
        });
};

loop();
