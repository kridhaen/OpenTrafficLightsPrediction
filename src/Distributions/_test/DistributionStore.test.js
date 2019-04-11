const DistributionStore = require("../DistributionStore");

test('distributionStore add and get', () => {
   let distributionStore = new DistributionStore();
   let distribution = { "5": 10, "6": 20 };
   distributionStore.add(distribution, "test");
   expect(distributionStore.get("test")).toBe(distribution);
});

test('distributionStore getNames', () => {
    let distributionStore = new DistributionStore();
    let distribution = { "5": 10, "6": 20 };
    distributionStore.add(distribution, "test1");
    distributionStore.add(distribution, "test2");
    distributionStore.add(distribution, "test3");

    expect(distributionStore.getNames().length).toBe(3);
    expect(distributionStore.getNames()[0]).toBe("test1");
    expect(distributionStore.getNames()[1]).toBe("test2");
    expect(distributionStore.getNames()[2]).toBe("test3");
});