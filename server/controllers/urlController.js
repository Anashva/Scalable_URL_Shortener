const URL=require("../models/Url");
const generateShortCode=require("../utils/generateShortCode");



exports.createShortUrl=async(req,res)=>{
    const {originalUrl}=req.body;
    const shortCode=genrateShortCode();
    const newUrl=await URL.create({originalUrl, shortCode});
    res.json({
        shortUrl:`http://localhost:8080/${shortCode}`
    });
};


exports.redirectUrl=async(req,res)=>{
    const url=await URL.findOne({shortCode: req.params.shortCode});

    if(!url){
        return res.status(400).json({message: "URL not found"});
    }
    url.click++;

    await url.save();

    res.redirect(url.originalUrl);
}



