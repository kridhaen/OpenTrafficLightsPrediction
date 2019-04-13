const FrequencyDistribution = require("../Types/FrequencyDistribution");

test('FrequencyDistribution: add', () => {
    let frequencyDistribution = new FrequencyDistribution();
    frequencyDistribution.add("group1","phase1","10");
    frequencyDistribution.add("group1","phase1","10");
    frequencyDistribution.add("group1","phase1","20");
    frequencyDistribution.add("group1","phase2","5");
    frequencyDistribution.add("group1","phase2","15");
    frequencyDistribution.add("group2","phase1","10");
    frequencyDistribution.add("group2","phase1","30");
    expect(frequencyDistribution.getDistributions()["group1"]["phase1"]["10"])
});

test('FrequencyDistribution: add + getDistributions', () => {
    let frequencyDistribution = new FrequencyDistribution();
    frequencyDistribution.add("group1","phase1","10");
    frequencyDistribution.add("group1","phase1","20");
    frequencyDistribution.add("group1","phase2","5");
    frequencyDistribution.add("group1","phase2","15");
    frequencyDistribution.add("group2","phase1","10");
    frequencyDistribution.add("group2","phase1","30");

    expect(Object.keys(frequencyDistribution.getDistributions()).length).toBe(2);
});

test('FrequencyDistribution: add + getDistributions number', () => {
    let frequencyDistribution = new FrequencyDistribution();
    frequencyDistribution.add("group1","phase1",10);
    frequencyDistribution.add("group1","phase1",10);
    frequencyDistribution.add("group1","phase1",10);
    expect(frequencyDistribution.getDistributions()["group1"]["phase1"][10]).toBe(3);
});

test('FrequencyDistribution: createDistributionsCSV', () => {
    let frequencyDistribution = new FrequencyDistribution();
    frequencyDistribution.add("group1","phase1","10");
    frequencyDistribution.add("group1","phase1","10");
    frequencyDistribution.add("group1","phase1","10");
    frequencyDistribution.add("group1","phase1","20");
    frequencyDistribution.add("group1","phase2","5");
    frequencyDistribution.add("group1","phase2","15");
    frequencyDistribution.add("group2","phase1","10");
    frequencyDistribution.add("group2","phase1","30");
    let result = [];
    result[0] = "signalGroup,signalphase,duration,amount\n"
        + "group1,phase1,10,3\n"
        + "group1,phase1,20,1\n";
    result[1] = "signalGroup,signalphase,duration,amount\n"
        + "group1,phase2,5,1\n"
        + "group1,phase2,15,1\n";
    result[2] = "signalGroup,signalphase,duration,amount\n"
        + "group2,phase1,10,1\n"
        + "group2,phase1,30,1\n";
    expect(frequencyDistribution.createDistributionsCSV()).toEqual(result);
});