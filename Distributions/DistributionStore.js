class DistributionStore{
    constructor(){
        this.distributions = {};
    }

    add(distribution, name){
        this.distributions[name] = distribution;
    }

    get(name){
        return this.distributions[name];
    }
}

module.exports = DistributionStore;