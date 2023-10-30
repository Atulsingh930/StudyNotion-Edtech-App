const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type : String,
            required : true,
            trim : true
        },
        lastName:{
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true
        },
        password : {
            type : String,
            trim : true,
            required : true // Corrected from 'requierd' to 'required'
        },
        accountType : {
            type : String,
            enum : ["Admin", "Instructor", "Student"],
            required : true,
        },
        additionalDetails : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "Profile"
        },
        courses : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Courses",
                required : true
            }
        ],
        courseProgress : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "CourseProgress",
                required : true
            }
        ],
        userImage : {
            type : String,
            required : true
        },
        token : {
            type : String,
            expires : 60,
        },
        resetPasswordExpires : {
            type : Date
        }
    }
)

module.exports = mongoose.model("User", userSchema);
