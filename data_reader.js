const fs = require('fs');
const n3 = require('n3');

const { DataFactory } = n3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;


class FragmentConverter{
    constructor(){
        this.lastPreviousUrl = null;
        this.lastLatest = "0";
        this.readAndParseSync = this.readAndParseSync.bind(this);
        this.parseAndStoreQuads = this.parseAndStoreQuads.bind(this);
    }

    parseAndStoreQuads(_doc) {
        return new Promise(resolve => {
            const parser = new n3.Parser();
            const store = n3.Store();
            parser.parse(_doc, (error, quad, prefixes) => {
                if (quad)
                    store.addQuad(quad);
                else
                    return resolve(store);
            });
        })
    }

    readAndParseSync(){
        //let writeStream = fs.createWriteStream("output.csv");

        let phaseStart = {}; //om de start van een fase te detecteren, voor iedere observatie
        let lastPhase = {}; //om de laatst tegengekomen fase op te slaan, voor iedere observatie
        let frequencyDistribution = {}; //frequentieverdeling voor alle verschillende sighaalgroepen

        let temp = this;
        //console.log("\x1b[31m","reading","\x1b[0m");
        this.files = undefined;
        fs.readdir("./previous", async function(err, files){
            if(err){
                console.log(err);
            }
            //console.log("\x1b[31m","read dir","\x1b[0m");
            let i = 0;
            for(let file of files.sort()){  //alle files overlopen, gesorteerd volgens naam, wat overeenkomt met de datum, oudste eerst
                if(i++%100 === 0) FragmentConverter.showProgress(i, files.length, "files");
                let data = fs.readFileSync("./previous/"+file);
                let store = await temp.parseAndStoreQuads(data.toString());
                //console.log("\x1b[31m","read file","\x1b[0m");

                let signalGroups = [];

                await store.getQuads(null, namedNode('http://www.w3.org/2000/01/rdf-schema#type'), namedNode('https://w3id.org/opentrafficlights#Signalgroup')).forEach(quad => {
                    signalGroups.push(quad.subject.value);
                    if(!phaseStart[quad.subject.value]){
                        phaseStart[quad.subject.value] = -1;
                        lastPhase[quad.subject.value] = -1;
                        frequencyDistribution[quad.subject.value] = {};
                    }
                });

                //console.log(signalGroups);

                //overlopen van alle observaties in een fragment, gesorteerd met oudste eerst
                await store.getQuads(null, namedNode('http://www.w3.org/ns/prov#generatedAtTime'), null).sort(function(a, b) {
                    a = new Date(a.object.value).getTime();
                    b = new Date(b.object.value).getTime();
            
                    return a<b ? -1 : a>b ? 1 : 0;
                }
                ).forEach((observation) => {
                    let generatedAtTime = observation.object.value;
                    //console.log(generatedAtTime);

                    signalGroups.forEach(signalGroup => {
                        let signalState = store.getQuads(namedNode(signalGroup), namedNode('https://w3id.org/opentrafficlights#signalState'), null, observation.subject)[0]; //zit altijd 1 of geen in, als de signalstate is aangepast op generatedAtTime voor de opgegeven signalgroup
                        if(signalState) {
                            let minEndTime = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#minEndTime'), null, observation.subject)[0].object.value;
                            let maxEndTime = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#maxEndTime'), null, observation.subject)[0].object.value;
                            let signalPhase = store.getQuads(signalState.object, namedNode('https://w3id.org/opentrafficlights#signalPhase'), null, observation.subject)[0].object.value;

                            let observationUTC = {};
                            let generatedAtTimeDate = new Date(generatedAtTime);
                            observationUTC["hour"] = generatedAtTimeDate.getUTCHours();
                            observationUTC["month"] = generatedAtTimeDate.getUTCMonth();
                            observationUTC["minute"] = generatedAtTimeDate.getUTCMinutes();
                            observationUTC["day"] = generatedAtTimeDate.getUTCDay();
                            observationUTC["year"] = generatedAtTimeDate.getUTCFullYear();

                            let phaseDuration = -1;
                            if(phaseStart[signalGroup] !== -1 && lastPhase[signalGroup] !== -1){
                                if(lastPhase[signalGroup] !== signalPhase){ //faseovergang
                                    phaseDuration = new Date(generatedAtTime) - new Date(phaseStart[signalGroup]);
                                    //console.log("date: " + generatedAtTimeDate + "   duration: " + phaseDuration+"   phase: "+lastPhase[signalGroup]+" signalGroup: "+signalGroup);


                                    //opslaan in tabel frequentieverdeling
                                    if(!frequencyDistribution[signalGroup][lastPhase[signalGroup]]){
                                        frequencyDistribution[signalGroup][lastPhase[signalGroup]] = {}; //lijst aanmaken voor bijhouden van aantal voorkomen voor iedere faseduur
                                    }
                                    else{
                                        if(frequencyDistribution[signalGroup][lastPhase[signalGroup]][Math.round(phaseDuration/1000)]){ //afgeronde duur op aantal seconden
                                            frequencyDistribution[signalGroup][lastPhase[signalGroup]][Math.round(phaseDuration/1000)]++;   //voorkomen tellen 
                                        }
                                        else{
                                            frequencyDistribution[signalGroup][lastPhase[signalGroup]][Math.round(phaseDuration/1000)] = 1;
                                        }
                                    }
                                    
                                    
                                    //klaarzetten voor volgende fase
                                    lastPhase[signalGroup] = signalPhase;
                                    phaseStart[signalGroup] = generatedAtTime;
                                }
                            }
                            else{
                                if(phaseStart[signalGroup] === -1 && lastPhase[signalGroup] === -1){
                                    lastPhase[signalGroup] = signalPhase;
                                }
                                else if(lastPhase[signalGroup] !== signalPhase){
                                    lastPhase[signalGroup] = signalPhase;
                                    phaseStart[signalGroup] = generatedAtTime;
                                }
                            }

                            //let output = signalGroup+","+generatedAtTime+","+minEndTime+","+maxEndTime+","+signalPhase+","+phaseDuration; //csv output
                            //console.log(output);
                        }
                    });

                });


                
                //FragmentConverter.printDistributions(frequencyDistribution); //voor file
                //console.log(data.toString());
            }
            //console.log("\x1b[31m","read complete","\x1b[0m");
            FragmentConverter.printToFile(FragmentConverter.createDistributionsCSV(frequencyDistribution),'csvdata.csv');
        }); 
    }



    static createDistributionsCSV(distributions){
        let output = [];
        Object.keys(distributions).forEach((signalGroup) => {
            Object.keys(distributions[signalGroup]).forEach((signalPhase) => {
                let file = "signalGroup,signalphase,duration,amount\n";
                Object.keys(distributions[signalGroup][signalPhase]).forEach((duration) => {
                    file += signalGroup+','+signalPhase+','+duration+','+distributions[signalGroup][signalPhase][duration]+'\n';
                });
                output.push(file);
            });
        });
        return output;
    }

    static printToFile(data, filename){
        if(Array.isArray(data)){
            let count = 0;
            data.forEach((item) => {
                fs.writeFile(count++ + filename, item,'utf8', (err) => {
                    if(err) throw err;
                    console.log('File saved!');
                });
            });
        }
        else{
            fs.writeFile(filename, data,'utf8', (err) => {
                if(err) throw err;
                console.log('File saved!');
            });
        }
    }

    static showProgress(current,maximum,description){
        console.log("Running: "+" "+description+": "+current+"/"+maximum);
    }


    start(){
        this.readAndParseSync();
    }

}

let fragmentConverter = new FragmentConverter();
fragmentConverter.start();
