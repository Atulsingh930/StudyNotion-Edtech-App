import React, { useEffect, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import "video-react/dist/video-react.css"
import { Player } from 'video-react';


function CourseThumbnailPreview({name, getValue, setValue, register, errors, width, title, editCourse, video=false, edit=false, add=false, view=false, videoUrl, courseImg}) {

    const [courseImage, setCourseImage] = useState(null);
    const [displayImage, setDisplayImage] = useState(null)
    function handleChangeImage(e){
        const file = e.target.files[0]
        if(file){
            setCourseImage(file)
            setDisplayImage(URL.createObjectURL(file))
        }
    }

    function handleCancel(e){
        e.preventDefault()
        setCourseImage((prevCourseImage)=>prevCourseImage);
        setDisplayImage(null)
        return
    }

    useEffect(() => {
        register(
            name, {
                required : true
            }
        )
        if(edit || view){
            setCourseImage(videoUrl.videoUrl)
            setDisplayImage(videoUrl.videoUrl)
        }if(courseImg){
            setCourseImage(courseImg)
            setDisplayImage(courseImg)
        }
    }, [])
    
    useEffect(() => {
        setValue(name, courseImage)
    }, [courseImage])
    

  return (
    <label className='w-full flex flex-col gap-[0.375rem]'>
        <p className='text-sm text-richblack-5'>{title}<sup className='text-pink-200'>*</sup></p>
        <div className='px-3 py-3 bg-richblack-700 border-2 border-dashed border-richblack-600 rounded-lg'>
            {
                !view && displayImage===null ? 
                (
                    <div className={`${width?`w-[${width}]`:''} flex flex-col gap-2 items-center py-5`}>
                        <input className='hidden' type="file" name="courseThumbnail" id="courseThumbnail" accept={video ? "video/*" : "image/*"}  onChange={handleChangeImage} />
                        {
                            errors.courseThumbnail && (
                                <span>Video is requiered</span>
                            )
                        }
                        <div className='text-[1.375rem] text-yellow-50 p-3 bg-yellow-900 rounded-full'><FiUploadCloud/></div>
                        <div className={`w-[12.8125rem] text-xs text-richblack-200 text-center`}>
                        Drag and drop an image, or <span className='text-yellow-50'>Browse</span> Max 6MB each (12MB for videos)
                        </div>
                        <ul className='flex gap-[3.25rem] text-sm text-richblack-400 font-semibold p-[0.625rem]'>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                ) : 
                ( 
                    <div className='flex flex-col gap-2 items-center w-full p-3'>
                        {
                            video ? (
                                <Player aspectRatio='16:9' playsInline className='pb-10' style={'padding-top: 0'} src={displayImage}/>
                            ):
                            (<img className='object-fill w-full' src={displayImage} alt="" />)
                            
                        }
                        {
                            !view && (
                                <button className='text-richblack-400 underline font-medium' onClick={handleCancel}>
                                    Cancel
                                </button>
                            )
                        }
                    </div>
                )
            }
            {
                errors.courseThumbnail && (
                    <span>Course thumbnail is required</span>
                )
            }

        </div>

    </label>
  )
}

export default CourseThumbnailPreview