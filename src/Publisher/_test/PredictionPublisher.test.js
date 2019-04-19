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

it('start and stop server listening', () => {
    const onStartedMock = jest.fn();
    const onStoppedMock = jest.fn();
    let predictionPublisher = new PredictionPublisher(8080);
    expect.assertions(2);
    return predictionPublisher.start().then(() => {
        onStartedMock();
        expect(onStartedMock).toBeCalled();
    }).then(() => {
        return predictionPublisher.stop().then(() => {
            onStoppedMock();
            expect(onStoppedMock).toBeCalled();
        });
    });
});

it('start, restart and stop server listening', () => {
    const onStartedMock = jest.fn();
    const onRestartedMock = jest.fn();
    const onStoppedMock = jest.fn();
    let predictionPublisher = new PredictionPublisher(8080);
    expect.assertions(3);
    return predictionPublisher.start().then(() => {
        onStartedMock();
        expect(onStartedMock).toBeCalled();
    }).then(() => {
        return predictionPublisher.start().then(() => {
            onRestartedMock();
            expect(onRestartedMock).toBeCalled();
        }).then(() => {
            return predictionPublisher.stop().then(() => {
                onStoppedMock();
                expect(onStoppedMock).toBeCalled();
            });
        });
    });
});

it('stop server listening without start', () => {
    const onStoppedMock = jest.fn();
    let predictionPublisher = new PredictionPublisher(8080);
    expect.assertions(2);
    predictionPublisher.stop().then(() => {
       onStoppedMock();
    }).catch((res) => {
        expect(onStoppedMock).not.toBeCalled();
        expect(res).toBe("No server listening");
    });

});

it('constructor, start, stop without port', () => {
    expect.assertions(3);
    const onStartedMock = jest.fn();
    const onStoppedMock = jest.fn();
    let predictionPublisher = undefined;
    expect(() => {
        predictionPublisher = new PredictionPublisher();
    }).not.toThrow();
    return predictionPublisher.start().then(() => {
        onStartedMock();
        expect(onStartedMock).toBeCalled();
    }).then(() => {
        return predictionPublisher.stop().then(() => {
            onStoppedMock();
            expect(onStoppedMock).toBeCalled();
        });
    });
});

it('constructor, start, stop, port=1234', () => {
    expect.assertions(3);
    const onStartedMock = jest.fn();
    const onStoppedMock = jest.fn();
    let predictionPublisher = undefined;
    expect(() => {
        predictionPublisher = new PredictionPublisher(1234);
    }).not.toThrow();
    return predictionPublisher.start().then(() => {
        onStartedMock();
        expect(onStartedMock).toBeCalled();
    }).then(() => {
        return predictionPublisher.stop().then(() => {
            onStoppedMock();
            expect(onStoppedMock).toBeCalled();
        });
    });
});