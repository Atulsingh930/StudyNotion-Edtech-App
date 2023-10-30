const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
        },
        email : {
            type : String,
            required : true
        },
        phoneNo : {
            type : Number,
            required : true
        },
        message : {
            type : String,
            required : true
        },
        countryCode : {
            type : String,
            required : true
        },
        createdAt : {
            type : Date,
            default : Date.now(),
            expires : 24*60*60,
            requierd : true
        },

    }
)

module.exports = mongoose.model('ContactUs', contactUsSchema);

async function sendMailToUser(email){

}