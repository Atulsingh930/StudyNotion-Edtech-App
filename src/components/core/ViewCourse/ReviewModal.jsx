import {Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import StarIcon from '@mui/icons-material/Star';
import { useForm } from 'react-hook-form';
import { createRatingAndReview, deleteRatingAndReview, updateRatingAndReview } from '../../../services/operations/courseDetailsApi';
import { setRatingReview } from '../../../slices/viewCourseSlice';
import toast from 'react-hot-toast';


function ReviewModal({modalData, setInput, edit=false}) {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const [ratingDetails, setratingDetails] = useState(0)
    const dispatch = useDispatch();
    console.log(user)
    console.log(modalData)
    const{register, handleSubmit, formState: {errors}, setValue, getValues} = useForm();

    async function removeRatingAndReview(){
        const result = await deleteRatingAndReview( modalData?.ratingAndReview?._id, token);
        if(!result){
            toast.error('Error while Deleteing Rating and Review');
            return
        }dispatch(setRatingReview(null))
        setInput(null)
        return
    }

    function isFormDataUpdated(){
        if(ratingDetails!==modalData?.ratingAndReview?.rating && getValues('review')!==modalData?.ratingAndReview?.review){
            return false
        }return true
    }

    async function onSubmit(data){
        // event.prevantDefault()
        console.log(modalData)
        console.log(data.rating, data.review, 'DATA')
        const formData = new FormData();
        if(edit){
            if(isFormDataUpdated()){
                formData.append('courseId', modalData?.courseID);
                console.log(data)
                formData.append('ratingAndReviewID', modalData?.ratingAndReview?._id)
                if(ratingDetails!==modalData?.ratingAndReview?.rating){
                    formData.append('rating', ratingDetails)
                }if(data.review!==modalData?.ratingAndReview?.review){
                    formData.append('review', data.review)
                }
                const result = await updateRatingAndReview(formData, token);
                if(result){
                    dispatch(setRatingReview(result));
                    setInput(null)

                }
            }return;
        }
        // courseId, rating, review
        console.log(modalData)
        formData.append('courseId', modalData)
        formData.append('rating', ratingDetails)
        formData.append('review', data.review)
        console.log('courseID', modalData?.courseID)
        const result = await createRatingAndReview(formData, token);
        if(result){
            dispatch(setRatingReview(result));
            setInput(null)
        }
        
        console.log(data)
    }

    useEffect(() => {
        if(edit){
            console.log(modalData?.ratingAndReview?.rating)
            setValue('review', modalData?.ratingAndReview?.review)
            setratingDetails(modalData?.ratingAndReview?.rating)
        }
    }, [])
    

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 max-w-[41.5625rem] rounded-lg border border-richblack-400 bg-richblack-800 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-end overflow-y-auto'>
            <div className='w-full px-6 py-4 flex justify-between items-center bg-richblack-700'>
                <p className='text-lg text-richblack-5 font-semibold'>{edit ? 'Edit Review':'Add Review'}</p>
                <RxCross2 className='cursor-pointer' onClick={()=>setInput(null)}/>
            </div>
            <div className='w-full flex flex-col items-center gap-8 p-8'>
                <div className='flex justify-center items-center gap-3'>
                    <img className='h-14 aspect-square rounded-full' src={user?.userImage} alt="" />
                    <div className='-tracking-tighter'>
                        <p className='text-richblack-5 font-semibold'>{user?.firstName + ' ' + user?.lastName}</p>
                        <p className='text-richblack-5 text-sm font-base'>Posting Publicly</p>
                    </div>
                </div>
                <Rating
                  name="rating"
                  value={ratingDetails}
                //   value={getValues('rating')}
                  onChange={(event) => {
                    setratingDetails(event.target.value);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.5, color: "#DBDDEA" }} fontSize="inherit" color="white" />}
                />
                <div className='flex flex-col gap-3 items-start w-full'>
                    <label className='text-sm richblack-5 font-base' htmlFor="review">Add Your Experience<sup className='text-pink-100'>*</sup></label>
                    <textarea className='w-full p-3 bg-richblack-600 rounded-lg shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset]' name="review" id="review" cols="30" rows="5" {...register('review', {required : true})} placeholder='Share Details of your own experience for this course'/>
                    {
                    errors.review && (
                        <span>Review is Requiered</span>
                    )
                }
                </div>
            </div>
            <div className='w-full flex items-center justify-end px-8 pb-8 gap-3'>
                    {
                        edit && (
                            <button onClick={removeRatingAndReview} className='px-6 py-3 bg-richblack-700 shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] font-medium text-richblack-5 rounded-lg transition-all duration-200 hover:scale-95'>
                                Delete Review
                            </button>
                        )
                    }
                    <button className='px-6 py-3 bg-yellow-50 shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] font-medium text-richblack-900 rounded-lg transition-all duration-200 hover:scale-95'>
                        Save Edits
                    </button>
            </div>
        </form>
        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over'></div>
    </div>
  )
}

export default ReviewModal