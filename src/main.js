const DistributionStore = require('./Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('./Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('./Readers/RealTimeReader.js');
const PredictionPublisher = require('./Publisher/PredictionPublisher.js');
const FragmentParser = require('./Readers/FragmentParser.js');
const FrequencyDistribution = require("./Distributions/FrequencyDistribution.js");
const TimeFrequencyDistribution = require('./Distributions/TimeFrequencyDistribution.js');
const TimeGroupedFrequencyDistribution = require('./Distributions/TimeGroupedFrequencyDistribution.js');

let distributionStore = new DistributionStore();

let timeFrequencyDistribution = new TimeFrequencyDistribution();
let frequencyDistribution = new FrequencyDistribution();
let timeGroupedFrequencyDistribution = new TimeGroupedFrequencyDistribution();

distributionStore.add(frequencyDistribution, "fd");
distributionStore.add(timeFrequencyDistribution, "tfd");
distributionStore.add(timeGroupedFrequencyDistribution, "tgfd");

let historicFragmentParser = new FragmentParser();
let historicFileSystemReader = new HistoricFileSystemReader(historicFragmentParser, distributionStore);

let realTimeFragmentParser = new FragmentParser();

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {

        let realTimeReader = new RealTimeReader(distributionStore, predictionPublisher, realTimeFragmentParser);
        realTimeReader.getLatestCyclic(6000);


        // let predictionPublisher = new PredictionPublisher(8080);
        // predictionPublisher.setLatestEndpoint();
    });
