const express = require('express');
const { getOEMS, postOEMS } = require('../controller/oemController');

const oemrouter=express.Router();

oemrouter.get('/',getOEMS);
oemrouter.post('/oemspost',postOEMS);

module.exports={
    oemrouter
}