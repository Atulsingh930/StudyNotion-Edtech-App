const cloudinary = require('cloudinary').v2;

exports.uploadFileToCloudinary = async (file, folder, height, quality)=>{
    const options = {
        folder
    }
    if(quality){
        options.height = quality;
    }
    if(height){
        options.height = height;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options)
    .catch(
        (error)=>{
            console.log('Error while uploading image');
            console.error(error);
        }
    )
}

exports.deleteFileFromCloudinary = async (public_id, type) => {
    const options = {
        invalidate: true,
        resource_type: type
    }

    try {
        return await cloudinary.uploader.destroy(public_id, options);
    } catch (error) {
        console.error('Error while deleting image from Cloudinary:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


