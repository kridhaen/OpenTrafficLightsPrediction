const n3 = require('n3');

class Helper{
    static parseAndStoreQuads(_doc) {
        return new Promise(resolve => {
            const parser = new n3.Parser();
            const store = new n3.Store();
            parser.parse(_doc, (error, quad, prefixes) => {
                if (quad)
                    store.addQuad(quad);
                else
                    return resolve(store);
            });
        })
    }
}

module.exports = Helper;