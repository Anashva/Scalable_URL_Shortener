const express=require('express');
const app=express();
const { redirectUrl } = require("./controllers/urlController");
const limiter = require("./middlewares/rateLimiter");




require("dotenv").config();
const connectDB=require("./config/db");
connectDB();


 

app.use(express.json());

app.get("/" ,(req,res)=>{
    res.send("server running");
});


app.get("/:shortCode", redirectUrl);
app.use("/api/url",require("./routes/urlRoutes"));
app.use(limiter);



app.listen(8080,()=>{
    console.log("server is running on port 8080");
})