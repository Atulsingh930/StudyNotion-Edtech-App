import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import { updateCoursePrograss } from '../../../services/operations/courseDetailsApi';
import { setCourseProgressDetails } from '../../../slices/viewCourseSlice';

function VideoPlayer() {

    const {sectionID, subSectionID} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseSectionData, entireCoureData, currentVideoLink, courseProgressDetails} = useSelector((state)=>state.viewCourse);
    const {token} = useSelector((state)=>state.auth);

    async function addCoursePrograss(courseProgressID, subsectionId){
        if(courseProgressDetails?.completedVideo[0] === subsectionId || courseProgressDetails?.completedVideo.includes(subsectionId)){
            return;
        }
        const result = await updateCoursePrograss(courseProgressID, entireCoureData._id, subsectionId, token);
        dispatch(setCourseProgressDetails(result))
        if(!result){
            return
        }console.log(result)
    }

    function nextVideo(){
        const courseSectionIndex = courseSectionData?.findIndex((data)=>data._id === sectionID);
        const courseSubSectionIndex = courseSectionData?.[courseSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionID);
        if(courseSubSectionIndex===courseSectionData?.[courseSectionIndex]?.subSection.length-1 && courseSectionIndex>=0){
            navigate(`/view-course/${entireCoureData._id}/section/${courseSectionData?.[(courseSectionIndex+1)%(courseSectionData?.length)]?._id}/sub-section/${courseSectionData?.[(courseSectionIndex+1)%(courseSectionData?.length)]?.subSection?.[0]?._id}`)
            addCoursePrograss(courseProgressDetails?._id, courseSectionData?.[(courseSectionIndex+1)%(courseSectionData?.length)]?.subSection?.[0]?._id)
        }else{
            navigate(`/view-course/${entireCoureData._id}/section/${courseSectionData?.[courseSectionIndex]?._id}/sub-section/${courseSectionData?.[courseSectionIndex]?.subSection?.[courseSubSectionIndex+1]?._id}`)
            addCoursePrograss(courseProgressDetails?._id, courseSectionData?.[courseSectionIndex]?.subSection?.[courseSubSectionIndex+1]?._id)
        }
    }

    function previousVideo(){
        const courseSectionIndex = courseSectionData?.findIndex((data)=>data._id === sectionID);
        const courseSubSectionIndex = courseSectionData?.[courseSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionID);
        if(courseSubSectionIndex===0){
            navigate(`/view-course/${entireCoureData._id}/section/${courseSectionData?.[(courseSectionIndex-1)%(courseSectionData?.length)]?._id}/sub-section/${courseSectionData?.[(courseSectionIndex-1)%(courseSectionData?.length)]?.subSection?.[courseSectionData?.[(courseSectionIndex-1)%(courseSectionData?.length)]?.subSection?.length-1]?._id}`)
            addCoursePrograss(courseProgressDetails?._id, courseSectionData?.[(courseSectionIndex-1)%(courseSectionData?.length)]?.subSection?.[courseSectionData?.[(courseSectionIndex-1)%(courseSectionData?.length)]?.subSection?.length-1]?._id)
        }else{
            navigate(`/view-course/${entireCoureData._id}/section/${courseSectionData?.[courseSectionIndex]?._id}/sub-section/${courseSectionData?.[courseSectionIndex]?.subSection?.[courseSubSectionIndex-1]?._id}`)
            addCoursePrograss(courseProgressDetails?._id, courseSectionData?.[courseSectionIndex]?.subSection?.[courseSubSectionIndex-1]?._id)
        }
    }
    

  return (
    <div className='h-[37.1875rem] w-full'>
        <div className='w-full flex justify-center bg-richblack-800'>
            <button disabled={subSectionID===courseSectionData?.[0].subSection?.[0]?._id} onClick={previousVideo} className={`w-1/2 text-center py-2 text-lg text-richblack-50 font-medium flex justify-center items-center gap-2 ${!subSectionID===courseSectionData?.[0].subSection?.[0]?._id && 'hover:text-richblack-5'}`}><BsArrowLeft/><p>Previous</p></button>
            <button onClick={nextVideo} className='w-1/2 text-center py-2 text-lg text-richblack-50 font-medium flex justify-center items-center gap-2 hover:text-richblack-5'><p>Next</p><BsArrowRight/></button>
        </div>
        <Player fluid={false} src={currentVideoLink?.videoUrl} height={'100%'} width={'100%'}>
            <BigPlayButton position='center'/>
        </Player>
    </div>
  )
}

export default VideoPlayer