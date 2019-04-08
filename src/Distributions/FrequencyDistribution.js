class FrequencyDistribution{
    constructor(){
        this.frequencyDistribution = {};
    }

    add(signalGroup, signalPhase, duration){
        if(!this.frequencyDistribution[signalGroup]){   //sg bestaat nog niet
            this.frequencyDistribution[signalGroup] = {};
        }
        if(!this.frequencyDistribution[signalGroup][signalPhase]) {
            this.frequencyDistribution[signalGroup][signalPhase] = {}; //lijst aanmaken voor bijhouden van aantal voorkomen voor iedere faseduur
        }
        if(!this.frequencyDistribution[signalGroup][signalPhase][duration]){ //afgeronde duur op aantal seconden
            this.frequencyDistribution[signalGroup][signalPhase][duration] = 1;   //voorkomen tellen
        }
        else{
            this.frequencyDistribution[signalGroup][signalPhase][duration]++;
        }
    }

    getDistributions(){
        return this.frequencyDistribution;
    }

    createDistributionsCSV(){
        let output = [];
        Object.keys(this.frequencyDistribution).forEach((signalGroup) => {
            Object.keys(this.frequencyDistribution[signalGroup]).forEach((signalPhase) => {
                let file = "signalGroup,signalphase,duration,amount\n";
                Object.keys(this.frequencyDistribution[signalGroup][signalPhase]).forEach((duration) => {
                    file += signalGroup+','+signalPhase+','+duration+','+this.frequencyDistribution[signalGroup][signalPhase][duration]+'\n';
                });
                output.push(file);
            });
        });
        return output;
    }
}

module.exports = FrequencyDistribution;