class TimeGroupedFrequencyDistribution {
    constructor(){
        this.frequencyDistribution = {};
    }

    add(signalGroup, signalPhase, isWeekend, hour, duration){
        if(!this.frequencyDistribution[signalGroup]){   //sg bestaat nog niet
            this.frequencyDistribution[signalGroup] = {};
        }
        if(!this.frequencyDistribution[signalGroup][signalPhase]) {
            this.frequencyDistribution[signalGroup][signalPhase] = {};
        }
        if(!this.frequencyDistribution[signalGroup][signalPhase][isWeekend]){
            this.frequencyDistribution[signalGroup][signalPhase][isWeekend] = {};
        }
        if(!this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour]){
            this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour] = {};
        }
        if(!this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour][duration]){
            this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour][duration] = 1;
        }
        else {
            this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour][duration]++;
        }
    }

    getDistributions(){
        return this.frequencyDistribution;
    }

    createDistributionsCSV(){
        let output = [];
        Object.keys(this.frequencyDistribution).forEach((signalGroup) => {
            Object.keys(this.frequencyDistribution[signalGroup]).forEach((signalPhase) => {


                Object.keys(this.frequencyDistribution[signalGroup][signalPhase]).forEach((isWeekend) => {
                    Object.keys(this.frequencyDistribution[signalGroup][signalPhase][isWeekend]).forEach((hour) => {

                        let file = "signalGroup,signalphase,year,month,day,hour,minutes,duration,amount\n";
                        Object.keys(this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour]).forEach((duration) => {
                            file += signalGroup+','+signalPhase+','+isWeekend+','+hour+','+duration+','+this.frequencyDistribution[signalGroup][signalPhase][isWeekend][hour][duration]+'\n';
                        });
                        output.push(file);

                    });
                });


            });
        });
        return output;
    }
}

module.exports = TimeGroupedFrequencyDistribution;