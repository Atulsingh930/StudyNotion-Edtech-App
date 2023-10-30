const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const User = require('../models/User');
const Courses = require('../models/Courses')
const { getVideoDurationInSeconds } = require('get-video-duration')
const {uploadFileToCloudinary, deleteFileFromCloudinary} = require('../utils/fileUploader')

// creating subsection
exports.createSubSection = async (req, res)=>{
    try{
        // fetch data from body
        let {sectionID, courseID, title, timeDuration, description} = req.body;
        // fetch video from files
        const videoFile = req.files.videoFile;
        // validate the data
        if(!sectionID || !courseID || !description || !videoFile){
            return res.status(400).json(
                {
                    success : false,
                    messsage : "All feilds are requiered"
                }
            )
        }
        // upload video in cloudinary
        const videoUrl = await uploadFileToCloudinary(videoFile, process.env.FOLDER_NAME);
        timeDuration = await getVideoDurationInSeconds(videoUrl.secure_url);
        // create a subsection
        const subSectionDetails = await SubSection.create(
            {
                title,
                timeDuration : Math.round(timeDuration),
                description,
                videoPublicId : videoUrl.public_id,
                videoUrl:videoUrl.secure_url,
            }
        )
        // adding subSection object_id in section array

        const sectionDetails = await Section.findByIdAndUpdate(
            {_id : sectionID},
            {
                $push : {
                    subSection : subSectionDetails._id
                }
            },
            {new : true}
        ) 
        
        if(sectionDetails){
            const courseDetails = await Courses.findById(courseID).populate({ path: "courseContent", populate: { path: "subSection" } });
            return res.status(200).json(
                {
                    success : true,
                    message : "SubSection created successfully and its id is added in array of subsection",
                    data : courseDetails
                }
            )
        }
    }catch(error){
        console.log("Error occur while creating subSection")
        console.log(error);
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while creating subSection",
                error
            }
        )
    }
}
// updating sub section
exports.updateSubSection = async (req, res)=>{
    try{
        // fetch data from body
        const {subSectionID, courseID, title, description} = req.body;
        // fetch video from files
        const videoFile = req?.files?.videoFile;
        // upload video in cloudinary
        let videoUrl;
        let timeDuration;
        if(videoFile){
            videoUrl = await uploadFileToCloudinary(videoFile, process.env.FOLDER_NAME);
            timeDuration  = await getVideoDurationInSeconds(videoUrl.secure_url);;
        }
        
        // fetching data from section using sectionID
        const subSectionDetails = await SubSection.findById(subSectionID);
        // deleteing data from cloudinary
        videoFile && await deleteFileFromCloudinary(subSectionDetails.videoPublicId);
        // updating the data in subsection
        const updatedSubSectionDetails = await SubSection.findByIdAndUpdate(
            subSectionID,
            {
                title : title ? title : subSectionDetails.title,
                description : description ? description : subSectionDetails.description,
                videoPublicId : videoUrl?.public_id ? videoUrl?.public_id : subSectionDetails.videoPublicId,
                videoUrl: videoUrl?.secure_url ? videoUrl?.secure_url : subSectionDetails.videoUrl,
                timeDuration : Math.round(timeDuration) ? Math.round(timeDuration) : subSectionDetails.timeDuration
            },
            {new : true}
        )

        if(!updatedSubSectionDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Error while updateing subSection data"
                }
            )
        }
        const updatedCourse = await Courses.findById(courseID).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
        return res.status(200).json(
            {
                success : true,
                message : "Section updated successfully",
                data : updatedCourse
            }
        )
    }catch(error){
        console.log(error)
        console.log("Error occur while updating subsection")
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while updating subsection",
                error: error.message
            }
        )
    }
}

// deleteing subSection
exports.deleteSubSection = async (req, res)=>{
    try{
        const {courseID, sectionID, subSectionID} = req.body;
        if(!courseID || !subSectionID || !sectionID){
            return res.status(400).json(
                {
                    success : false,
                    messsage : "All feilds are requiered"
                }
            )
        }
        const subSectionDetails = await SubSection.findById(subSectionID);
        // deleting from the cloudinary
        const deletedFile = await deleteFileFromCloudinary(subSectionDetails.videoPublicId, 'video');
        // Deleting the section by its ID
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionID)
        if (!deletedSubSection) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Section not found."
                }
            )
        }
        // Removing the sectionID from courseContent
        const updatedSection = await Section.findByIdAndUpdate(
            sectionID,
            {
                $pull: {
                    subSection : subSectionID
                }
            },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Course not found."
                }
            );
        }
        const updatedCourse = await Courses.findById(courseID).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedCourse,
            deletedFile
        });
                   
    }catch(error){
        console.error("Error occurred while deleting subsection:", error);
        return res.status(500).json(
            {
                success: false,
                message: "An error occurred while deleting subsection.",
                error: error.message
            }
        );
    }
}