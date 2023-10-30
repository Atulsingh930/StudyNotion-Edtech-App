const mongoose = require('mongoose');

const CourseProgressSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    completedVideo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ]
});

module.exports = mongoose.model('CourseProgress', CourseProgressSchema);