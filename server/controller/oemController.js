const oemsModel = require("../models/oems.model");
const { sendResponse, sendError } = require("../utils/responseHandle");


exports.getOEMS=async (req,res)=>{
    try{
        const oems=await oemsModel.find();
        sendResponse(res,201,oems)
    }catch(err){
        sendError(res,500,err)
    }
}

exports.postOEMS=async (req,res)=>{
    try{
        const oems=await oemsModel.create(req.body);
        sendResponse(res,201,oems)
    }catch(err){
        sendError(res,500,err)
    }
}
