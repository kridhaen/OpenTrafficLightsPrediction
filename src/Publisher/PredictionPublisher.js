const express = require('express');
const cors = require('cors');

class PredictionPublisher{
    constructor(port){
        this.port = port ? port : 8080;
        this.app = express();
        this.app.use(cors());
        this.app.get('/', (req, res) => res.send("OpenTrafficLightsPrediction server running!"));
        this.server = undefined;
    }

    setLatestEndpoint(data){
        this.app.get('/latest', (req, res) => {
            res.set('Content-Type','application/trig');
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send();
            }
        });
    }

    setJSONDistributionEndpoint(routeName, data){
        this.app.get('/'+routeName, (req, res) => {
            res.set('Content-Type','application/json');
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({'error':404});
            }
        });
    }

    _getExpressAppForUsageInTests(){
        return this.app;
    }

    start(){
        return new Promise((resolve) => {
            if(this.server){
                this.stop().then(() => {this.start().then(() => resolve())});
            }
            else{
                this.server = this.app.listen(this.port, () => {
                    console.log(`Publisher started listening on port ${this.port}`);
                    resolve();
                });
            }
        });
    }

    stop(){
        return new Promise((resolve, reject) => {
            if(this.server){
                this.server.close(() => {
                    this.server = undefined;
                    console.log(`Publisher stopped listening on port ${this.port}`);
                    resolve()
                });
            }
            else{
                reject("No server listening");
            }
        });
    }
}

module.exports = PredictionPublisher;