const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            requierd : true
        },
        description : {
            type : String,
            trim : true,
            requierd : true
        },
        courses : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Courses",
                requierd : true
            }
        ],
    }
)

module.exports = mongoose.model("Category", categorySchema);