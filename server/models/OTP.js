const mongoose = require('mongoose');
const mailSender = require('../utils/mailsender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate')

const OTPSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            trim : true,
            requierd : true
        },
        otp : {
            type : Number,
            trim : true,
            requierd : true
        },
        createdAt : {
            type : Date,
            default : Date.now(),
            expireAt : 5*60,
            requierd : true
        },
    }
)

async function sendVerificationMail(email, otp){
    try{
        const mailresponse = await mailSender(email, "Verification Email from studyNotion",otpTemplate(otp));
    }catch(error){
        console.log("error occured while sending mail");
        console.error(error.message);
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationMail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);