const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
const mailSender = require('../utils/mailsender')
require('dotenv').config();

// Check if email is in correct form or not
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

exports.sendOtp = async (req, res)=>{
    try{
        // taking information form body
        const{email} = req.body;
        // validating if requiered field is filled or not

        const checkUsePresent = await User.findOne({email:email});
        if(checkUsePresent){
            return res.status(401).json(
                {
                    success : false,
                    message : "Existing user in database"
                }
            )
        }
        // generating otp using otp-generator
        const otp = otpGenerator.generate(6,
            {
                upperCaseAlphabets: false, 
                lowerCaseAlphabets : false,
                specialChars: false 
            }
        )
        // creating payload and uploading it into database using OTP model
        const otpPayload = {email, otp};
        const response = await OTP.create(otpPayload);
        // passing response and status
        return res.status(200).json(
            {
                success : true,
                message : "OTP generated and saved to Database",
                data : response
            }
        )

    }catch(error){
        console.log("Error while creating otp or send otp")
        return res.status(400).json(
            {
                success : false,
                message : "Existing user in database",
                error : error.message
            }
        )
    }
}
// controller responsible for signUp and creating new entry in database using User model
exports.signUp = async (req, res)=>{
    try{
        const { email, firstName, lastName, password, confirmPassword, contactNumber, accountType, otp } = req.body;
        if (!email || !firstName || !lastName || !password || !confirmPassword || !otp) {
          return res.status(403).json({
            success: false,
            message: "All fields are required in signUp",
          });
        }
        // performing validation on email address
        if(!isValidEmail(email)){
            return res.status(422).json(
                {
                    success : false,
                    message : "invalid email"
                }
            )
        }
        // checking if email exists or not in database
        const checkUsePresent = await User.findOne({email:email});
        if(checkUsePresent){
            return res.status(401).json(
                {
                    success : false,
                    message : "Existing user in database"
                }
            )
        }
        // checking is confirm and creted passwords are same or not
        if(password!==confirmPassword){
            return res.status(400).json(
                {
                    success: false,
                    message: "created and confirm passwords are not same"
                }
            )
        }
        // fetching newest otp form database and validating it exist or not
        const userOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        if(userOtp.length==0){
            return res.status(400).json(
                {
                    success : false,
                    message : "OTP is not fount",
                    otp, userOtp
                }
            )
        }
        // validating input and db otp
        if(otp!==userOtp[0].otp){
            return res.status(403).json(
                {
                    success : false,
                    message : "Ivalid OTP",
                    otp, 
                    userOtp : userOtp[0].otp
                }
            )
        }
        // converting password into encrypted form
        const hashPassword = await bcrypt.hash(password, 10);
        // creating profile entry in database
        const profileDetail = await Profile.create(
            {
                gender : null,
                dateOfBirth : null,
                about : null,
                contactNumber : contactNumber?contactNumber : null
            }
        )
        // creating User entry in database
        const dbResponse = await User.create(
            {
                email, 
                firstName, 
                lastName, 
                password : hashPassword, 
                accountType,
                additionalDetails : profileDetail._id,
                userImage : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            }
        )
        return res.status(200).json(
            {
                success : true,
                message : "User created successfull",
                data : dbResponse
            }
        )

    }catch(error){
        console.log("Error while signUp")
        return res.status(400).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}
exports.login = async (req, res)=>{
    try{
        // taking information form body and validaing if all field are filled or not
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(422).json(
                {
                    success : false,
                    message : "All feild are requiered"
                }
            )
        }
        // checking if email exists or not in database
        let user = await User.findOne({email:email}).populate('additionalDetails').populate('courses').exec();
        if(!user){
            return res.status(401).json(
                {
                    success : false,
                    message : "user not found"
                }
            )
        }
        // comparing password using compare function of bcrypt

        if(await bcrypt.compare(password, user.password)){
            // creating payload for token creation
            const payLoad = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            // creating token using jwt
            const token = await jwt.sign(payLoad, process.env.JWT_SECRET
                // ,{
                    // expiresIn : "2h"
                // }
            )
            // user = user.toObject();
            user.token = token;
            user.password = undefined
            // creating option for cookie
            const options = {
                expire : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            }
            // creating cookie
            res.cookie("token", token, options).status(200).json(
                {
                    success : true,
                    message : "Logged in successfully",
                    token,
                    user
                }
            )
        }else{
                return res.status(400).json(
                    {
                        success : false,
                        message : "Password is incorrect",
                    }
                )
            }
        
        }catch(error){
            console.log("Error while login")
            return res.status(500).json(
                {
                    success : false,
                    message : "login fail",
                    error : error.message,
                }
            )
        }
}
// creating controller for change password
exports.changePassword = async (req, res)=>{
    try{
        // taking information form body and validaing if all field are filled or not
        const{oldPassword, newPassword} = req.body;
        const userData = await User.findById(req.user.id)
        if(!oldPassword || !newPassword){
            return res.status(422).json(
                {
                    success : false,
                    message : "All fields are requiered, please fill it"
                }
            )
        }

        // Validating new and old password
        const passwordValidation = await bcrypt.compare(oldPassword, userData.password);
        if(!passwordValidation){
            return res.status(400).json(
                {
                    success : false,
                    message : "Password is incorrect",
                }
            )
        };

        // Validaing if new and old passwords are same or not
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const response = await User.findByIdAndUpdate(
            req.user.id,
            {password : hashPassword},
            {new : true}
        )
        try {
            const emailResponse = await mailSender(
                userData.email,
                "Study Notion - Password Updated",
                passwordUpdated(
                    userData.email,
                    `Password updated successfully for ${userData.firstName} ${userData.lastName}`
                )
            );
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }
        return res.status(200).json(
            {
                success : true,
                message : 'Password updated successfully'
            }
        )
    }catch(error){
        console.log("Error while changing password")
            return res.status(500).json(
                {
                    success : false,
                    message : "change password fail",
                    error : error.message,
                }
            )
    }
}
