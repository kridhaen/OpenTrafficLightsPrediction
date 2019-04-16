const RealTimeReader = require('../RealTimeReader');
const DistributionStore = require('../../Distributions/DistributionStore');
const PredictionPublisher = require('../../Publisher/PredictionPublisher');
const Helper = require('../Helper.js');
const Downloader = require('../Downloader.js');

it('writeN3Store', () => {
    let url = "https://lodi.ilabt.imec.be/observer/rawdata/latest";
    let distributionStore = new DistributionStore();
    let predictionPublisher = new PredictionPublisher();
    let realTimeReader = new RealTimeReader(distributionStore, predictionPublisher);
    expect.assertions(4);
    return Downloader.download(url).then(async (response) => {
        let store = await Helper.parseAndStoreQuads(response);
        expect(store).toBeDefined();
        return Helper.writeN3Store(store).then((result) => {
            expect(result).toBeDefined();
            expect(result).not.toBe('');
            //expect(result).toEqual(response);
            expect(result.length).toEqual(response.length);
        });
    });
});