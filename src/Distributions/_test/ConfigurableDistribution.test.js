const ConfigurableDistribution = require("../Configuration/ConfigurableDistribution.js");

test('ConfigurableDistribution: add', () => {
    let frequencyDistribution = new ConfigurableDistribution(2);
    frequencyDistribution.add("10", ["group1","phase1"]);
    frequencyDistribution.add("10", ["group1","phase1"]);
    frequencyDistribution.add("20", ["group1","phase1"]);
    frequencyDistribution.add("5",["group1","phase2"]);
    frequencyDistribution.add("15", ["group1","phase2"]);
    frequencyDistribution.add("10",["group2","phase1"]);
    frequencyDistribution.add("30",["group2","phase1"]);
    expect(frequencyDistribution.getDistributions()["group1"]["phase1"]["10"]).toEqual(2);
});

test('ConfigurableDistribution: add + getDistributions', () => {
    let frequencyDistribution = new ConfigurableDistribution(2);
    frequencyDistribution.add("10", ["group1","phase1"]);
    frequencyDistribution.add("20", ["group1","phase1"]);
    frequencyDistribution.add("5",["group1","phase2"]);
    frequencyDistribution.add("15", ["group1","phase2"]);
    frequencyDistribution.add("10", ["group2","phase1"]);
    frequencyDistribution.add("30", ["group2","phase1"]);

    expect(Object.keys(frequencyDistribution.getDistributions()).length).toBe(2);
});

test('ConfigurableDistribution: add + get', () => {
    let frequencyDistribution = new ConfigurableDistribution(2);
    frequencyDistribution.add("10", ["group1","phase1"]);
    frequencyDistribution.add("20", ["group1","phase1"]);
    frequencyDistribution.add("5",["group1","phase2"]);
    frequencyDistribution.add("15", ["group1","phase2"]);
    frequencyDistribution.add("10", ["group2","phase1"]);
    frequencyDistribution.add("30", ["group2","phase1"]);

    expect(Object.keys(frequencyDistribution.get(["group1", "phase1"])).length).toBe(2);
});

test('ConfigurableDistribution: add + getDistributions number', () => {
    let frequencyDistribution = new ConfigurableDistribution(2);
    frequencyDistribution.add(10, ["group1","phase1"]);
    frequencyDistribution.add(10, ["group1","phase1"]);
    frequencyDistribution.add(10, ["group1","phase1"]);
    expect(frequencyDistribution.getDistributions()["group1"]["phase1"][10]).toBe(3);
});

test('ConfigurableDistribution: calculateDurationMeanOccupancy', () => {
    let frequencyDistribution = new ConfigurableDistribution(2);
    frequencyDistribution.add(10, ["group1","phase1"]);
    frequencyDistribution.add(10, ["group1","phase1"]);
    frequencyDistribution.add(10, ["group1","phase1"]);
    expect(frequencyDistribution.calculateDistributionsMeanOccupancy()).toBe(3);
    frequencyDistribution.add(10, ["group2","phase1"]);
    frequencyDistribution.add(20, ["group2","phase1"]);
    frequencyDistribution.add(20, ["group2","phase1"]);
    frequencyDistribution.add(20, ["group2","phase2"]);
    frequencyDistribution.add(20, ["group2","phase2"]);
    expect(frequencyDistribution.calculateDistributionsMeanOccupancy()).toBe(2);
});

// test('ConfigurableDistribution: createDistributionsCSV', () => {
//     let frequencyDistribution = new FrequencyDistribution();
//     frequencyDistribution.add("group1","phase1","10");
//     frequencyDistribution.add("group1","phase1","10");
//     frequencyDistribution.add("group1","phase1","10");
//     frequencyDistribution.add("group1","phase1","20");
//     frequencyDistribution.add("group1","phase2","5");
//     frequencyDistribution.add("group1","phase2","15");
//     frequencyDistribution.add("group2","phase1","10");
//     frequencyDistribution.add("group2","phase1","30");
//     let result = [];
//     result[0] = "signalGroup,signalphase,duration,amount\n"
//         + "group1,phase1,10,3\n"
//         + "group1,phase1,20,1\n";
//     result[1] = "signalGroup,signalphase,duration,amount\n"
//         + "group1,phase2,5,1\n"
//         + "group1,phase2,15,1\n";
//     result[2] = "signalGroup,signalphase,duration,amount\n"
//         + "group2,phase1,10,1\n"
//         + "group2,phase1,30,1\n";
//     expect(frequencyDistribution.createDistributionsCSV()).toEqual(result);
// });