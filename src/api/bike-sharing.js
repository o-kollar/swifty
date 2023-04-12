var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const querystring = require('querystring');
const bikeSharing = require('../data-providers/whitebikes')

router.post('/', async (request, response) => {
    let bikeSharingResult;
    const query = request.body;
        bikeSharingResult = await bikeSharing.bikeSharing(query);


    response.json({ bikeSharingResult });
});


module.exports = router;
