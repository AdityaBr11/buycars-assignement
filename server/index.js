const express=require("express");
const env=require("dotenv");
const cors=require("cors")
const { connection } = require("./config/db");
const { router } = require("./routes/user.route");
const { oemrouter } = require("./routes/oem.route");
const { marketrouter } = require("./routes/market.route");
const { isAuthenticated } = require("./middleware/auth");


env.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/reg',router);
app.use('/rootoem',oemrouter),
app.use('/markets',isAuthenticated,marketrouter)


app.listen(process.env.port||4500,async ()=>{
    try {
        await connection;
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at port ${process.env.port}`)
})