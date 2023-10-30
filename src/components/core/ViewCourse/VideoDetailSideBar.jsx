import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { MdComputer } from 'react-icons/md'
import { Link, useLocation, useParams } from 'react-router-dom'
import { convertSeconds } from '../../../utils/constants'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { setCourseProgressDetails, setCurrentVideoLink } from '../../../slices/viewCourseSlice'
import { getUserRatingAndReview, updateCoursePrograss } from '../../../services/operations/courseDetailsApi'
import ReviewModal from './ReviewModal'

function VideoDetailSideBar({lectureNo, courseDetails, sectionTime}) {
    const [activeStatus, setactiveStatus] = useState('');
    const dispatch = useDispatch();
    const [videoBarActive, setVideoBarActive] = useState('');
    const [toggleSection, setToggleSection] = useState('')
    const {sectionID, subSectionID, courseID} = useParams();
    const {courseSectionData, entireCoureData, courseProgressDetails, ratingAndReview} = useSelector((state)=>state.viewCourse);
    const [createReview, setcreateReview] = useState(null)
    const [updatereview, setUpdatereview] = useState(null)
    const {token} = useSelector((state)=>state.auth)

    console.log(courseProgressDetails)
    // console.log(sectionID, subSectionID, 'IDS')
    

    function getCurrentSectionDetails(){
        if(courseSectionData?.length===0){
            return;
        }
        const courseSectionIndex = courseSectionData?.findIndex((data)=>data._id === sectionID);
        // console.log(courseSectionIndex)
        const courseSubSectionIndex = courseSectionData?.[courseSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionID);
        // console.log(courseSubSectionIndex)
        setactiveStatus(courseSectionData?.[courseSectionIndex]?._id);
        setToggleSection(courseSectionData?.[courseSectionIndex]?._id);
        setVideoBarActive(courseSectionData?.[courseSectionIndex]?.subSection?.[courseSubSectionIndex]?._id);
        dispatch(setCurrentVideoLink(courseSectionData?.[courseSectionIndex]?.subSection?.[courseSubSectionIndex]))
    }

    async function addCoursePrograss(courseProgressID, subsectionId){
        if(courseProgressDetails?.completedVideo[0] === subsectionId || courseProgressDetails?.completedVideo.includes(subsectionId)){
            return;
        }
        const result = await updateCoursePrograss(courseProgressID, courseID, subsectionId, token);
        dispatch(setCourseProgressDetails(result))
        if(!result){
            return
        }console.log(result)
    }
    
    useEffect(() => {
        getCurrentSectionDetails()
    }, [courseSectionData, entireCoureData, useLocation().pathname])

    useEffect(() => {
        addCoursePrograss(courseProgressDetails?._id, subSectionID)
      }, []);

    console.log(ratingAndReview)

  return (
    <div className='w-[19.75rem] min-h-[calc(100vh-3.5rem)] pt-[1.88rem] bg-richblack-800 border-r pb-8 border-richblack-700 flex flex-col gap-[0.625rem]'>
        <Link to={'/dashboard/enrolled-courses'}>
            <div className='flex items-center gap-2 px-6 py-2'>
                <BsArrowLeft/>
                <p className='italic text-richblack-5 font-medium'>Back to course page</p>
            </div>
        </Link>
        <div className='w-full px-4'>
            <div className=' h-[0.0625rem] bg-richblack-600'></div>
        </div>
        {
            [...(new Set(courseProgressDetails?.completedVideo))]?.length===lectureNo && (
                <div className='w-full px-4'>
                    {
                        ratingAndReview===null ? (<button onClick={()=>setcreateReview(entireCoureData._id)} className='px-6 py-3 bg-yellow-50 shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] font-medium text-richblack-900 rounded-lg'>Add Review</button>) : (
                            <button onClick={()=>setUpdatereview({courseID : entireCoureData._id, ratingAndReview})} className='px-6 py-3 bg-yellow-50 shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] font-medium text-richblack-900 rounded-lg'>
                                Edit Review
                            </button>
                        )
                    }
                </div>
            )
        }
        <div className='px-6 py-2'>
            <p className='text-lg text-richblack-25 font-bold'>My Course <span className='text-sm font-semibold text-richblack-600'>{`${[...(new Set(courseProgressDetails?.completedVideo))]?.length}/${lectureNo}`}</span></p>
        </div>
        <div>
            {
                courseSectionData?.map((section, index)=>{
                    console.log(courseProgressDetails?.completedVideo?.includes(subSectionID), index)
                    return(
                    <Accordion expanded={toggleSection && toggleSection === section._id} key={section._id} onClick={()=>setToggleSection(section._id)} className='transition-all duration-1000 ease-in-out border-2 border-richblack-700'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#999DAA' }}/>} sx={{backgroundColor : "#2C333F", width : "100%"}}>
                        <div className={`w-full bg-richblack-700 `}>
                            <div className='flex justify-between items-center'>
                                <p className='text-richblack-25 font-medium'>{section?.sectionName}</p>
                                <p className='text-sm text-richblack-25 pl-2'>{convertSeconds(sectionTime?.[index])}</p>
                            </div>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor : '#000814'}}>
                            <div className='flex flex-col'>
                                {section?.subSection?.length>0 && 
                                    section?.subSection.map((subSection)=>(
                                        <Link onClick={()=>addCoursePrograss(courseProgressDetails?._id, subSection._id)} to={`/view-course/${entireCoureData._id}/section/${section._id}/sub-section/${subSection._id}`}>
                                            <div className='w-full flex justify-between items-center cursor-pointer rounded-lg transition-all duration-150 hover:bg-richblack-700'>
                                                <div className={` w-full flex gap-2 items-center ${subSection._id === videoBarActive?'text-blue-100':'text-richblack-50'} font-semibold`}>
                                                    {
                                                        subSection._id === videoBarActive ? (<Checkbox checkedIcon={<PlayArrowRoundedIcon sx={{color : '#47A5C5'}}/>} checked={true} sx={{color: '#585D69'}}/>) : (<Checkbox checked={courseProgressDetails?.completedVideo?.includes(subSection._id)} sx={{color: '#585D69','&.Mui-checked': {  color: '#6E727F', padding : 'none'}}} />)
                                                    }
                                                    <p className={`${subSection._id === videoBarActive?'text-blue-100': 'text-richblack-25'} -tracking-tight text-sm font-medium`}>{subSection.title}</p>
                                                    <MdComputer/>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                )}
                            </div>
                                    
                        </AccordionDetails>
                    </Accordion>
                )})
            }
        </div>
            {createReview && <ReviewModal modalData={createReview} setInput={setcreateReview}/>}
            {updatereview && <ReviewModal modalData={updatereview} setInput={setUpdatereview} edit={true}/>}

    </div>
  )
}

export default VideoDetailSideBar