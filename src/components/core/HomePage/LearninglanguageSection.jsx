import React from 'react';
import HighLightText from './HighLightText';
import learningImg1 from '../../../assets/learningLanguageAssets/learningImg1.svg'
import learningImg2 from '../../../assets/learningLanguageAssets/learningImg2.svg'
import learningImg3 from '../../../assets/learningLanguageAssets/learningImg3.svg'
import Button from '../../../components/core/HomePage/Button'


function LearninglanguageSection() {
  return (
    <div className='font-inter flex flex-col w-11/12 max-w-maxContent items-center gap-12'>
        <div className='text-center text-richblack-700 flex flex-col gap-3'>
            <p className='text-4xl font-semibold'>Your swiss knife for <HighLightText text={"learning any language"}/></p>
            <p className='text-base font-medium px-56'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
        <div className='flex relative z-0'>
            <div className='z-10 relative left-20 top-4'>
                <img src={learningImg1} alt='' />
            </div>
            <div className='z-20'>
                <img src={learningImg2} alt='' />
            </div>
            <div className='z-30 right-32 relative'>
                <img src={learningImg3} alt='' />            
            </div>
        </div>
        <div>
            <Button text={"Learn More"} active={true} linkTo={'/signup'}/>
        </div>
    </div>
  )
}

export default LearninglanguageSection