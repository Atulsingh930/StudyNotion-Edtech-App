const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadFileToCloudinary} = require('../utils/fileUploader')
const CourseProgress = require('../models/CourseProgress'); // Import the model


exports.updateProfile = async(req, res)=>{
    try{
        // fetching data form body
        const {firstName, lastName, dateOfBirth="", about="", contactNumber, gender} = req.body;
        // Fetching user id from req.user
        const userID = req.user.id;
        // validate
        if(!contactNumber || !gender || !userID){
            return res.status(400).json(
                {
                    success : false,
                    messsage : "All feilds are requiered"
                }
            )
        }
        // fetching user profile using user id
        const userDetail = await User.findById(userID);
        userDetail.firstName = firstName;
        userDetail.lastName = lastName;
        // fetching profile detail using additioanlDetail id
        const profileID = userDetail.additionalDetails;
        const profileDetails = await Profile.findById(profileID);
        // updating details using save method
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.save();
        userDetail.save();

        return res.status(200).json(
            {
                success : true,
                message : "Profile date has been updated successfully",
                data : profileDetails
            }
        )

    }catch(error){
        console.log("Error occur while updating user profile")
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while updating user profile",
                error:error.messsage
            }
        )
    }
}

exports.deleteAccount = async (req, res)=>{
    try{
        const userID = req.user.id;
        // validate
        const userDetails = await User.findById(userID);
        if(!userDetails){
            return res.status(400).json(
                {
                    success : false,
                    messsage : "All feilds are requiered"
                }
            )
        }
        // fetching and deleting the profile details
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        // fetching and deleting the profile details
        await User.findByIdAndDelete(userID);
         return res.status(200).json(
            {
                success : true,
                message : "User deleted sucessfully"
            }
         )
    }catch(error){
        console.log("Error occur while deleting user")
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while deleting user",
                error:error.messsage
            }
        )
    }
}

exports.updateProfilePicture = async(req, res)=>{
    try{
        const userID = req.user.id;
        const userImage = req.files.imageFile;
        if(!userImage){
            return res.status(400).json(
                {
                    success : false,
                    message : "All feilds are requiered"
                }
            )
        }
        const uploadResponse = await uploadFileToCloudinary(userImage, process.env.FOLDER_NAME);
        const updateProfile = await User.findByIdAndUpdate(
            userID,
            {
                userImage : uploadResponse.secure_url
            },
            {new : true}
        )

        return res.status(200).json(
            {
                success : true,
                message : "Profile image has been updated successfully",
                data : updateProfile,
            }
        )

    }catch(error){
        console.log("Error occur while updating user profile image")
        console.error(error);
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while updating user profile image",
                error :error.message
            }
        )
    }
}

exports.getUserDetails = async (req, res)=>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId)
        .populate('additionalDetails').exec();
        if(!userDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "User not found on Id"
                }
            )
        }
        return res.status(200).json(
            {
                success : true,
                message : "All the userDetails are fetched",
                userDetails
            }
        )
    }catch(error){
        console.log("Error occur while fetching user details")
        console.error(error);
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while fetching user details",
                error :error
            }
        )
    }
}

exports.getEnrolledCourse = async (req, res)=>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(400).json(
                {
                    success : false,
                    message : 'User not found'
                }
            )
        }

    const enrolledCourses = await User.findById(userId)
        .populate({path:"courses",populate:{path:"courseContent", populate: {path : "subSection"}}})
        .populate('courseProgress').exec();

    return res.status(200).json(
        {
            success : true,
            message : 'Enrolled courses are fetchedt successfully',
            response : {
                courses : enrolledCourses.courses,
                courseProgress : enrolledCourses.courseProgress
            },
        }
    )

    }catch(error){
        console.log('Error occur while fetching enrolled courses');
        return res.status(500).json(
            {
                success : false,
                message : "error occur while fetching enrolled courses",
                error : error.message
            }
        )
    }
}