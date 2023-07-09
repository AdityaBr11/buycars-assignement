const express = require('express');
const { getOEMS, postOEMS, getSingleOEMS } = require('../controller/oemController');

const oemrouter=express.Router();

oemrouter.get('/',getOEMS);
oemrouter.post('/oemspost',postOEMS);
oemrouter.get('/:id',getSingleOEMS)

module.exports={
    oemrouter
}