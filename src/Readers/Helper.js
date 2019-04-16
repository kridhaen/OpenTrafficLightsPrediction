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

    static writeN3Store(store){
        return new Promise(async (resolve) => {
            const writer = new n3.Writer(store);
            for(let quad of store.getQuads()){
                writer.addQuad(quad);
            }

            await writer.end((error, result) => {resolve(result)});
        });
    }
}

module.exports = Helper;