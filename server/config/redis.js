const redis=require("redis");

const client=redis.createClient({
    url: "redis://127.0.0.1:6379"
});


// console.log(client.options);

client.on("error",(err)=>{
    console.log("redis error",err);
});

const connectRedis=async()=>{
    await client.connect();

    console.log("redis connected");

};

module.exports={client,connectRedis};