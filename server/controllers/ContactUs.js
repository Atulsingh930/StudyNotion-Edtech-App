const ContactUs = require('../models/ContactUs');
const mailSender = require('../utils/mailsender');
const {ContactUsrepliMail} = require('../mail/templates/ContactUsrepliMail');

exports.contactUs = async (req, res)=>{
    try{
        // fetch user data from form
        const{firstName, lastName, email, phoneNo, countryCode, message} = req.body;
        // validate if user has filled or the details or not
        if(!firstName || !lastName || !email || !phoneNo || !countryCode || !message){
            return res.status(403).json(
                {
                    success : true,
                    messgae : "All feilds are requiered"
                }
            )
        }

        const response = await ContactUs.create(
            {
                firstName,
                lastName,
                email,
                phoneNo,
                message,
                countryCode
            }
        )
        // sendmail from user to using has email id
        const mailResponse = await mailSender(email, 'Verification Email from studyNotion', ContactUsrepliMail(firstName+" "+lastName, email, Number(phoneNo), message))
        // send user a conformation mail from us that we recevie the mail
        return res.status(200).json(
            {
                success : true,
                message : 'Feedback receive successfully',
                data : {
                    response,
                    mailResponse
                }
            }
        )
        // return res 
    }catch(error){
        return res.status(404).json(
            {
                success : false,
                message : "Error received while givibg feedback",
                error : error.message

            }
        )
    }
}