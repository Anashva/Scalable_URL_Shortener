const URL=require("../models/Url");
const {client}=require("../config/redis");
const {nanoid}=require("nanoid");

exports.createShortUrl = async (req, res) => {

    try {

        const {

            originalUrl,

            customAlias,

            expiresInHours

        } = req.body;

        // CUSTOM ALIAS OR RANDOM CODE

        const shortCode =
            customAlias || nanoid(6);

        // CHECK DUPLICATE

        const existing =
            await URL.findOne({ shortCode });

        if (existing) {

            return res.status(400).json({
                message: "Alias already exists"
            });
        }

        // EXPIRATION

        let expiresAt = null;

        if (expiresInHours) {

            expiresAt = new Date(

                Date.now() +

                expiresInHours *
                60 *
                60 *
                1000
            );
        }

        // SAVE TO DB

        const newUrl = await URL.create({

            originalUrl,

            shortCode,

            expiresAt
        });

        res.status(201).json({

            shortUrl:
                `${process.env.BASE_URL}/${shortCode}`,

            data: newUrl
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


exports.redirectUrl = async (req, res) => {

    try {

        const { shortCode } = req.params;

        // CHECK DATABASE FIRST

        const url = await URL.findOne({ shortCode });

        if (!url) {

            return res.status(404).json({
                message: "URL not found"
            });
        }

        // CHECK EXPIRATION

        if (
            url.expiresAt &&
            url.expiresAt < new Date()
        ) {

            return res.status(410).json({
                message: "Link expired"
            });
        }

        // CHECK REDIS CACHE

        const cachedUrl =
            await client.get(shortCode);

        // CACHE HIT

        if (cachedUrl !== null) {

            console.log("Redis Cache HIT");

            url.clicks++;

            await url.save();

            return res.redirect(cachedUrl);
        }

        console.log("Redis Cache MISS");

        // STORE IN REDIS

        await client.set(
            shortCode,
            url.originalUrl,
            {
                EX: 3600
            }
        );

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

