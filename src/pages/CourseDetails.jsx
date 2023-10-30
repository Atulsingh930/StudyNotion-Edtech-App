import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import interling from '../assets/Images/interling.svg'
import { fetchAverageRating, fetchCourseDetails, getAllRatingAndReview, getCourseRatingAndReview } from '../services/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionDetails, AccordionSummary, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { convertToIST,convertSeconds, courseDuration } from '../utils/constants';
import Footer from '../components/common/Footer';
import { MdComputer } from 'react-icons/md';
import MuiAccordion from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import Button from '../components/core/HomePage/Button';
import { BsFileEarmarkCheckFill, BsFillClockFill } from 'react-icons/bs';
import { PiCursorFill, PiShareBold } from 'react-icons/pi';
import { HiDeviceMobile } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';
import { buyCourse } from '../services/operations/studentfeatureAPI';
import ConfirmationModal from '../components/common/ConfirmationModal';
import ReviewViewer from '../components/common/ReviewViewer';


function CourseDetails() {

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        '&:before': {
          display: 'none',
        },
      }));
      

    const dispatch = useDispatch()
    const {courseID} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [courseDetails, setcourseDetails] = useState(null);
    const [avgRating, setavgRating] = useState(0);
    const locat = useLocation();
    const location = window.location.href;
    let totalSections = 0;
    let totalSubSections = 0;
    let totalDuration = 0;
    
    // Iterate through courseContent
    if(courseDetails){
        const data = courseDuration(courseDetails?.courseContent);
        totalDuration += data.totalDuration;
        totalSubSections += data.totalSubSections;
        totalSections += data.totalSections
        
        // for (const section of courseDetails?.courseContent) {
        //     totalSections++; // Increment section count
        //     totalSubSections += section.subSection.length; // Add subsection count
            
        //     // Calculate total duration
        //     for (const subsection of section.subSection) {
        //         totalDuration += subsection.timeDuration;
        //     }
        // }

    }

    const {loading} = useSelector((state)=>state.course)


    async function getCourseDetails(courseID){
        const result = await fetchCourseDetails(courseID, dispatch);
        // console.log(result)

        if(!result){
            // console.log('Error while Fetching Courses Details');
            return
        }setcourseDetails(result)
        const avgRatingResult = await fetchAverageRating(courseID);
        // console.log(avgRating)
        if(!avgRatingResult){
            // console.log('Error while Fetching Courses Avg rating');
            return
        }setavgRating(avgRatingResult)
    }

    useEffect(() => {
        getCourseDetails(courseID)
        getAllRatingReview()
    }, [courseID])
    
    const handleCopyLink = ()=>{
        navigator.clipboard.writeText(location);
        toast.success('Link Copied to Clipboard')
    }

    function handleAddToCart(){
        if(token){
            dispatch(addToCart(courseDetails))
            return;
        }
        setConfirmationModal(
            {
                text1 : 'You are not Logged in',
                text2 : 'Please Login to Add to Cart',
                btn1Text : 'Login',
                btn2Text : 'Cancel',
                btn1Handler : ()=>navigate('/login'),
                btn2Handler : ()=>setConfirmationModal(null)
            }
        )
    }

    async function handleBuyButton(){
        if(token){
            buyCourse([courseID], token, user, navigate, dispatch);
            return;
        }setConfirmationModal(
            {
                text1 : 'You are not Logged in',
                text2 : 'Please Login to purchase the Course',
                btn1Text : 'Login',
                btn2Text : 'Cancel',
                btn1Handler : ()=>navigate('/login'),
                btn2Handler : ()=>setConfirmationModal(null)
            }
        )

    }

    const [ratingReview, setratingReview] = useState([]);

    async function getAllRatingReview(){
        const result = await getCourseRatingAndReview(courseID);
        // console.log(result, 'Array')
        if(result){
            setratingReview(result)
        }
    }

  return (
    loading || courseDetails===null ? (<div className='loader'></div>) : (
        <>
            <div className={`flex flex-col gap-8 relative ${ratingReview?.length === 0 && 'mb-20'}`}>
                <div className='bg-richblack-800'>
                    <div className='pt-20 w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-3 p-4'>
                        <div className='flex gap-2 items-center text-sm text-richblack-300'>
                            <p>Home</p>
                            <p>/</p>
                            <p>Learning</p>
                            <p>/</p>
                            <p className='text-yellow-100'>{courseDetails.category.name}</p>
                        </div>
                        <p className='text-richblack-5 text-3xl'>{courseDetails.courseName}</p>
                        <p className='text-sm text-richblack-400'>{courseDetails.courseDescription}</p>
                        <div className='flex gap-2 items-center text-richblack-25'>
                            <p className='text-yellow-50 text-lg font-semibold'>{avgRating}</p>
                            <Rating 
                            name="half-rating" 
                            value={avgRating} 
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                            />
                            <p className='text-richblack-400'>{`( ${courseDetails?.ratingAndReview?.length} Rating)`}</p>
                            <p>{courseDetails?.studentsEnrolled.length.toLocaleString('en-IN')} Students Enrolled</p>
                        </div>
                        <p className='text-richblack-25'>Created By:{courseDetails?.instructor?.firstName + ' ' + courseDetails?.instructor?.lastName}</p>
                        <p className='text-richblack-25'>Created at {convertToIST(courseDetails?.createdAt)}</p>
                    </div>
                </div>
                <div className='w-11/12 max-w-maxContent mx-auto p-4'>
                    <div className='flex flex-col gap-3 p-8 border border-richblack-700 w-[49.5rem]'>
                        <p className='text-richblack-5 text-3xl'>What you'll learn</p>
                        <div className='text-sm text-richblack-50 flex flex-col gap-2 items-start font-medium -tracking-tighter'>
                        {
                            courseDetails?.WhatYouWillLearn.split('.').map((para)=>(
                                <p>{para}</p>
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div className='w-11/12 max-w-maxContent mx-auto p-4'>
                    <div className='flex flex-col gap-4 w-[49.5rem]'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-richblack-5 text-3xl'>Course content</p>
                            <div className='flex justify-between'>
                                <p className='text-sm text-richblack-50 font-medium'>{`${totalSections} sections • ${totalSubSections} lectures • ${convertSeconds(totalDuration)} total length`}</p>
                                <p className='text-sm text-yellow-50'>Collapse all sections</p>
                            </div>
                        </div>
                        <div>
                            {
                                courseDetails?.courseContent.map((section, index)=>(
                                    <Accordion key={section._id} className='transition-all duration-1000 ease-in-out border-2 border-richblack-700'>
                                        <AccordionSummary sx={{backgroundColor : "#2C333F", width : "100%"}}>
                                        <div className={`w-full flex justify-between items-center bg-richblack-700 `}>
                                            <div className='flex gap-2'>
                                                <img src={interling} alt="" height={20} width={20} className='cursor-pointer'/>
                                                <p className='text-richblack-50 font-semibold'>{section?.sectionName}</p>
                                            </div>
                                            <div className='flex gap-3 text-sm'>
                                                <p className='text-yellow-50'>{section?.subSection?.length} lectures</p>
                                                <p className='text-richblack-25'>{convertSeconds(section?.subSection?.reduce((accumulator, currentValue) => accumulator + currentValue.timeDuration, 0))}</p>
                                            </div>
                                        </div>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{backgroundColor : '#000814'}}>
                                            <div className='flex flex-col'>
                                                {section?.subSection?.length>0 && 
                                                    section?.subSection.map((subSection)=>(
                                                        <div className='w-full pl-6 pt-3 flex justify-between items-center'>
                                                            <div className='flex gap-2 cursor-pointer items-center text-richblack-50 font-semibold'>
                                                                <MdComputer/>
                                                                <p>{subSection.title}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                                    
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='w-11/12 max-w-maxContent mx-auto p-4'>
                    <div className=' flex flex-col gap-3 w-[49.5rem]'>
                        <p className='text-richblack-5 text-3xl'>Author</p>
                        <div className='flex gap-3 items-center'>
                            <img className='h-[3.25rem] aspect-square rounded-full' src={courseDetails?.instructor?.userImage} alt="" />
                            <p className='text-richblack-5 font-medium'>{courseDetails?.instructor?.firstName + ' ' + courseDetails?.instructor?.lastName}</p>
                        </div>
                        <p className='text-sm text-richblack-50 -tracking-tighter'>{courseDetails?.instructor?.additionalDetails?.about}</p>
                    </div>
                </div>
                <div className='absolute top-20 right-32 w-96 bg-richblack-700 rounded-lg'>
                    <img className='h-[12.5625rem] w-full' src={courseDetails.thumbnail} alt="" />
                    <div className='flex flex-col gap-4 p-6'>
                        <p className='text-richblack-5 text-3xl font-bold'>Rs.{courseDetails.price.toLocaleString('en-IN')}</p>
                        <div className='flex flex-col gap-3'>
                            {
                                user?.courses?.some(course => course._id === courseDetails._id) ? (<Button text={'Go to Enrolled Courses'} active={true} linkTo={'/dashboard/enrolled-courses'}/>) : (
                                    <>
                                        <Button clickHandler={handleAddToCart} text={'Add to Cart'} active={true}/>
                                        <Button clickHandler={handleBuyButton} text={'Buy Now'} active={false}/>
                                    </>
                                )
                            }
                            <p className='text-center text-sm text-richblack-25'>30-Day Money-Back Guarantee</p>
                        </div>
                        <div className='flex flex-col items-start gap-2'>
                            <p className='text-richblack-5 font-medium'>This course includes:</p>
                            <div className='flex gap-2 text-caribbeangreen-100 text-sm items-center'>
                                <BsFillClockFill/>
                                <p>8 hours on-demand video</p>
                            </div>
                            <div className='flex gap-2 text-caribbeangreen-100 text-sm items-center'>
                                <PiCursorFill/>
                                <p>Full Lifetime access</p>
                            </div>
                            <div className='flex gap-2 text-caribbeangreen-100 text-sm items-center'>
                                <HiDeviceMobile/>
                                <p>Access on Mobile and TV</p>
                            </div>
                            <div className='flex gap-2 text-caribbeangreen-100 text-sm items-center'>
                                <BsFileEarmarkCheckFill/>
                                <p>Certificate of completion</p>
                            </div>
                        </div>
                        <div className='px-6 py-3 flex justify-center'>
                            <div onClick={handleCopyLink} 
                            className=' flex justify-center gap-2 text-yellow-100 items-center cursor-pointer'>
                                <PiShareBold/>
                                <p>Share</p>
                            </div>
                        </div>
                    </div>
                </div>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
            </div>
            {
                ratingReview?.length > 0 && (
                    <div className='flex w-11/12 max-w-maxContent font-inter gap-[3.25rem] py-[5.62rem] mx-auto justify-center items-center flex-col'>
                        <p className='w-full text-center text-4xl text-richblack-5 font-semibold -tracking-tight'>Reviews from other learners</p>
                        <div className='min-w-[17.25rem] max-w-full mx-auto'>
                            <ReviewViewer compContent={ratingReview}/>
                        </div>
                    </div>
                )
            }
            <Footer/>
        </>
    )
  )
}

export default CourseDetails