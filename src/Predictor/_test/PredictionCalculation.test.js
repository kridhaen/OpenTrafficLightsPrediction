const PredictionCalculator = require("../PredicionCalculator");

test('PredictionCalculation: calculateMeanDuration', () => {
    let distribution = { "10": 5, "20": 10 };
    expect(PredictionCalculator.calculateMeanDuration(distribution)).toBe(17);
});

test('PredictionCalculation: calculateMeanDuration empty distribution', () => {
    let distribution = {};
    expect(PredictionCalculator.calculateMeanDuration(distribution)).toBe(undefined);
});

test('PredictionCalculation: calculateMedianDuration', () => {
    let distribution = { "10": 5, "20": 10 };
    expect(PredictionCalculator.calculateMedianDuration(distribution)).toEqual(20);
});

test('PredictionCalculation: calculateMedianDuration same', () => {
    let distribution = { "10": 5, "20": 5 };
    expect(PredictionCalculator.calculateMedianDuration(distribution)).toEqual(10);
});

test('PredictionCalculation: calculateMedianDuration empty distribution', () => {
    let distribution = {};
    expect(PredictionCalculator.calculateMedianDuration(distribution)).toBe(undefined);
});

test('PredictionCalculation: calculatePartDuration', () => {
    let distribution = { "10": 5, "20": 10 };
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.2)).toEqual(10);
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.3)).toEqual(10);
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.5)).toEqual(20);
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.7)).toEqual(20);
});

test('PredictionCalculation: calculatePartDuration same', () => {
    let distribution = { "10": 5, "20": 5 };
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.2)).toEqual(10);
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.5)).toEqual(10);
    expect(PredictionCalculator.calculatePartDuration(distribution, 0.8)).toEqual(20);
});

test('PredictionCalculation: calculatePartDuration empty distribution', () => {
    let distribution = {};
    expect(PredictionCalculator.calculatePartDuration(distribution)).toBe(undefined);
});