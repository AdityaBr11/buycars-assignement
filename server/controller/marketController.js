const MarketModel = require("../models/addtomarketplace.model");
const {
  sendResponse,
  sendError,
  sendResponseMsg,
} = require("../utils/responseHandle");
const cloudinary = require("cloudinary");

//get all the market
exports.getMarket = async (req, res) => {
  const { q, mileage, price } = req.query;
  try {
    if (q) {
      const market = await MarketModel.find({
        Model: { $regex: q, $options: "i" },
      });
      sendResponse(res, 201, market);
    } else if (price) {
      if (price == "asc") {
        const market = await MarketModel.find().sort({
          Price: 1,
        });
        sendResponse(res, 201, market);
      } else if (price == "desc") {
        const market = await MarketModel.find().sort({
          Price: -1,
        });
        sendResponse(res, 201, market);
      }
    } else if (mileage) {
      if (mileage == "asc") {
        const market = await MarketModel.find().sort({
          Mileage: 1,
        });
        sendResponse(res, 201, market);
      } else if (mileage == "desc") {
        const market = await MarketModel.find().sort({
          Mileage: -1,
        });
        sendResponse(res, 201, market);
      }
    } else {
      const market = await MarketModel.find();
      sendResponse(res, 201, market);
    }
  } catch (err) {
    sendError(res, 500, err);
  }
};
//post the market
exports.postMarket = async (req, res) => {
  try {
    const file = req.files.Img; // Access the file from the request
    if (!file) {
      sendError(res, 400, "No file provided");
      return;
    }
    if (req.body.Img !== "") {
      const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "car",
        width: 300,
        crop: "scale",
      });

      const {
        Model,
        Year,
        Price,
        Color,
        Mileage,
        Power,
        MaxSpeed,
        Title,
        des1,
        des2,
        des3,
        des4,
        des5,
        Odometer,
        MajorScratches,
        OriginalPaint,
        NumberOfAccidents,
        RegistrationPlace,
        Previousbuyers,
      } = req.body;

      const market = await MarketModel.create({
        Model,
        Year,
        Price,
        Color,
        Mileage,
        Power,
        MaxSpeed,
        Img: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        Title,
        des1,
        des2,
        des3,
        des4,
        des5,
        Odometer,
        MajorScratches,
        OriginalPaint,
        NumberOfAccidents,
        RegistrationPlace,
        Previousbuyers,
        user: req.user._id,
      });

      sendResponse(res, 201, market);
    }
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
    let v = req.params.id;
    let market = await MarketModel.findById(v);

    if (!market) {
      sendError(res, 404, "Market not found");
      return;
    }
    market = await MarketModel.findByIdAndUpdate(v, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    sendResponseMsg(res, 201, "Updated Successfully");
  } catch (err) {
    sendError(res, 500, err);
  }
};

//delete the market
exports.deleteMarket = async (req, res) => {
  try {
    let v = req.params.id;
    let market = await MarketModel.findById(v);

    if (!market) {
      sendError(res, 404, "Market not found");
      return;
    }
    await MarketModel.findByIdAndDelete(req.params.id);
    return sendResponseMsg(res, 201, "Deleted Successfully");
  } catch (err) {
    sendError(res, 500, err);
  }
};
