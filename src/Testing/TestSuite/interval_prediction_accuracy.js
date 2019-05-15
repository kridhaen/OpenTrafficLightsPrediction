const DistributionStore = require('../../Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('../../Readers/HistoricFileSystemReader.js');
const PredictionPublisher = require('../../Publisher/PredictionPublisher.js');
const FragmentParser = require('../../Readers/FragmentParser.js');
const DistributionManager = require('../../Distributions/DistributionManager.js');

const filepath =  "./previous_small";

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);


let historicFragmentParser = new FragmentParser();
let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment, file) => {
    await historicFragmentParser.handleFragment(fragment, file, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
        DistributionManager.storeInDistribution(generatedAtTime, lastPhaseStart, signalGroup, lastPhase, distributionStore);    //correct

    }, (returnObject) => {

    }, () => {}, undefined, (signalGroup) => {

    });

});

let realTimeFragmentParser = new FragmentParser();

// Returns if a value is an object
function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}
// Returns if a value is really a number
function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
}

let calculateDistributionsMinMax = (dist) => {
    let distributions = 0;
    let percentages = 0;

    let calculator = (distribution) => {
        if(isObject(distribution) && isNumber(distribution[Object.keys(distribution)[0]]) ){
            distributions++;
            let min = undefined;
            let max = undefined;
            Object.keys(distribution).forEach((value) => {
                // let y = distribution;
                // observations += distribution[value];
                if(value < min || min === undefined){
                    min = value;
                }
                if(value > max || max === undefined){
                    max = value;
                }
            });
            percentages += (min / max) * 100;
        }
        else{
            Object.keys(distribution).forEach((item) => {
                calculator(distribution[item]);
            });
        }
    };

    calculator(dist);
    return percentages/distributions;
};

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        console.log("fd: "+calculateDistributionsMinMax(distributionStore.get("fd").getDistributions()));
        console.log("tfd: "+calculateDistributionsMinMax(distributionStore.get("tfd").getDistributions()));
        console.log("tfgd: "+calculateDistributionsMinMax(distributionStore.get("tgfd").getDistributions()));
    });
