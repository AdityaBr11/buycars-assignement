const express = require('express');
const { getMarket, postMarket, getMyMarket, updateMarket, deleteMarket } = require('../controller/marketController');
const fileUpload = require("express-fileupload");

const marketrouter=express.Router();

marketrouter.use(fileUpload());

marketrouter.get('/',getMarket);
marketrouter.get('/my',getMyMarket);
marketrouter.post('/marketpost',postMarket);
marketrouter.put("/update/:id",updateMarket)
marketrouter.delete("/delete/:id",deleteMarket)


module.exports={
    marketrouter
}