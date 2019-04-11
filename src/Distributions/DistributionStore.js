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

    getNames(){
        return Object.keys(this.distributions);
    }
}

module.exports = DistributionStore;