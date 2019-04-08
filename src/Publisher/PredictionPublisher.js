const express = require('express');

class PredictionPublisher{
    constructor(port){
        this.port = port ? port : 8080;
        this.app = express();
        this.app.get('/', (req, res) => res.send("OpenTrafficLightsPredicion server running!"));
    }

    setLatestEndpoint(callback){
        this.app.get('/latest', (req, res) => res.send(callback));
    }

    start(){
        this.app.listen(this.port, () => console.log(`Publisher listening on port ${port}`));
    }
}

module.exports = PredictionPublisher;