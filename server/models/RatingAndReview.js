const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            requierd : true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Courses",
            index: true,
        },
        rating : {
            type : Number,
            trim : true,
            requierd : true
        },
        review : {
            type : String,
            trim : true,
            requierd : true
        }
    }
)

module.exports = mongoose.model("RatingAndReview", ratingSchema);