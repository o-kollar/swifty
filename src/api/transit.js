var express = require('express');
var router = express.Router();
const otp = require('../data-providers/routing')

router.post('/', async (request, response) => {
    let otpData = await otp.getOTPdata(request.body);

    response.json(otpData);
});


module.exports = router;
