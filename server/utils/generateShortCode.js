const {nanoid}=require("nanoid");
const generateShortCode=()=>{
    return nanoid(6);
    // internally it uses cryptographically secure random generators 
}

module.exports=generateShortCode