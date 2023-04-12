const bodyParser = require('body-parser');
const http = require('http');
const fetch = require('node-fetch');
const querystring = require('querystring');
const dateTime = require('../utils/date-time')
const itineraries = require('../controllers/itineraries')

async function getOTPdata(query) {

    return new Promise((resolve, reject) => {
        const { time, date } = dateTime.getCurrentOTPdateTimeFormat();
        const options = {
            host: 'localhost',
            port: process.env.OTP_PORT,
            path: `/otp/routers/default/plan?${querystring.stringify({
                fromPlace: `${query.origin[1]},${query.origin[0]}`,
                toPlace: `${query.destination[1]},${query.destination[0]}`,
                time: time,
                date: date,
                mode: 'TRANSIT',
                arriveBy: 'false',
                wheelchair: 'false',
                showIntermediateStops: 'true',
                debugItineraryFilter: 'false',
                locale: 'en',
                pageCursor:query.pageCursor,
                walkReluctance:10,
                numItineraries:4,
               
            })}`,
        };

        http.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                OTPdata =  itineraries.format(JSON.parse(data))
                resolve(OTPdata);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = { getOTPdata }