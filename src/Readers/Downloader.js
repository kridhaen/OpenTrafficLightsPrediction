// const https = require("https");
//const fetch = require('node-fetch');
const axios = require('axios');

//TODO: delete unused version
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class Downloader{
    // static download(_url){
    //     return new Promise((resolve,reject) => {
    //
    //         https.get(_url, (resp) => {
    //             const { statusCode } = resp;
    //
    //             if(statusCode !== 200){
    //                 reject('Request Failed.\n' +
    //                     `Status Code: ${statusCode}`);
    //             }
    //
    //             let data = '';
    //
    //             // A chunk of data has been recieved.
    //             resp.on('data', (chunk) => {
    //                 data += chunk;
    //             });
    //
    //             // The whole response has been received. Print out the result.
    //             resp.on('end', () => {
    //                 resolve(data);
    //             });
    //         }).on("error", (err) => {
    //             //console.log("\x1b[31m\x1b[47m",err,"\x1b[0m");
    //             reject(err);
    //         });
    //
    //     });
    // }

    // static download(_url){
    //     console.log("\x1b[32m","downloading: "+_url,"\x1b[0m");
    //     //const caAgent = new https.Agent({ca: rootca});
    //     return new Promise((resolve,reject) => {
    //
    //         fetch(_url, { timeout: 2000000 })
    //             .then(function(response) {
    //                 resolve(response.text());
    //             })
    //             .catch(err => {console.log("\x1b[31m\x1b[47m",err,"\x1b[0m"); reject(err)});
    //     });
    // }

    static download(_url){
        console.log("\x1b[32m","downloading: "+_url,"\x1b[0m");
        // const httpAgent = new https.Agent({ rejectUnauthorized: false });
        return new Promise((resolve,reject) => {

            // axios.get(_url, {httpAgent})
            axios.get(_url)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(err => {console.log("\x1b[31m\x1b[47m",err,"\x1b[0m"); reject(err)});
        });
    }
}

module.exports = Downloader;