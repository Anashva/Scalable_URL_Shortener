const express=require('express');
const app=express();
require("dotenv").config();
const { redirectUrl } = require("./controllers/urlController");
const limiter = require("./middlewares/rateLimiter");
const {connectRedis}=require("./config/redis");




const connectDB=require("./config/db");
connectDB();
connectRedis();


 

app.use(express.json());
app.use(limiter);


app.get("/" ,(req,res)=>{
    res.send("server running");
});


app.use("/api/url",require("./routes/urlRoutes"));
app.get("/:shortCode", redirectUrl);




app.listen(8080,()=>{
    console.log("server is running on port 8080");
})