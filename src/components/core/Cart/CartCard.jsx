import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import {MdDelete} from 'react-icons/md'
import { Rating } from '@mui/material'
import { fetchAverageRating } from '../../../services/operations/courseDetailsApi';
import { removeFromCart } from '../../../slices/cartSlice';
import { useDispatch } from 'react-redux';

function CartCard({iteam, index, totalIteam}) {

    const [avgRating, setavgRating] = useState(0);
    const dispatch = useDispatch();

    async function getAverageRating(){
        const result = await fetchAverageRating();
        setavgRating(result)
    }

    useEffect(() => {
        getAverageRating();
    }, [iteam])
    

  return (
    <div className={`w-[49.5rem] py-[2.0625rem] ${index+1<totalIteam?'border-b border-richblack-400':''}`}>
        <div className='flex gap-5'>
            <img className='w-[11.5625rem] h-[9.5rem] rounded-lg' src={iteam.thumbnail} alt="" />
            <div className='w-[25.4375rem] flex flex-col gap-[0.56rem]'>
                <div className='flex flex-col gap-2'>
                    <p className='text-richblack-5 font-medium text-lg'>{iteam.courseName}</p>
                    <p className='text-richblack-400'>{`${iteam.instructor.firstName} ${iteam.instructor.lastName}`}</p>
                </div>
                <div className='flex gap-2'>
                    <p className='text-yellow-100 font-semibold'>{0}</p>
                    <Rating 
                    name="half-rating" 
                    value={avgRating} 
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                    />
                    <p className='text-richblack-400'>{`(${iteam.ratingAndReview.length})`}</p>
                </div>
                <p className='text-sm text-richblack-300 font-medium'>{`Total Courses • Lesson • Beginner`}</p>
            </div>
            <div className='flex flex-col gap-5 items-center'>
                <button onClick={()=>dispatch(removeFromCart(iteam))} className='p-3 flex items-center gap-2 bg-richblack-800 text-pink-200 text-lg border border-richblack-700 rounded-lg'>
                    <MdDelete/>
                    <p className='text-base font-medium'>Remove</p>
                </button>
                <p className='text-yellow-50 text-2xl font-semibold'>Rs. {iteam.price.toLocaleString('en-IN')}</p>
            </div>
        </div>
    </div>
  )
}

export default CartCard