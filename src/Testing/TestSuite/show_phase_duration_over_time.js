const n3 = require('n3');
const DistributionStore = require('../../Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('../../Readers/HistoricFileSystemReader.js');
const RealTimeReader = require('../../Readers/RealTimeReader.js');
const PredictionPublisher = require('../../Publisher/PredictionPublisher.js');
const FragmentParser = require('../../Readers/FragmentParser.js');
const DistributionManager = require('../../Distributions/DistributionManager.js');
const DurationsManager = require('../../Distributions/DurationsManager.js');
const PredictionManager = require('../../Predictor/PredictionManager.js');
const Helper = require('../../Readers/Helper.js');
const Analytics = require('../../Analytics/Result.js');
const { DataFactory } = n3;
const { namedNode, literal } = DataFactory;

const filepath =  "./previous";

let durations = {};

let historicFragmentParser = new FragmentParser(false, false);
let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment, file) => {

    //TODO: remove file param -> debugging
    await historicFragmentParser.handleFragment(fragment, undefined, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
        if(!durations[signalGroup]){
            durations[signalGroup] = {};
        }
        if(!durations[signalGroup][lastPhase]){
            durations[signalGroup][lastPhase] = [];
        }
        let phaseDuration = (new Date(generatedAtTime).getTime() - new Date(lastPhaseStart).getTime()) / 1000;
        durations[signalGroup][lastPhase].push({x: new Date(lastPhaseStart), y: phaseDuration});
    }, (returnObject) => {

    }, () => {

    }, undefined, (signalGroup) => {

    });

});

let predictionPublisher = new PredictionPublisher(8081);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        console.log("publishing");
        // console.log(durations);
        predictionPublisher.setJSONDistributionEndpoint("durations", durations);

    });

//output is all the phase durations chronologically for each signalGroup and signalPhase