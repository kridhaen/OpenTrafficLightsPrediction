const DistributionManager = require('../DistributionManager.js');
const DistributionStore = require('../DistributionStore.js');

test('createDistributions', () => {
   let distributionStore = new DistributionStore();
   DistributionManager.createDistributions(distributionStore);
   expect(distributionStore.getNames().length).toBe(3);
});

test('storeInDistribution', () => {
    let distributionStore = new DistributionStore();
    DistributionManager.createDistributions(distributionStore);
    DistributionManager.storeInDistribution("1","2","3","4","5",distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()["3"]).toBeDefined();
    }
});