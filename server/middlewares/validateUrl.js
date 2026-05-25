const validator=require("validator");



const validateUrl=(req,res,next)=>{
    const {originalUrl}=req.body;

    if(!validator.isURL(originalUrl)){
        return res.status(400).json({
            message: "Invalid URL"
        });
    }
    next();
}

module.exports=validateUrl;