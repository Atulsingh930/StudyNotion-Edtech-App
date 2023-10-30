import React, { useEffect, useState } from 'react'
import { fetchAverageRating } from '../../../services/operations/courseDetailsApi';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';


function CourseCard({course}) {
    // courseName={course.courseName} image={course.thumbnail} instructorName={course?.instructor?.firstName + ' ' + course?.instructor?.lastName} price={course.price} rating={course} key={course._id}
    const [averagerating, setaveragerating] = useState(null);

    async function getAverageRating(courseId){
        const result = await fetchAverageRating(courseId);
        setaveragerating(result)
        return result;
    }

    useEffect(() => {
        getAverageRating(course._id);
    }, [course])
  return (
    <Link to={`/course/${course._id}`}>
        <div key={course._id} className='flex flex-col gap-5'>
            <img className='h-[19rem] w-[37.75rem] rounded-lg' src={course.thumbnail} alt="" />
            <div className='flex flex-col items-start gap-0.5'>
                <p className='text-richblack-5 font-medium'>{course.courseName}</p>
                <p className='text-richblack-300'>{course?.instructor?.firstName + ' ' + course?.instructor?.lastName}</p>
                <div className='flex gap-2 items-center'>
                        <Rating 
                        name="half-rating" 
                        value={averagerating} 
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                        />
                        <p className='text-richblack-400'>{course?.ratingAndReview?.length} Rating</p>
                    </div>
                <p className='text-xl font-semibold text-richblack-5'>Rs.{course.price.toLocaleString('en-IN')}</p>
            </div>
        </div>
    </Link>
  )
}

export default CourseCard