const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema(
    {
        title : {
            type : String,            
            trim : true,
            requierd : true
        },
        timeDuration : {
            type : Number,
            trim : true,
        },
        description : {
            type : String,
            trim : true,
            requierd : true
        },
        videoUrl : {
            type : String,
            trim : true,
            requierd : true
        },
        videoPublicId : {
            type : String,
            trim : true,
            requierd : true
        },
        additonalUrl : {
            type : String,
            trim : true,
            // requierd : true
        }
    }
)

module.exports = mongoose.model("SubSection", subSectionSchema);