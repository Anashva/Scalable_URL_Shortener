const express=require("express");
const router=express.Router();
const urlController=require("../controllers/urlController");
const  validateUrl=require("../middlewares/validateUrl");



router.post("/shorten",validateUrl,urlController.createShortUrl);
router.get("/analytics/:shortCode",urlController.getAnalytics);
router.get("/:shortCode",urlController.redirectUrl);




module.exports=router;