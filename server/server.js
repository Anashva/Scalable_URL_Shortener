const express=require('express');
const app=express();

require("dotenv").config();
const connectDB=require("./config/db");
connectDB();




app.use(express.json());

app.get("/" ,(req,res)=>{
    res.send("server running");
});


app.use("/api/url",require("./routes/urlRoutes"));



app.listen(8080,()=>{
    console.log("server is running on port 8080");
})