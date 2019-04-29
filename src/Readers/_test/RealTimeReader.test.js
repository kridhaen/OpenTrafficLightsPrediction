const RealTimeReader = require('../RealTimeReader');
const latest = require('../__mocks__/latest.js');

test('handleLatest', () => {
    expect.assertions(1);
    let realTimeReader = new RealTimeReader("test",(res) => { expect(res).toBeDefined(); });
    return realTimeReader.handleLatest(latest);
});

test('getLatestCyclic', () => { //TODO: cyclisch, crasht waarschijnlijk, dataset url ook nog niet abstrageerd
    // expect.assertions(1);
    // let count = 0;
    // let realTimeReader = new RealTimeReader("test",(res) => {
    //     if(count === 0){
    //         expect(res).toBeDefined()
    //     }
    //     count++;
    // });
    // return realTimeReader.getLatestCyclic(10);
});