const HistoricFileSystemReader = require('../HistoricFileSystemReader.js');
const FragmentParser = require('../FragmentParser.js');
const DistributionManager = require('../../Distributions/DistributionManager.js');
const DistributionStore = require('../../Distributions/DistributionStore.js');


const filepath =  "./previous_small";

test("dataset contains no invalid observations", () => {
    let distributionStore = new DistributionStore();
    DistributionManager.createDistributions(distributionStore);

    const testFn = jest.fn();


    let historicFragmentParser = new FragmentParser(false, false);
    let historicFileSystemReader = new HistoricFileSystemReader(filepath, async (fragment) => {

        return await historicFragmentParser.handleFragment(fragment, undefined,(returnObject) => {
            let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
            DistributionManager.storeInDistribution(generatedAtTime, lastPhaseStart, signalGroup, lastPhase, distributionStore);    //correct
            expect(new Date(generatedAtTime).getTime() < new Date(maxEndTime).getTime()).toBeTruthy();

        }, (returnObject) => {
            let { signalGroup, signalPhase, generatedAtTime, lastPhaseStart, lastPhase, minEndTime, maxEndTime } = returnObject;
            expect(new Date(generatedAtTime).getTime()).toBeLessThanOrEqual(new Date(maxEndTime).getTime());

        }, undefined, undefined, (signalGroup) => {


        });
    });

    return historicFileSystemReader.readAndParseSync()
        .then(() => {
            testFn();
            expect(testFn).toBeCalled();
        });
}, 600000);
