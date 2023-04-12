const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const querystring = require('querystring');
const getTripDetails = require('./src/api/travel');
const getVehicleDetails = require('./src/api/vehicle-data');
const getConnections = require('./src/api/transit');
const otp = require('./src/controllers/otp');
const bikeSharing = require('./src/api/bike-sharing')

const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, 'config.env');
const envVars = fs.readFileSync(envFile, 'utf-8').split('\n');

envVars.forEach((envVar) => {
    const [name, value] = envVar.split('=');
    if (name && value) {
        process.env[name] = value;
    }
});

const app = express();
const port = process.env.APP_PORT;

const startServer = async () => {
    try {
        await otp.runOTP();
        console.log('OTP started successfully');

        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
        app.use('/api/getTripDetails', getTripDetails);
        app.use('/api/getVehicleDetails', getVehicleDetails);
        app.use('/api/connections', getConnections);
        app.use('/api/bikesharing', bikeSharing);

        app.listen(port, () => {
            console.log(`Server listening on port ${port}!`);
        });
    } catch (error) {
        console.error('OTP failed to start: ', error);
    }
};

startServer();
