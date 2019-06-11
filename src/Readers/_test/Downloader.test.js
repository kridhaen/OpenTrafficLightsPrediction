const Downloader = require('../Downloader.js');

it('download https://lodi.ilabt.imec.be/observer/rawdata/latest',() => {
    let url = "https://lodi.ilabt.imec.be/observer/rawdata/latest";
    expect.assertions(1);
    return Downloader.download(url).then((res) => {expect(res).toBeDefined();}).catch((res) => {expect(res).toBeDefined(); console.log(url + " not available")});
});

it('download invalid request',() => {
    let url = "invalidUrl";
    expect.assertions(1);
    return Downloader.download(url).catch((res) => {expect(res).toBeDefined();});
});