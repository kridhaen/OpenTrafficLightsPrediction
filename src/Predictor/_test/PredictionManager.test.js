const PredictionManager = require('../PredictionManager.js');
const DistributionStore = require('../../Distributions/DistributionStore.js');
const FrequencyDistribution = require('../../Distributions/Types/FrequencyDistribution.js');

test('predictLikelyTime: min < likely < max',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 10;
    let testTime = "2019-04-13T16:57:31.000Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +20000).toISOString();
    expect.assertions(4);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", generatedAtTime, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
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
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +20000).toISOString();
    expect.assertions(3);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", generatedAtTime, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
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
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    expect.assertions(3);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", generatedAtTime, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
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
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    expect.assertions(3);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", generatedAtTime, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual(maxEndTime);
        expect(likelyTime).toEqual(minEndTime);
        expect(likelyTime).not.toEqual(testTime);
    })
});

test('predictLikelyTime: min < likely < max and generatedAtTime in distribution',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration1 = 10;
    let duration2 = 20;
    let testTime = "2019-04-13T16:57:31.000Z";
    let phaseStart = testTime;
    let generatedAtTime1 = new Date(new Date(testTime).getTime() + 5000).toISOString();
    let generatedAtTime2 = new Date(new Date(testTime).getTime() + 15000).toISOString();
    frequencyDistribution.add(signalGroup, signalPhase, duration1);
    frequencyDistribution.add(signalGroup, signalPhase, duration2);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() + 5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() + 25000).toISOString();
    expect.assertions(8);
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", generatedAtTime1, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual("2019-04-13T16:57:46.000Z");
        expect(likelyTime).not.toEqual(testTime);
        expect(likelyTime).not.toEqual(minEndTime);
        expect(likelyTime).not.toEqual(maxEndTime);
    });
    PredictionManager.predictLikelyTime(signalGroup, signalPhase, "state", generatedAtTime2, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual("2019-04-13T16:57:51.000Z");
        expect(likelyTime).not.toEqual(testTime);
        expect(likelyTime).not.toEqual(minEndTime);
        expect(likelyTime).not.toEqual(maxEndTime);
    })
});

//TODO: empty store? crash, als signalgroup al niet bestaat, crash
test('predictLikelyTime: distributionStore does not contain or is empty',() => {
    let distributionStore = new DistributionStore();
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    distributionStore.add(frequencyDistribution, "fd");
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    expect.assertions(0);
    PredictionManager.predictLikelyTime("a", "d", "state", generatedAtTime, minEndTime, maxEndTime, phaseStart, distributionStore, (likelyTime) => {
        expect(likelyTime).toEqual(maxEndTime);
        expect(likelyTime).toEqual(minEndTime);
        expect(likelyTime).not.toEqual(testTime);
    })
});