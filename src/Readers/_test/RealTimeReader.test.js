const RealTimeReader = require('../RealTimeReader');
const latest = require('../__mocks__/latest.js');

test('handleLatest', () => {
    let realTimeReader = new RealTimeReader("test",(res) => { expect(res).toBeDefined(); });
    realTimeReader.handleLatest(latest);
});

test('getLatestCyclic', () => {
    let realTimeReader = new RealTimeReader("test",(res) => { expect(res).toBeDefined(); });
    realTimeReader.getLatestCyclic(10);
});