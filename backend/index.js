const express = require ("express");
const cors = require ("cors")
const mongoose = require("mongoose")
const Routes = require('./Routes/Route')
const cookieParser = require("cookie-parser")
const app = express();
require("dotenv").config();



app.listen(4000, () => {
    console.log("server is running on port 4000");
});

mongoose.connect("mongodb://localhost:27017/webapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
}).catch((err) => {
    console.log(err.message,"DB Connection Failed");
}) 

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials : true,
    })
);

app.use((req,res,next)=>{
    res.set('Cache-Control','no-store')
    next()
  })
 
app.use(cookieParser());
app.use(express.json());
app.use("/", Routes)