//TODO: configurable distributions / dates / calendar

class ConfigurableDistribution{
    constructor(categoryLength){
        this.frequencyDistribution = {};
        this.categoryLength = categoryLength;
    }


    add(value, categories ){
        if((categories && categories.length < this.categoryLength) || (!categories && this.categoryLength > 0)){
            throw ("More categories required, required: " + this.categoryLength + " received: " + categories.length);
        }
        if(categories){
            if(Array.isArray(categories)){
                let distributionRunner = this.frequencyDistribution;
                for(let i = 0; i < categories.length; i++){
                    if(!distributionRunner[categories[i]]){
                        distributionRunner[categories[i]] = {};
                    }
                    distributionRunner = distributionRunner[categories[i]];
                }
                if(!distributionRunner[value]){
                    distributionRunner[value] = 0;
                }
                distributionRunner[value]++;
            }
            else {
                throw ("Categories should be Array");
            }
        }
        else{
            if(!this.frequencyDistribution){
                this.frequencyDistribution = {};
            }
            if(this.frequencyDistribution[value]){
                this.frequencyDistribution[value] = 0;
            }
            this.frequencyDistribution[value]++;
        }
    }

    getDistributions(){
        return this.frequencyDistribution;
    }

    get(categories){
        if((categories && categories.length < this.categoryLength) || (!categories && this.categoryLength > 0)){
            throw ("More categories required, required: " + this.categoryLength + " received: " + categories.length);
        }
        if(categories){
            if(Array.isArray(categories)){
                let distributionRunner = this.frequencyDistribution;
                for(let i = 0; i < categories.length; i++){
                    if(!distributionRunner[categories[i]]){
                        return undefined;
                    }
                    distributionRunner = distributionRunner[categories[i]];
                }
                return distributionRunner;
            }
        }
        else{
            return this.frequencyDistribution;
        }
    }
}

module.exports = ConfigurableDistribution;