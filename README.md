# OpenTrafficLightsPrediction
Add likelyTime prediction to SPaT fragments

Used to test the prediction of phase durations and likelyTime of phase changes for traffic lights by creating frequency distributions

run Express server on port 8080

> npm start


run test

> npm test

To visualize the predictions generated by the server, the package https://github.com/kridhaen/OpenTrafficLightsPredictionVisualizer can be modified.


This package was used to test the prediction error on a historic dataset, available on https://github.com/kridhaen/OpenTrafficLightsData.
Since the error calculation is made in memory, the larger datasets (5 GB +) will require a lot of memory (16 GB). The implementation of the testing scripts is therefor not made to test these large datasets.
To test a dataset, copy 'previous' files to folder '/previous' and run following scripts:

* Full prediction error testsuite:
>npm inMemoryErrorCalculation

Creates testserver that publishes results on port 8080/analytics
A csv file with the most important results will be created in the main folder: per_phase.txt
This file can be imported in Excel as csv (, seperated)
* View phase durations over time:
>npm showPhaseDurationsOverTime

Creates server on port 8081/durations
Publishes for each signalgroup and signalphase arrays with the phase duration and phase start.
* Show prediction error for given interval:
>npm intervalPredictionAccuracyCalculation

Starts server on port 8080,
Logs the errors % of the median duration that can be predited with a given chance
Publishes the distributions on /distribution/fd , /distribution/tfd , /distribution/tgfd

The results of the error calculations can be visualized by https://github.com/kridhaen/OpenTrafficLightsDistributionsVisualizer
