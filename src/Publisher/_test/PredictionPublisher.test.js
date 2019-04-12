const PredictionPublisher = require('../PredictionPublisher.js');
const request = require('supertest');

it('get /', () => {
    let predictionPublisher = new PredictionPublisher(8080);
    expect.assertions(1);
    return request(predictionPublisher._getExpressAppForUsageInTests())
        .get('/')
        .then((res) => {
            expect(res.statusCode).toBe(200);
        });
});

it('get /latest', () => {
    let predictionPublisher = new PredictionPublisher(8080);
    predictionPublisher.setLatestEndpoint('test');
    return request(predictionPublisher._getExpressAppForUsageInTests())
        .get('/latest')
        .expect('Content-Type','application/trig; charset=utf-8')
        .expect(200);
});

it('get /latest 404 no data', () => {
    let predictionPublisher = new PredictionPublisher(8080);
    predictionPublisher.setLatestEndpoint(undefined);
    return request(predictionPublisher._getExpressAppForUsageInTests())
        .get('/latest')
        .expect('Content-Type','application/trig')
        .expect(404);
});

it('get custom /test json endpoint', () => {
    let predictionPublisher = new PredictionPublisher(8080);
    predictionPublisher.setJSONDistributionEndpoint("test", JSON.stringify({"testresult":"success"}));
    expect.assertions(1);
    return request(predictionPublisher._getExpressAppForUsageInTests())
        .get('/test')
        .expect('Content-Type','application/json; charset=utf-8')
        .expect(200)
        .then((res) => {
            expect(res.text).toEqual(JSON.stringify({"testresult":"success"}));
        });
});

it('get custom /test json endpoint 404 no data', () => {
    let predictionPublisher = new PredictionPublisher(8080);
    predictionPublisher.setJSONDistributionEndpoint("test", undefined);
    expect.assertions(1);
    return request(predictionPublisher._getExpressAppForUsageInTests())
        .get('/test')
        .expect('Content-Type','application/json; charset=utf-8')
        .expect(404)
        .then((res) => {
            expect(res.text).toEqual(JSON.stringify({'error':404}));
        });
});