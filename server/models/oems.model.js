const { default: mongoose } = require("mongoose");

const omersSchema=new mongoose.Schema({
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
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Omers",omersSchema);

