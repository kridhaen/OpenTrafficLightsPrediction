const Downloader = require('./Downloader.js');

class RealTimeReader{
    constructor(datasetUrl, onLatest){
        this.lastLatest = undefined;
        this.DATASET_URL = datasetUrl;
        this.onLatest = onLatest;
    }

    async handleLatest(latest){
        console.log("comparing");
        //console.log(latest); //TODO: parse only changed fragments
        if(this.lastLatest){
            // if(latest.length != this.lastLatest.length){    //different latest
                this.lastLatest = latest;
                console.log("\x1b[36m","different latest","\x1b[0m");
                await this.onLatest(latest);
                console.log("\x1b[36m","latest handling complete","\x1b[0m");
        //     }
        //     else{
        //         console.log("\x1b[36m","no changes latest","\x1b[0m");
        //     }
        }
        else {
            this.lastLatest = latest;
            console.log("\x1b[36m","first latest","\x1b[0m");
            await this.onLatest(latest);
            console.log("\x1b[36m","first latest handling complete","\x1b[0m")
        }
    }

    getLatestCyclic(cycleTime){
        console.log("running");
        let timer = cycleTime;
        let decrease = cycleTime > 100000 ? 10000 : 1000;
        setInterval(() => {
            console.log("...............running:"+Date.now()+"...............getting next fragment in: "+timer/1000+" s");
            timer -= decrease;
            if(timer <= 0){
                timer = cycleTime;
                Downloader.download(this.DATASET_URL)
                    .then((res) => { console.log("\x1b[35m","downloaded latest fragment","\x1b[0m"); return res})
                    .then((res) => this.handleLatest(res))
                    .catch(e => console.log(e));
                console.log("\x1b[35m","ready for next latest","\x1b[0m");
            }
        }, decrease);
    }

}

module.exports = RealTimeReader;