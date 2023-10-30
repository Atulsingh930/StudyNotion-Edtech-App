const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema(
    {
        courseName : {
            type : String,
            trim : true,
            requierd : true
        },
        courseDescription : {
            type : String,
            trim : true,
            requierd : true
        },
        instructor : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            requierd : true
        },
        WhatYouWillLearn : {
            type : String,
            trim : true,
            requierd : true
        },
        courseContent : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Section",
                requierd : true
            }
        ],
        ratingAndReview : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "RatingAndReview",
                requierd : true
            }
        ],
        price : {
            type : Number,
            trim : true,
            requierd : true
        },
        thumbnail : {
            type : String,
            trim : true,
            requierd : true
        },
        category : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Category",
                // requierd : true
        },
        tag: {
            type: [String],
            required: true,
        },
        studentsEnrolled : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                requierd : true
            }
        ],	
        instructions: {
            type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
        createdAt : {
            type : Date,
            default : Date.now(),
            requierd : true
        },
    }
)

module.exports = mongoose.model("Courses", coursesSchema);