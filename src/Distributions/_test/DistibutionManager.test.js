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
    let observationUTC = {};
    observationUTC["hour"] = 15;
    observationUTC["month"] = 4;
    observationUTC["minute"] = 19;
    observationUTC["day"] = 0;    //0 == sunday
    observationUTC["year"] = 2019;
    let lastPhase = {};
    let signalGroup = "3";
    lastPhase[signalGroup] = "6";
    DistributionManager.createDistributions(distributionStore);
    DistributionManager.storeInDistribution("2019-04-13T16:57:46.000Z","2019-04-13T16:57:36.000Z",signalGroup,lastPhase,observationUTC,distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()[signalGroup]).toBeDefined();
    }
    let observationUTC2 = {};
    observationUTC2["hour"] = 15;
    observationUTC2["month"] = 4;
    observationUTC2["minute"] = 19;
    observationUTC2["day"] = 6;    //0 == sunday
    observationUTC2["year"] = 2019;
    DistributionManager.storeInDistribution("2019-04-13T16:57:46.000Z","2019-04-13T16:57:36.000Z",signalGroup,lastPhase,observationUTC2,distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()[signalGroup]).toBeDefined();
    }
    let observationUTC3 = {};
    observationUTC3["hour"] = 15;
    observationUTC3["month"] = 4;
    observationUTC3["minute"] = 19;
    observationUTC3["day"] = 5;    //0 == sunday
    observationUTC3["year"] = 2019;
    DistributionManager.storeInDistribution("2019-04-13T16:57:46.000Z","2019-04-13T16:57:36.000Z",signalGroup,lastPhase,observationUTC3,distributionStore);
    for(let name of distributionStore.getNames()){
        expect(distributionStore.get(name).getDistributions()[signalGroup]).toBeDefined();
    }
});