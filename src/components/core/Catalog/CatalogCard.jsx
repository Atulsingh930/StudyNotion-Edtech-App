import React, { useEffect, useState } from 'react'
import { fetchAverageRating } from '../../../services/operations/courseDetailsApi';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

function CatalogCard({courses, userName}) {

    const [averagerating, setaveragerating] = useState(null);

    async function getAverageRating(courseId){
        const result = await fetchAverageRating(courseId);
        setaveragerating(result)
        return result;
    }

    useEffect(() => {
        getAverageRating(courses._id);
    }, [courses])
    

  return (
    <Link to={`/course/${courses._id}`}>
        <div className='flex flex-col gap-5'>
            <img className='h-[12.5625rem] w-full rounded-lg' src={courses?.thumbnail} alt="" />
            <div className='w-full h-[7.375rem] flex flex-col justify-between'>
                <p className='text-richblack-5 font-semibold'>{courses?.courseName}</p>
                <div className='w-full'>
                    <p className='text-richblack-300'>{userName ? userName : courses?.instructor?.firstName + ' ' + courses?.instructor?.lastName}</p>
                    <div className='flex gap-2 items-center'>
                        <Rating 
                        name="half-rating" 
                        value={averagerating} 
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                        />
                        <p className='text-richblack-400'>{courses?.ratingAndReview?.length} Rating</p>
                    </div>
                    <p className='text-xl text-richblack-5 font-semibold'>Rs.{Number(courses?.price).toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default CatalogCard