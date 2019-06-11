const fs = require('fs');

class HistoricFileSystemReader{
    constructor(folderpath, dataParts, onLearnFile, onTestFile, onBeforeRun, onRunComplete, onAllRunComplete){
        this.readAndParseSync = this.readAndParseSync.bind(this);
        this.onLearnFile = onLearnFile;
        this.onTestFile = onTestFile;
        this.folderpath = folderpath;
        this.dataParts = dataParts;
        this.onRunComplete = onRunComplete;
        this.onAllRunComplete = onAllRunComplete;
        this.onBeforeRun = onBeforeRun;
    }

    readAndParseSync() {
        return new Promise((resolve) => {
            let temp = this;
            console.log("\x1b[31m", "reading", "\x1b[0m");
            this.files = undefined;
            fs.readdir(this.folderpath, async function (err, files) {
                if (err) {
                    console.log(err);
                }
                console.log("\x1b[31m", "read dir", "\x1b[0m");

                let filesPerPart = Math.round(files.length / temp.dataParts);
                let testPartStart = 0;
                let testPartEnd = 0;
                console.log("\x1b[31m", "total files in dir: "+files.length, "\x1b[0m");
                for(let testRun = 0; testRun < temp.dataParts; testRun++){
                    console.log("\x1b[31m", "starting run: " + testRun, "\x1b[0m");
                    await temp.onBeforeRun();
                    testPartStart = testRun * filesPerPart;
                    testPartEnd = testPartStart + filesPerPart;

                    let i = 0;
                    let fileRunner = 0;
                    for (let file of files.sort()) {  //alle files overlopen, gesorteerd volgens naam, wat overeenkomt met de datum, oudste eerst
                        if(fileRunner < testPartStart || fileRunner > testPartEnd){
                            if (i++ % 100 === 0) HistoricFileSystemReader.showProgress(i, files.length-filesPerPart, "files");
                            let data = fs.readFileSync(temp.folderpath + "/" + file);
                            let fragment = data.toString();
                            await temp.onLearnFile(fragment, file);
                        }
                        fileRunner++;
                    }
                    console.log("\x1b[31m", "learning files: "+i, "\x1b[0m");
                    i = 0;
                    for (let fileNr = testPartStart; fileNr <= testPartEnd; fileNr++){
                        if (i++ % 100 === 0) HistoricFileSystemReader.showProgress(i, filesPerPart, "files");
                        let data = fs.readFileSync(temp.folderpath + "/" + files[fileNr]);
                        let fragment = data.toString();
                        await temp.onTestFile(fragment, files[fileNr]);
                    }
                    console.log("\x1b[31m", "testing files: "+i, "\x1b[0m");

                    temp.onRunComplete();
                }

                temp.onAllRunComplete();

                console.log("\x1b[31m", "run complete", "\x1b[0m");


                resolve();
            });
        });

    }

    static showProgress(current,maximum,description){
        console.log("Running: "+" "+description+": "+current+"/"+maximum);
    }
}

module.exports = HistoricFileSystemReader;
