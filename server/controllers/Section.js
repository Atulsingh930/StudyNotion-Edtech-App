const Section = require('../models/Section');
const Courses = require('../models/Courses');
const SubSection = require('../models/SubSection');

exports.createSection = async (req, res)=>{
    try{
        // fetch data from body
        const {sectionName, courseID} = req.body;
        // validate the data
        if(!sectionName || !courseID){
            return res.status(400).json(
                {
                    success : false,
                    messsage : "All feilds are requiered"
                }
            )
        }
        // check if coure exist or not
        const courseDetails = await Courses.findById(courseID);
        if(!courseDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "course not found"
                }
            )
        }
        // create a section
        const newSection = await Section.create({sectionName})
        // Add section object id in course section array
        const updatedCourseDetails = await Courses.findByIdAndUpdate(
            courseID,
            {
                $push:{
                    courseContent : newSection._id
                }
            },
            {new : true}
        ).populate({ path: "courseContent", populate: { path: "subSection" } }).exec()
        if(!updatedCourseDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Section not added to course"
                }
            )
        }
        return res.status(200).json(
            {
                success:true,
                message : "section created successfully",
                data : updatedCourseDetails
            }
        )
    }catch(error){
        console.log("Error occur while creating section")
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while creating section",
                error
            }
        )
    }
}

// Update the existing section of courses
exports.updateSection = async (req, res)=>{
    try{
        // fetch data from body
        const {sectionName, sectionID, courseID} = req.body;
        // validate the data
        if(!sectionName || !sectionID){
            return res.status(400).json(
                {
                    success : false,
                    messsage : "All feilds are requiered"
                }
            )
        }
        // finding and updating the data
        const updatedSectionDetail = await Section.findByIdAndUpdate(
            sectionID,
            {sectionName},
            {new : true}
        )


        if(updatedSectionDetail){
            const courseDetails = await Courses.findById(courseID).populate({ path: "courseContent", populate: { path: "subSection" } });
            return res.status(200).json(
                {
                    success : true,
                    message : "Section updated successfully",
                    data : courseDetails
                }
            )
        }

    }catch(error){
        console.log("Error occur while updating section")
        return res.status(500).json(
            {
                success : false,
                messsage : "Error occur while updating section",
                error:error.messsage
            }
        )
    }
}

// Delete the section form section and course
exports.deleteSection = async (req, res) => {

    try {
        // Fetching IDs from the request body
        const { sectionID, courseID } = req.body;

        // Validating the data
        if (!courseID || !sectionID) {
            return res.status(400).json({
                success: false,
                message: "Both courseID and sectionID are required fields.",
                courseID : courseID?courseID : null,
                sectionID : sectionID?sectionID : null
            });
        }
        // Check if section exist or not
        const sectionDetails = await Section.findById(sectionID);
        if(!sectionDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Section doesn't exist"
                }
            )
        }
        // delete subSection
        const deleteSubSection = await SubSection.deleteMany({_id : {$in : sectionDetails.subSection}})
        // Deleting the section by its ID
        if(!deleteSubSection){
            return res.status(404).json(
                {
                    success : false,
                    message : 'Error while deleteing subSection'
                }
            )
        }
        const deletedSection = await Section.findByIdAndDelete(sectionID);

        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found."
            });
        }

        // Removing the sectionID from courseContent
        const updatedCourse = await Courses.findByIdAndUpdate(
            courseID,
            {
                $pull: {
                    courseContent: sectionID
                }
            },
            { new: true }
        ).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: updatedCourse
        });
    } catch (error) {
        console.error("Error occurred while deleting section:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting section.",
            error: error.message
        });
    }
};
