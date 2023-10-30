const User = require('../models/User')
const mailSender = require('../utils/mailsender');
const {passwordUpdated} = require('../mail/templates/passwordUpdate');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserExist = await User.findOne({ email: email });

        if (!checkUserExist) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        const token = crypto.randomBytes(32).toString('hex'); // Generate a secure random token

        const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        // Update the user's resetPasswordToken and resetPasswordExpires fields with the new token and expiration time
        await User.findByIdAndUpdate(
            checkUserExist._id,
            {
                token: token,
                resetPasswordExpires: expirationTime,
            },
            { new: true }
        );

        // Schedule a job to remove the token after 5 minutes
        setTimeout(async () => {
            await User.findByIdAndUpdate(
                checkUserExist._id,
                {
                    $unset: { token: 1, resetPasswordExpires: 1 },
                },
                { new: true }
            );
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email, "Password Reset Link", `<a href="${url}">Password Reset Link</a>`);

        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating a link for password reset",
        });
    }
};


exports.resetPassword = async (req, res)=>{
    try{
        const {password, confirmPassword, token} = req.body;
        if(!password || !confirmPassword || !token){
            return res.status(401).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }

        const checkExistance = await User.findOne({token:token});
        if(!checkExistance){
            console.log("Eithier token doesn't exist or it has expire")
            return res.status(401).json(
                {
                    success : false,
                    message : "Token doesn't exist please create it"
                }
            )
        }

        if(Date.now()>checkExistance.resetPasswordExpires){
            console.log("token has expire")
            return res.status(401).json(
                {
                    success : false,
                    message : "Token has expire please create it"
                }
            )
        }

        if(password!=confirmPassword){
            console.log("new and confirm passwords are not equal")
            return res.status(406).json(
                {
                    success : false,
                    message : "new and confirm passwords are not equal"
                }
            )
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const updateDetail = await User.findByIdAndUpdate(
            checkExistance._id,
            {
                password : hashPassword
            }
        )
        const mailSenderResponse = await mailSender(checkExistance.email, "Password Changed Successfully", passwordUpdated(checkExistance.email, `${checkExistance.firstName} ${checkExistance.lastName}`))
        return res.status(200).json(
            {
                success : true,
                message : "Paasword is reseted successfully",
                updateDetail,
                mailSenderResponse
            }
        )

    }catch(error){
        console.log("Error while reseting password")
        return res.status(400).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}