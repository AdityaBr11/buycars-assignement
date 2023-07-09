const { default: mongoose } = require("mongoose");

const marketSchema=new mongoose.Schema({
    Model:{
        type:String,
        required:true
    },
    Year:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Color:{
        type:[String],
        required:true,
    },
    Mileage:{
        type:Number,
        required:true
    },
    Power:{
        type:Number,
        required:true
    },
    MaxSpeed:{
        type:Number,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Img:{
        public_id: {
            type: String,
            require: true,
          },
          url: {
            type: String,
            require: true,
          },
    },
    des1:{
        type:String,
        required:true
    },
    des2:{
        type:String,
        required:true
    },
    des3:{
        type:String,
        required:true
    },
    des4:{
        type:String,
        required:true
    },
    des5:{
        type:String,
        required:true
    },
    Odometer:{
        type:Number,
        required:true
    },
    MajorScratches:{
        type:Boolean,
        required:true
    },
    OriginalPaint:{
        type:Boolean,
        required:true
    },
    NumberOfAccidents:{
        type:Number,
        required:true
    },
    RegistrationPlace:{
        type:String,
        required:true
    },
    Previousbuyers:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Marketplace",marketSchema);


