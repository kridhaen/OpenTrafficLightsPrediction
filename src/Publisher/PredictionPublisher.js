const express = require('express');
const cors = require('cors');

class PredictionPublisher{
    constructor(port){
        this.port = port ? port : 8080;
        this.app = express();
        this.app.use(cors());
        this.app.get('/', (req, res) => res.send("OpenTrafficLightsPredicion server running!"));
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
        this.app.listen(this.port, () => console.log(`Publisher listening on port ${this.port}`));
    }
}

module.exports = PredictionPublisher;