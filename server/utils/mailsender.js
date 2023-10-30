const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body)=>{
    try{
        const transpoter = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASS,
                },
            }
        );

        const info = transpoter.sendMail(
            {
                from: `"Study Notion" <${process.env.MAIL_USER}>`,
                to: `${email}`,
                subject: `${title}`,
                html : `${body}`
            }
        )
    }catch(error){
        console.log("Error while Sending mail");
        console.error(error);
    }
}

module.exports = mailSender;