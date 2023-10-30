const cloudinary = require('cloudinary').v2
require('dotenv').config();

const cloudConnect = ()=>{
    try{
        cloudinary.config(
            {
                cloud_name : process.env.CLOUD_NAME,
                api_key : process.env.API_KEY,
                api_secret : process.env.API_SECRET
            }
        )
    }catch(error){
        console.log("Error while connecting to cloudinary");
        console.error(error);
    }
}

module.exports = {cloudConnect};