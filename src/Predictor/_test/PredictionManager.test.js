const PredictionManager = require('../PredictionManager.js');
const DistributionStore = require('../../Distributions/DistributionStore.js');
const FrequencyDistribution = require('../../Distributions/Types/FrequencyDistribution.js');

test('predictLikelyTime: min < likely < max',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 10;
    let phaseStart = {};
    let testTime = "2019-04-13T16:57:31.000Z";
    phaseStart[signalGroup] = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +20000).toISOString();
    expect.assertions(4);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual("2019-04-13T16:57:41.000Z");
        expect(likelyTime).not.toEqual(testTime);
        expect(likelyTime).not.toEqual(minEndTime);
        expect(likelyTime).not.toEqual(maxEndTime);
    })
});

test('predictLikelyTime: prediction < minEndTime',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 5;
    let phaseStart = {};
    let testTime = "2019-04-13T16:57:31.245Z";
    phaseStart[signalGroup] = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +20000).toISOString();
    expect.assertions(3);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual(minEndTime);
        expect(likelyTime).not.toEqual(maxEndTime);
        expect(likelyTime).not.toEqual(testTime);
    })
});

test('predictLikelyTime: prediction > maxEndTime',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let phaseStart = {};
    let testTime = "2019-04-13T16:57:31.245Z";
    phaseStart[signalGroup] = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    expect.assertions(3);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual(maxEndTime);
        expect(likelyTime).not.toEqual(minEndTime);
        expect(likelyTime).not.toEqual(testTime);
    })
});

test('predictLikelyTime: minEndTime = maxEndTime',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let phaseStart = {};
    let testTime = "2019-04-13T16:57:31.245Z";
    phaseStart[signalGroup] = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    expect.assertions(3);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual(maxEndTime);
        expect(likelyTime).toEqual(minEndTime);
        expect(likelyTime).not.toEqual(testTime);
    })
});

//TODO: empty store? crash, als signalgroup al niet bestaat, crash
test('predictLikelyTime: distributionStore does not contain or is empty',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let phaseStart = {};
    let testTime = "2019-04-13T16:57:31.245Z";
    phaseStart[signalGroup] = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    expect.assertions(0);
    PredictionManager.predictLikelyTime("a", "d", "state", minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual(maxEndTime);
        expect(likelyTime).toEqual(minEndTime);
        expect(likelyTime).not.toEqual(testTime);
    })
});