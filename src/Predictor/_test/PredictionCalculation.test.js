const PredictionCalculator = require("../PredicionCalculator");

test('PredictionCalculation: calculateMeanDuration', () => {
    let distribution = { "10": 5, "20": 10 };
    expect(PredictionCalculator.calculateMeanDuration(distribution)).toBe(17);
});