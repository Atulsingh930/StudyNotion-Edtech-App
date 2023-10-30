const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
    ).then(()=>{console.log("Database is connected")})
    .catch((error)=>{
        console.log("error while connecting to database");
        console.error(error);
        process.exit(1);
    })
}

module.exports = {dbConnect};