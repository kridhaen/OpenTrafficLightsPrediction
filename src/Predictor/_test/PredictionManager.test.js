const PredictionManager = require('../PredictionManager.js');
const FrequencyDistribution = require('../../Distributions/Types/FrequencyDistribution.js');
const PredictionCalculator = require('../PredictionCalculator.js');

test('predictLikelyTime: min < likely < max',() => {
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 10;
    let testTime = "2019-04-13T16:57:31.000Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    let minEndTime = new Date(new Date(testTime).getTime() +5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +20000).toISOString();
    let distribution = frequencyDistribution.get(signalGroup,signalPhase);
    expect.assertions(4);
    let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMedianDuration);
    expect(likelyTime).toEqual("2019-04-13T16:57:41.000Z");
    expect(likelyTime).not.toEqual(testTime);
    expect(likelyTime).not.toEqual(minEndTime);
    expect(likelyTime).not.toEqual(maxEndTime);
});

test('predictLikelyTime: prediction < minEndTime',() => {
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 5;
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +20000).toISOString();
    let distribution = frequencyDistribution.get(signalGroup,signalPhase);
    expect.assertions(3);
    let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMedianDuration);
    expect(likelyTime).toEqual(minEndTime);
    expect(likelyTime).not.toEqual(maxEndTime);
    expect(likelyTime).not.toEqual(testTime);
});

test('predictLikelyTime: prediction > maxEndTime',() => {
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    let minEndTime = new Date(new Date(testTime).getTime() +5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let distribution = frequencyDistribution.get(signalGroup,signalPhase);
    expect.assertions(3);
    let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMedianDuration);
    expect(likelyTime).toEqual(maxEndTime);
    expect(likelyTime).not.toEqual(minEndTime);
    expect(likelyTime).not.toEqual(testTime);
});

test('predictLikelyTime: minEndTime = maxEndTime',() => {
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let distribution = frequencyDistribution.get(signalGroup,signalPhase);
    expect.assertions(3);
    let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMedianDuration);
    expect(likelyTime).toEqual(maxEndTime);
    expect(likelyTime).toEqual(minEndTime);
    expect(likelyTime).not.toEqual(testTime);
});

test('predictLikelyTime: min < likely < max and generatedAtTime in distribution',() => {
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
    let minEndTime = new Date(new Date(testTime).getTime() + 5000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() + 25000).toISOString();
    let distribution = frequencyDistribution.get(signalGroup,signalPhase);
    expect.assertions(8);
    let likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime1, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMeanDuration);
    expect(likelyTime).toEqual("2019-04-13T16:57:46.000Z");
    expect(likelyTime).not.toEqual(testTime);
    expect(likelyTime).not.toEqual(minEndTime);
    expect(likelyTime).not.toEqual(maxEndTime);
    likelyTime = PredictionManager.predictLikelyTime(signalGroup, signalPhase, generatedAtTime2, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMeanDuration);
    expect(likelyTime).toEqual("2019-04-13T16:57:51.000Z");
    expect(likelyTime).not.toEqual(testTime);
    expect(likelyTime).not.toEqual(minEndTime);
    expect(likelyTime).not.toEqual(maxEndTime);
});

//TODO: empty store? crash, als signalgroup al niet bestaat, crash
test('predictLikelyTime: distribution is empty',() => {
    let frequencyDistribution = new FrequencyDistribution();
    let signalGroup = "a";
    let signalPhase = "b";
    let duration = 20;
    let testTime = "2019-04-13T16:57:31.245Z";
    let phaseStart = testTime;
    let generatedAtTime = testTime;
    frequencyDistribution.add(signalGroup, signalPhase, duration);
    let minEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let maxEndTime = new Date(new Date(testTime).getTime() +10000).toISOString();
    let distribution = frequencyDistribution.get("a","d");
    expect.assertions(1);
    let likelyTime = PredictionManager.predictLikelyTime("a", "d", generatedAtTime, minEndTime, maxEndTime, phaseStart, distribution, PredictionCalculator.calculateMedianDuration);
    expect(likelyTime).toEqual(undefined);
});