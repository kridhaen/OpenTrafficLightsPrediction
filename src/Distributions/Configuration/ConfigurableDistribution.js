//TODO: configurable distributions / dates / calendar

class ConfigurableDistribution{
    constructor(categoryLength){
        this.frequencyDistribution = {};
        this.categoryLength = categoryLength;
        if(categoryLength === undefined){
            throw "ConfigurableDistribution: categoryLength undefined";
        }
    }


    add(value, categories ){
        if((categories && categories.length < this.categoryLength) || (!categories && this.categoryLength > 0)){
            throw ("ConfigurableDistribution: More categories required, required: " + this.categoryLength + " received: " + categories.length);
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
                throw ("ConfigurableDistribution: Categories should be Array");
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
            throw ("ConfigurableDistribution: More categories required, required: " + this.categoryLength + " received: " + categories.length);
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

    calculateDistributionsMeanOccupancy(){
        let distributions = 0;
        let observations = 0;

        let calculator = (distribution, depth) => {
            if(depth === this.categoryLength){
                Object.keys(distribution).forEach((value) => {
                    let y = distribution;
                    distributions++;
                    observations += distribution[value];
                });
            }
            else{
                let d = depth+1;
                Object.keys(distribution).forEach((item) => {
                    calculator(distribution[item], d);
                })
            }
        };

        calculator(this.frequencyDistribution, 0);
        return observations/distributions;
    }
}

module.exports = ConfigurableDistribution;