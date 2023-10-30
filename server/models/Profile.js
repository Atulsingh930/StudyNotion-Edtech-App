const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        gender : {
            type : String,
            trim : true,
            requierd : true
        },
        dateOfBirth : {
            type : String,
            trim : true,
            requierd : true
        },
        about : {
            type : String,
            trim : true,
            requierd : true
        },
        contactNumber : {
            type : Number,
            trim : true,
            requierd : true
        }
    }
)

module.exports = mongoose.model("Profile", profileSchema);