const Downloader = require('../Downloader.js');

it('download https://lodi.ilabt.imec.be/observer/rawdata/latest',() => {
    let url = "https://lodi.ilabt.imec.be/observer/rawdata/latest";
    expect.assertions(1);
    return Downloader.download(url).then((res) => {expect(res).toBeDefined(); console.log(res);});
});