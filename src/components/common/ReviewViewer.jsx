import { Rating } from '@mui/material'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


function ReviewViewer({compContent}) {
// console.log(compContent)
// console.log(compContent[0]?.user?.userImage)c
  return ( compContent.length>=4 ?
    (<Swiper
    slidesPerView= {4}
    // centerInsufficientSlides={true}
    spaceBetween={30}
    modules={[Pagination]}
    className='mySwiper'
  >
    {
        compContent?.map((value)=>(
            <SwiperSlide>
                <div className='h-[11.5rem] w-[17.25rem] p-6 flex flex-col items-start gap-3 bg-richblack-800'>
                    <div className='flex items-center gap-3'>
                        <img className='h-9 aspect-square rounded-full' src={value?.user?.userImage} alt="" />
                        <div>
                            <p className='text-sm font-semibold text-richblack-5 -tracking-tight'>{value?.user?.firstName + " " + value?.user?.lastName}</p>
                            <p className='font-medium text-richblack-600 text-xs -tracking-tight'>{value?.user?.email}</p>
                        </div>
                    </div>
                    <p className='text-xs text-richblack-25'>{value?.review}</p>
                    <div className='flex gap-3 items-center'>
                        <p className='text-yellow-100 text-sm font-semibold'>{value?.rating}</p>
                        <Rating 
                        name="half-rating" 
                        value={value?.rating} 
                        size='small'
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                        />
                    </div>
                </div>
            </SwiperSlide>
        ))
    }
  </Swiper>) : (
    <div className='flex gap-8 items-center justify-center w-full'>
        {compContent?.map((value)=>(
            <div className='h-[11.5rem] w-[17.25rem] p-6 flex flex-col items-start gap-3 bg-richblack-800'>
                <div className='flex items-center gap-3'>
                    <img className='h-9 aspect-square rounded-full' src={value?.user?.userImage} alt="" />
                    <div>
                        <p className='text-sm font-semibold text-richblack-5 -tracking-tight'>{value?.user?.firstName + " " + value?.user?.lastName}</p>
                        <p className='font-medium text-richblack-600 text-xs -tracking-tight'>{value?.user?.email}</p>
                    </div>
                </div>
                <p className='text-xs text-richblack-25'>{value?.review}</p>
                <div className='flex gap-3 items-center'>
                    <p className='text-yellow-100 text-sm font-semibold'>{value?.rating}</p>
                    <Rating 
                    name="half-rating" 
                    value={value?.rating} 
                    size='small'
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 1, color : "#2C333F"}} fontSize="inherit" color='white'/>}
                    />
                </div>
            </div>
        ))}
    </div>
  )

  )
}

export default ReviewViewer