const express=require("express");
const router=express.Router();
const urlController=require("../controllers/urlController");
const  validateUrl=require("../middlewares/validateUrl");



router.post("/shorten",validateUrl,urlController.createShortUrl);

router.get("/:shortCode",urlController.redirectUrl);

router.get("/analytics/:shortCode",urlController.getAnalytics);



module.exports=router;