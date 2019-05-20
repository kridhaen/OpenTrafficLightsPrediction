//store the duration of phases
class DurationsManager {
    constructor(historySize){
        this.durations = {};
        this.historySize = historySize; //configure the amount of durations needs to be stored for each signalGroup and signalPhase
    }

    add(signalGroup, signalPhase, duration){
        if(!this.durations[signalGroup]){
            this.durations[signalGroup] = {};
        }
        if(!this.durations[signalGroup][signalPhase]) {
            this.durations[signalGroup][signalPhase] = [];
        }
        this.durations[signalGroup][signalPhase].push(duration);
        if(this.durations[signalGroup][signalPhase].length > this.historySize){
            this.durations[signalGroup][signalPhase].shift();
        }
    }

    getLastHistory(signalGroup, signalPhase){
        if(this.durations[signalGroup]
            && this.durations[signalGroup][signalPhase]
        ){
            return this.durations[signalGroup][signalPhase].length >= this.historySize ? this.returnLastX(70, this.durations[signalGroup][signalPhase]) : undefined;
        }
    }

    returnLastX(x, array){
        let result = [];
        for(let i = array.length-x; i < array.length; i++){
            result.push(array[i]);
        }
        return result;
    }

    getLastDuration(signalGroup, signalPhase){
        if(this.durations[signalGroup]
            && this.durations[signalGroup][signalPhase]
        ){
            if(this.durations[signalGroup][signalPhase].length > 0){
                return this.durations[signalGroup][signalPhase][this.durations[signalGroup][signalPhase].length - 1];
            }
        }
        else{
            return undefined;
        }
    }
}

module.exports = DurationsManager;