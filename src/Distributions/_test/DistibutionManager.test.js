const DistributionManager = require('../DistributionManager.js');
const DistributionStore = require('../DistributionStore.js');

test('createDistributions', () => {
   let distributionStore = new DistributionStore();
   DistributionManager.createDistributions(distributionStore);
   expect(distributionStore.getNames().length).toBe(3);
});

test('storeInDistribution', () => {
    expect.assertions(9);
    let distributionStore = new DistributionStore();
    let lastPhase = {};
    let signalGroup = "3";
    lastPhase[signalGroup] = "6";
    //sunday
    DistributionManager.createDistributions(distributionStore);
    DistributionManager.storeInDistribution("2019-04-14T16:57:46.000Z","2019-04-14T16:57:36.000Z",signalGroup,lastPhase,distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()[signalGroup]).toBeDefined();
    }
    //saturday
    DistributionManager.storeInDistribution("2019-04-13T16:57:46.000Z","2019-04-13T16:57:36.000Z",signalGroup,lastPhase,distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()[signalGroup]).toBeDefined();
    }
    //friday
    DistributionManager.storeInDistribution("2019-04-12T16:57:46.000Z","2019-04-12T16:57:36.000Z",signalGroup,lastPhase,distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()[signalGroup]).toBeDefined();
    }
});