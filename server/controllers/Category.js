const Category = require('../models/Category');
const Courses = require('../models/Courses');
const courses = require('../models/Courses');

exports.createcategory = async (req, res)=>{
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }
        const categoryDetails = await Category.create(
            {
                name : name,
                description : description
            }
        )

        return res.status(200).json(
            {
                success : true,
                message : "category are created successfully"
            }
        )

    }catch(error){
        console.log("Error while creating category");
        return res.status(500).json(
            {
                success: false,
                message : 'Error occurs while creating category'
            }
        )
    }
}

exports.fetchAllcategory = async (req, res)=>{
    try{
        const allcategory = await Category.find({}, {name:true, description:true})
        return res.status(200).json(
            {
                success : true,
                message : "All category are fetched successfully",
                allcategory
            }
        )
    }catch(error){
        console.log("Error while fetching category");
        return res.status(500).json(
            {
                success: false,
                message : 'Error occurs while fetching category'
            }
        )
    }
}

exports.categoryPageDetails = async (req, res)=>{
    try{
        // Fetching category id from body
        const {categoryID} = req.body;
        // fetching courses according to there category
        const selectedCategory = await Category.findById(categoryID).populate({path:"courses",populate:{path:"instructor"}}).exec();
        if(!selectedCategory){
            return res.status(400).json(
                {
                    success : false,
                    message : "Category not found"
                }
            )
        }
        // fetching courses other than there category
        const differentcategory =await Category.find(
            {_id : {$ne : categoryID}}
        )
        .populate('courses')
        .exec();
        if(!differentcategory){
            return res.status(400).json(
                {
                    success : false,
                    message : "courses of different not found"
                }
            )
        }
        // fetching all courses according to there popularirty
        const topAllCourses = await Courses.find({}).sort({"studentsEnrolled.length" : -1}).populate('instructor');
        if(!topAllCourses){
            return res.status(400).json(
                {
                    success : false,
                    message : "Top Courses does not found"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : "All courses are fetched successfully",
                data : {selectedCategory, differentcategory, topAllCourses}
            }
        )
    }catch(error){
        console.log("Error while fetching courses according to there category ");
        return res.status(500).json(
            {
                success: false,
                message : 'Error occurs while fetching courses according to there category',
                error : error.message
            }
        )
    }
}