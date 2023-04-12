var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const fetch = require('node-fetch');
const querystring = require('querystring');

router.post('/', async (request, response) => {

    let tripData = await tripDetails(request.body);


    response.json(tripData);

});

async function tripDetails(query) {
    const formData = {
        tripID: query.tripID
    };
  
    const postData = querystring.stringify(formData);
  
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'clientapi.dopravnakarta.sk',
        path: '/api/v2/GetTripStops',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'X-API-Key': '00112233445566778899',
          'X-App-Version': '1',
          'Content-Length': postData.length,
        },
      };
  
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          const response = JSON.parse(data);

          if (Array.isArray(response.TripStops)) {
            const filtered = getStopsBetween(query.originCoords,query.destinationCoords,response.TripStops);

            resolve(filtered);
          } else {
            reject(new Error('Response is not an array.'));
          }
          });
      });
  
      req.on('error', (error) => {
        reject(error);
      });
  
      req.write(postData);
      req.end();
    });
  }


  function getStopsBetween(fromStop, toStop, tripStops) {
    let fromIndex = -1;
    let toIndex = -1;
    
    // Find the indexes of fromStop and toStop
    for (let i = 0; i < tripStops.length; i++) {
      if (tripStops[i].StopName === fromStop) {
        fromIndex = i;
      }
      if (tripStops[i].StopName === toStop) {
        toIndex = i;
        break;
      }
    }
    
    // Check if fromStop and toStop exist in the tripStops array
    if (fromIndex === -1 || toIndex === -1) {
      return [];
    }
    
    // Create a new array with stops between fromStop and toStop, excluding fromStop and toStop
    const stopsBetween = tripStops.slice(fromIndex + 1, toIndex);
    
    return stopsBetween;
  }
  


module.exports = router