import React, { useEffect, useState } from 'react'
import { fetchAverageRating } from '../../services/operations/courseDetailsApi';
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material'


function DashboardCard({course, userName}) {

    const [averageRating, setAverageRating] = useState(0)
    async function getAverageRating(){
        const result = await fetchAverageRating(course._id);
        if(result){
            setAverageRating(result);
            return true;
        }return false
    }

    useEffect(() => {
        getAverageRating()
    }, [])
    

    return (
        <div className='flex w-[22rem] flex-col items-start gap-5'>
            <img src={course?.thumbnail} className='h-[11.25rem] w-full object-cover' alt="" />
            <div className='w-full flex flex-col justify-between'>
                <p className='text-richblack-5 font-semibold'>{course?.courseName}</p>
                <div className='w-full'>
                    <p className='text-richblack-300'>{userName}</p>
                    <div className='flex gap-2 items-center'>
                        <Rating 
                        name="half-rating" 
                        value={averageRating} 
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                        />
                        <p className='text-richblack-400'>{course?.ratingAndReview?.length} Rating</p>
                    </div>
                    <p className='text-xl text-richblack-5 font-semibold'>Rs.{Number(course?.price).toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard