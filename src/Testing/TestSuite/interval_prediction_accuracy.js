const DistributionStore = require('../../Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('../../Readers/HistoricFileSystemReader.js');
const PredictionPublisher = require('../../Publisher/PredictionPublisher.js');
const FragmentParser = require('../../Readers/FragmentParser.js');
const DistributionManager = require('../../Distributions/DistributionManager.js');
const PredictionCalculator = require('../../Predictor/PredictionCalculator.js');

const filepath =  "./previous";

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
            Object.keys(distribution).forEach((key) => {
                // let y = distribution;
                // observations += distribution[value];
                let value = Number.parseInt(key, 10);
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
                if(item !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0"){
                    calculator(distribution[item]);
                }
            });
        }
    };

    calculator(dist);
    return percentages/distributions;
};

let calculateDistributionsInterval = (dist, part) => {
    let distributions = 0;
    let percentages = 0;

    let calculator = (distribution) => {
        if(isObject(distribution) && isNumber(distribution[Object.keys(distribution)[0]]) ){
            distributions++;
            let min = undefined;
            let max = undefined;
            Object.keys(distribution).forEach((key) => {
                // let y = distribution;
                // observations += distribution[value];
                let value = Number.parseInt(key, 10);
                if(value < min || min === undefined){
                    min = value;
                }
                if(value > max || max === undefined){
                    max = value;
                }
            });
            // let count = 0;
            // Object.keys(distribution).forEach((duration) => {
            //     count+=distribution[duration];
            // });
            // let runner = 0;
            // let result = undefined;
            // let i = 0;
            // let list = Object.keys(distribution);
            // while(result === undefined && i<list.length){
            //     if(count*part > runner && count*part <= runner+distribution[list[i]]){
            //         result = list[i];
            //     }
            //     runner+=distribution[list[i]];
            //     i++;
            // }
            // if(result !== undefined){
            //     min = Number.parseInt(result, 10);
            // }
            min = PredictionCalculator.calculatePartDuration(distribution, part);
            max = PredictionCalculator.calculatePartDuration(distribution, 1-part);
            let mean = PredictionCalculator.calculateMeanDuration(distribution);
            let median = PredictionCalculator.calculateMedianDuration(distribution);

            percentages += (min / median) * 100;
        }
        else{
            Object.keys(distribution).forEach((item) => {
                if(item !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0"){
                    calculator(distribution[item]);
                }
            });
        }
    };

    calculator(dist);
    return percentages/distributions;
};

let calculateMedianDuration = (dist) => {
    let distributions = 0;
    let medians = 0;

    let calculator = (distribution) => {
        if(isObject(distribution) && isNumber(distribution[Object.keys(distribution)[0]]) ){
            distributions++;
            let median = PredictionCalculator.calculateMedianDuration(distribution);
            medians += median;
        }
        else{
            Object.keys(distribution).forEach((item) => {
                if(item !== "https://w3id.org/opentrafficlights/thesauri/signalphase/0"){
                    calculator(distribution[item]);
                }
            });
        }
    };

    calculator(dist);
    return medians/distributions;
};

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        predictionPublisher.setJSONDistributionEndpoint("distribution/fd", distributionStore.get("fd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tfd", distributionStore.get("tfd").getDistributions());
        predictionPublisher.setJSONDistributionEndpoint("distribution/tgfd", distributionStore.get("tgfd").getDistributions());
        console.log("fd: "+calculateDistributionsMinMax(distributionStore.get("fd").getDistributions()));
        console.log("tfd: "+calculateDistributionsMinMax(distributionStore.get("tfd").getDistributions()));
        console.log("tgfd: "+calculateDistributionsMinMax(distributionStore.get("tgfd").getDistributions()));
        console.log(" ");
        console.log("1%fd: "+calculateDistributionsInterval(distributionStore.get("fd").getDistributions(), 0.01));
        console.log("1%tfd: "+calculateDistributionsInterval(distributionStore.get("tfd").getDistributions(), 0.01));
        console.log("1%tgfd: "+calculateDistributionsInterval(distributionStore.get("tgfd").getDistributions(), 0.01));
        console.log(" ");
        console.log("5%fd: "+calculateDistributionsInterval(distributionStore.get("fd").getDistributions(), 0.05));
        console.log("5%tfd: "+calculateDistributionsInterval(distributionStore.get("tfd").getDistributions(), 0.05));
        console.log("5%tgfd: "+calculateDistributionsInterval(distributionStore.get("tgfd").getDistributions(), 0.05));
        console.log(" ");
        console.log("10%fd: "+calculateDistributionsInterval(distributionStore.get("fd").getDistributions(), 0.1));
        console.log("10%tfd: "+calculateDistributionsInterval(distributionStore.get("tfd").getDistributions(), 0.1));
        console.log("10%tgfd: "+calculateDistributionsInterval(distributionStore.get("tgfd").getDistributions(), 0.1));
        console.log(" ");
        console.log("15%fd: "+calculateDistributionsInterval(distributionStore.get("fd").getDistributions(), 0.15));
        console.log("15%tfd: "+calculateDistributionsInterval(distributionStore.get("tfd").getDistributions(), 0.15));
        console.log("15%tgfd: "+calculateDistributionsInterval(distributionStore.get("tgfd").getDistributions(), 0.15));
        console.log(" ");
        console.log("20%fd: "+calculateDistributionsInterval(distributionStore.get("fd").getDistributions(), 0.2));
        console.log("20%tfd: "+calculateDistributionsInterval(distributionStore.get("tfd").getDistributions(), 0.2));
        console.log("20%tgfd: "+calculateDistributionsInterval(distributionStore.get("tgfd").getDistributions(), 0.2));
        console.log("\nmedian durations:");
        console.log(calculateMedianDuration(distributionStore.get("tfd").getDistributions()));
    });

//test to show the percentage of the minimum duration in the given interval relative to the maximum value in the interval or to the median value