const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User')

exports.auth = async (req, res, next)=>{
    try{
        // fetching token
        const token = 	
        req.cookies.token ||
                        req.body.token ||
                        req.header("Authorization").replace("Bearer ", "");
        //  validate if toke is present or not
        if(!token){
            return res.status(401).json(
                {
                    success : false,
                    message : "Token is not found"
                }
            )
        }
        // verify token
        try{
            // decode the token and inserted in req
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode
        }catch(error){
            console.log("Error in decoding")
            return res.status(401).json(
                {
                    success : false,
                    message : "Invalid token, cnnot be decoded",
                    error : error.message

                }
            )
        }
        next();
    }catch(error){
        console.log("Error while verifing token")
        return res.status(500).json(
            {
                success : false,
                message : "error while verifing token",
                error : error.message,
            }
        )
    }
}

// creating middleware for isStudent protected route
exports.isStudent = async (req, res, next)=>{
    try{
        if(req.user.accountType!='Student'){
            return res.status(401).json(
                {
                    success : false,
                    message : "This is a protected route for is Studenets only"
                }
            )
        }
        next();
    }catch(error){
        return res.status(500).json(
            {
                success : false,
                message : "Error occured while authorizing token"
            }
        )
    }
}

exports.isInstructor = async (req, res, next)=>{
    try{
        if(req.user.accountType!='Instructor'){
            return res.status(401).json(
                {
                    success : false,
                    message : "This is a protected route for is Instructors only"
                }
            )
        }
        next();
    }catch(error){
        return res.status(500).json(
            {
                success : false,
                message : "Error occured while authorizing token"
            }
        )
    }
}

exports.isAdmin = async (req, res, next)=>{
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json(
                {
                    success : false,
                    message : "This is a protected route is for Admin only"
                }
            )
        }
        next();
    }catch(error){
        return res.status(500).json(
            {
                success : false,
                message : "Error occured while authorizing token"
            }
        )
    }
}