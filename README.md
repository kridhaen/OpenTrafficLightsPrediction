# OpenTrafficLightsPrediction
Add likelyTime prediction to SPaT fragments

Used to test the prediction of phase durations and likelyTime of phase changes for traffic lights by creating frequency distributions

run Express server on port 8080

> npm start


run test

> npm test




This package was used to test the prediction error on a historic dataset, available on https://github.com/kridhaen/OpenTrafficLightsData.
Since the error calculation is made in memory, the larger datasets (5 GB +) will require a lot of memory (16 GB). The implementation of the testing scripts is therefor not made to test these large datasets.
