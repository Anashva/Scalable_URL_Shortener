const URL=require("../models/Url");
const generateShortCode=require("../utils/generateShortCode");



exports.createShortUrl=async(req,res)=>{
    const {originalUrl}=req.body;
    const shortCode=generateShortCode();
    const newUrl=await URL.create({originalUrl, shortCode});
    res.json({
        shortUrl:`http://localhost:8080/${shortCode}`
    });
};



exports.redirectUrl = async (req, res) => {

    try {

        const url = await URL.findOne({
            shortCode: req.params.shortCode
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        url.clicks++;

        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};




// analytics api

exports.getAnalytics=async (req,res)=>{
    try{
        const url = await URL.findOne({
            shortCode: req.params.shortCode
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        res.json({
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            clicks: url.clicks,
            createdAt: url.createdAt
        });  
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

