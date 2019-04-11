const Downloader = require('../Downloader.js');

it('download',() => {
    let url = "https://lodi.ilabt.imec.be/observer/rawdata/latest";
    expect.assertions(1);
    return Downloader.download(url).then((res) => expect(res).toBeDefined());
});