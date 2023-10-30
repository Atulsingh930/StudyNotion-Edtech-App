const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
    {
        sectionName : {
            type : String,
            trim : true,
            requierd : true
        },
        subSection : [
            {
                type : mongoose.Schema.Types.ObjectId,
                requierd : true,
                ref : "SubSection"
            }
        ]
    }
)

module.exports = mongoose.model("Section", sectionSchema);