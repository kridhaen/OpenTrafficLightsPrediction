const fs = require('fs');

class HistoricFileSystemReader{
    constructor(folderpath,onFile){
        this.readAndParseSync = this.readAndParseSync.bind(this);
        this.onFile = onFile;
        this.folderpath = folderpath;
    }

    readAndParseSync(){
        return new Promise((resolve) => {
            let temp = this;
            console.log("\x1b[31m","reading","\x1b[0m");
            this.files = undefined;
            fs.readdir(this.folderpath, async function(err, files){
                if(err){
                    console.log(err);
                }
                console.log("\x1b[31m","read dir","\x1b[0m");
                let i = 0;
                for(let file of files.sort()){  //alle files overlopen, gesorteerd volgens naam, wat overeenkomt met de datum, oudste eerst
                    if(i++%100 === 0) HistoricFileSystemReader.showProgress(i, files.length, "files");
                    let data = fs.readFileSync(temp.folderpath +"/"+file);
                    //console.log("\x1b[31m","read file","\x1b[0m");
                    let fragment = data.toString();

                    await temp.onFile(fragment, file);      //TODO: remove file param -> debugging
                }
                console.log("\x1b[31m","read complete","\x1b[0m");
                // HistoricFileSystemReader.printToFile(frequencyDistribution.createDistributionsCSV(),"./csv_data/csv_data_",".csv");
                // HistoricFileSystemReader.printToFile(timeGroupedFrequencyDistribution.createDistributionsCSV(),"./time_grouped_csv_data/csv_data_",".csv");
                // HistoricFileSystemReader.printToFileSync(timeFrequencyDistribution.createDistributionsCSV(),"./time_csv_data/time_csv_data_",".csv");
                //
                // HistoricFileSystemReader.printToFileSync(JSON.stringify(timeGroupedFrequencyDistribution.getDistributions()), "timeGroupedFrequencyDistribution",".json");
                // HistoricFileSystemReader.printToFileSync(JSON.stringify(timeFrequencyDistribution.getDistributions()), "timeFrequencyDistribution",".json");
                // HistoricFileSystemReader.printToFileSync(JSON.stringify(frequencyDistribution.getDistributions()), "frequencyDistribution",".json");


                resolve();
            });
        });

    }

    static printToFile(data, filename, extension){  //let op concurrent fd open
        if(Array.isArray(data)){
            let count = 0;
            data.forEach((item) => {
                fs.writeFile(filename + count++ + extension, item,'utf8', (err) => {
                    if(err) throw err;
                    console.log('File saved!');
                });
            });
        }
        else{
            fs.writeFile(filename + extension, data,'utf8', (err) => {
                if(err) throw err;
                console.log('File saved!');
            });
        }
    }

    static printToFileSync(data, filename, extension){
        if(Array.isArray(data)){
            let count = 0;
            data.forEach((item) => {
                fs.writeFileSync(filename + count++ + extension, item,'utf8');
            });
        }
        else{
            fs.writeFile(filename + extension, data,'utf8');
        }
    }

    static showProgress(current,maximum,description){
        console.log("Running: "+" "+description+": "+current+"/"+maximum);
    }
}

module.exports = HistoricFileSystemReader;
