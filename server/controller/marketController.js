const MarketModel = require("../models/addtomarketplace.model");
const { sendResponse, sendError, sendResponseMsg } = require("../utils/responseHandle");

//get all the market
exports.getMarket = async (req, res) => {
  try {
    const market = await MarketModel.find();
    sendResponse(res, 201, market);
  } catch (err) {
    sendError(res, 500, err);
  }
};
//post the market
exports.postMarket = async (req, res) => {
  const {
    Model,
    Year,
    Price,
    Color,
    Mileage,
    Power,
    MaxSpeed,
    Odometer,
    MajorScratches,
    OriginalPaint,
    NumberOfAccidents,
    RegistrationPlace,
    Previousbuyers,
  } = req.body;
  try {
    const market = await MarketModel.create({
        Model,
        Year,
        Price,
        Color,
        Mileage,
        Power,
        MaxSpeed,
        Odometer,
        MajorScratches,
        OriginalPaint,
        NumberOfAccidents,
        RegistrationPlace,
        Previousbuyers,
        user: req.user._id
    });
    sendResponse(res, 201, market);
  } catch (err) {
    sendError(res, 500, err);
  }
};

//get the market related to user
exports.getMyMarket = async (req, res) => {
  try {
    const market = await MarketModel.find({ user: req.user._id });
    sendResponse(res, 201, market);
  } catch (err) {
    sendError(res, 500, err);
  }
};

//update the market
exports.updateMarket = async (req, res) => {
    
    try {
        let v = req.params.id
        let market=await MarketModel.findById(v);

        if(!market) {
            sendError(res, 404, "Market not found");
            return;
        }
        market = await MarketModel.findByIdAndUpdate(v,req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
        sendResponseMsg(res, 201, "Updated Successfully");
    } catch (err) {
        sendError(res, 500, err);
    }
}

//delete the market
exports.deleteMarket = async (req,res)=>{
    try {
        let v = req.params.id
        let market=await MarketModel.findById(v);
    
        if(!market) {
            sendError(res, 404, "Market not found");
            return;
        }
        await MarketModel.findByIdAndDelete(req.params.id);
        return sendResponseMsg(res, 201, "Deleted Successfully");
        
    } catch (err) {
        sendError(res, 500, err);
    }
}


