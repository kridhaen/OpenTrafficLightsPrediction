const latest = require("../__mocks__/latest.js");
const Helper = require("../Helper.js");

test('parseAndStoreQuads', () => {
    expect.assertions(4);
    return Helper.parseAndStoreQuads(latest).then((res) => {
        let { store, prefixes } = res;
        expect(store).toBeDefined();
        expect(prefixes).toBeDefined();
        expect(store.getQuads().length).toEqual(693);
        expect(Object.keys(prefixes).length).toEqual(8);
    });
});

test('writeN3Store', async () => {
   expect.assertions(2);
   let { store, prefixes } = await Helper.parseAndStoreQuads(latest);
   return Helper.writeN3Store(store, prefixes).then((res) => {
       expect(res).toBeDefined();
       expect(res.toString().length).toBeGreaterThan(0);
   });
});