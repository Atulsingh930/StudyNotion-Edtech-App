import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import CatalogCard from './CatalogCard';

// import './styles.css';

function CourseSlider({coures}) {

  return (
    coures && (
        <Swiper className='w-full flex gap-6 mySwiper'
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        slidesPerView={3}
        spaceBetween={20}
      >
        {
            coures.map((courses)=>(
                <SwiperSlide className='w-full'>
                    <CatalogCard courses={courses}/>
                </SwiperSlide>
            ))
        }
    </Swiper>
    )
  )
}

export default CourseSlider