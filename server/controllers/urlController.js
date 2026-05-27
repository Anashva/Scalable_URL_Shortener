const URL=require("../models/Url");
const generateShortCode=require("../utils/generateShortCode");
const {client}=require("../config/redis");


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

        const { shortCode } = req.params;

        console.log("ShortCode:", shortCode);

        // CHECK CACHE

        const cachedUrl = await client.get(shortCode);

        console.log("Cached URL:", cachedUrl);

        // CACHE HIT

        if (cachedUrl !== null) {

            console.log("Redis Cache HIT");

            return res.redirect(cachedUrl);
        }

        console.log("Redis Cache MISS");

        // FIND FROM DB

        const url = await URL.findOne({ shortCode });

        console.log("MongoDB URL:", url);

        if (!url) {

            return res.status(404).json({
                message: "URL not found"
            });
        }

        // STORE IN REDIS

        const response = await client.set(
            shortCode,
            url.originalUrl,
            {
                EX: 3600
            }
        );

        console.log("Redis SET Response:", response);

        // VERIFY SAVED

        const verify = await client.get(shortCode);

        console.log("Redis Verify:", verify);

        // UPDATE CLICKS

        url.clicks++;

        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {

        console.log(error);

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

        res.status(200).json({
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            clicks: url.clicks,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
            expiresAt: url.expiresAt
        });  
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

