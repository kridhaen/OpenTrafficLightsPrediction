const DistributionStore = require('../../../Distributions/DistributionStore.js');
const HistoricFileSystemReader = require('../../../Readers/HistoricFileSystemReader.js');
const PredictionPublisher = require('../../../Publisher/PredictionPublisher.js');
const FragmentParser = require('../../../Readers/FragmentParser.js');
const DistributionManager = require('../../../Distributions/DistributionManager.js');
const Analytics = require('./Result.js');

const filepath =  "./previous";

let distributionStore = new DistributionStore();
DistributionManager.createDistributions(distributionStore);

let analytics = new Analytics(distributionStore);
let observations = 0;
let changes = 0;
let same = 0;
let clearNoEndYet = 0;

let a = process.hrtime();
let timeDuration = 0;
let timeCount = 0;
let showCount = 0;
console.log((process.memoryUsage().heapUsed / 1024 / 1024) +" MB");

let historicFragmentParser = new FragmentParser();  //TODO: remove file?
let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment, file) => {

    let c = process.hrtime();
    //TODO: remove file param -> debugging
    await historicFragmentParser.handleFragment(fragment, file, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime, maxDidIncrease } = returnObject;
        analytics.add(undefined, generatedAtTime, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, generatedAtTime, generatedAtTime, lastPhaseStart, maxDidIncrease); //TODO: uitwerken
        changes++;
    }, (returnObject) => {
        let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime, maxDidIncrease } = returnObject;
        analytics.add(undefined, lastPhaseStart, signalGroup, signalPhase, lastPhase, minEndTime, maxEndTime, generatedAtTime, undefined, lastPhaseStart, maxDidIncrease);
        same++
    }, () => {observations++}, undefined, (signalGroup) => {
        analytics.clearNoEndYetList(signalGroup); //TODO: clear ook lijst, want als ongeldig kan einde niet meer worden gevonden, want is gereset, dus volgende einde hoort misschien niet bij diegene in de lijst
        clearNoEndYet++;
    });
    let d = process.hrtime(c);
    timeDuration+= (d[1] / 1000000000);
    timeCount++;
    showCount++;
    if(showCount === 1000){
        console.log(timeDuration/timeCount);
        console.log(timeDuration);
        showCount = 0;
    }
});

let outputToCSV = (data) => {
    let output = "MAE,,FD,,,TFD,,,TGFD,,\n";
    output += "signalGroup,signalPhase,median,mean,modus,median,mean,modus,median,mean,modus\n";
    Object.keys(data).forEach((signalGroup) => {
        Object.keys(data[signalGroup]).forEach((signalPhase) => {
            output+=signalGroup+","+signalPhase;
            Object.keys(data[signalGroup][signalPhase]).forEach((distributionType) => {
                Object.keys(data[signalGroup][signalPhase][distributionType]).forEach((predictionType) => {
                    let rounded = Math.round(data[signalGroup][signalPhase][distributionType][predictionType].abs_me*100)/100;
                    output+=","+rounded;
                });
            });
            output+="\n";
        });
    });
   return output;
};

let predictionPublisher = new PredictionPublisher(8080);
predictionPublisher.start();
historicFileSystemReader.readAndParseSync()
    .then(() => {
        let b = process.hrtime(a);
        console.log((process.memoryUsage().heapUsed / 1024 / 1024) +" MB");
        console.log(b);
        let c = process.hrtime();
        console.log("same: "+ same+"\nchanges: "+changes+"\nobservations: "+observations+"\nerrors in fragmentParser: "+(observations-changes-same)+"\ncleared NoEndYet: "+clearNoEndYet+"\n");
        historicFragmentParser.printDebugInfo();
        console.log("calculate predictions");
        let resultList = analytics.executeTestSuite();
        let d = process.hrtime(c);
        console.log(d);
        console.log((process.memoryUsage().heapUsed / 1024 / 1024) +" MB");

        predictionPublisher.setJSONDistributionEndpoint("analytics", JSON.stringify(resultList));
        HistoricFileSystemReader.printToFile(outputToCSV(resultList), "per_phase", ".txt");

    });
