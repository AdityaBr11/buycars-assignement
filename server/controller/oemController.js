const oemsModel = require("../models/oems.model");
const { sendResponse, sendError } = require("../utils/responseHandle");

exports.getOEMS = async (req, res) => {
  const { q, mileage, price } = req.query;
  try {
    if (q) {
      const oems = await oemsModel.find({
        Model: { $regex: q, $options: "i" },
      });
      sendResponse(res, 201, oems);
    } else if (price) {
      if (price == "asc") {
        const oems = await oemsModel.find().sort({
          Price: 1,
        });
        sendResponse(res, 201, oems);
      }else if (price == "desc") {
        const oems = await oemsModel.find().sort({
          Price: -1,
        });
        sendResponse(res, 201, oems);
      }
    }else if (mileage) {
        if (mileage == "asc") {
          const oems = await oemsModel.find().sort({
            Mileage: 1,
          });
          sendResponse(res, 201, oems);
        }else if (mileage == "desc") {
          const oems = await oemsModel.find().sort({
            Mileage: -1,
          });
          sendResponse(res, 201, oems);
        }
    }else{
        const oems = await oemsModel.find();
        sendResponse(res, 201, oems);
    }
  } catch (err) {
    sendError(res, 500, err);
  }
};

exports.postOEMS = async (req, res) => {
  try {
    const oems = await oemsModel.create(req.body);
    sendResponse(res, 201, oems);
  } catch (err) {
    sendError(res, 500, err);
  }
};
