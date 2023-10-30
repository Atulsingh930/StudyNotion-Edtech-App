import React from 'react'
import HighLightText from '../HomePage/HighLightText'
import Button from '../HomePage/Button'

function LearningGrid() {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-end py-[5.625rem]'>
        <div className='flex gap-14 justify-center'>
            <div className='w-[34.9375rem] flex flex-col gap-3 pr-20 items-start'>
                <p className='text-3xl font-semibold leading-tight text-richblack-5'>World-Class Learning for <HighLightText text={'Anyone, Anywhere'}/></p>
                <p className='font-medium text-richblack-300'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                <div className='pt-9'>
                    <Button text={'Learn More'} active={true}/>
                </div>
            </div>
            <div className='flex items-start'>
                <div className='w-[18.40625rem] h-[18.375rem] p-8 flex flex-col items-center flex-1 gap-8 bg-richblack-700'>
                    <p className='text-lg font-semibold text-richblack-5 text-start'>Curriculum Based on Industry Needs</p>
                    <p className='text-sm  text-richblack-100 text-start'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                </div> 
                <div className='w-[18.40625rem] h-[18.375rem] p-8 flex flex-col items-start flex-1 gap-8 bg-richblack-800'>
                    <p className='text-lg font-semibold text-richblack-5 text-start'>Our Learning <br /> Methods</p>
                    <p className='text-sm  text-richblack-100 text-start' >The learning process uses the namely online and offline.</p>
                </div>
            </div>
        </div>
        <div className='flex w-[73.625rem] items-end'>
            <div className='w-[18.40625rem] h-[18.375rem] p-8 flex flex-col items-center flex-1 gap-8 bg-richblack-900'></div>
            <div className='w-[18.40625rem] h-[18.375rem] p-8 flex flex-col items-start flex-1 gap-8 bg-richblack-700'>
                <p className='text-lg font-semibold text-richblack-5 text-start'>Certification <br /> &nbsp;</p>
                <p className='text-sm  text-richblack-100 text-start'>You will get a certificate that can be used as a certification during job hunting.</p>
            </div>
            <div className='w-[18.40625rem] h-[18.375rem] p-8 flex flex-col items-start flex-1 gap-8 bg-richblack-800'>
                <p className='text-lg font-semibold text-richblack-5 text-start'>Rating <br /> "Auto-grading"</p>
                <p className='text-sm  text-richblack-100 text-start'>You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.</p>
            </div>
            <div className='w-[18.40625rem] h-[18.375rem] p-8 flex flex-col items-start flex-1 gap-8 bg-richblack-700'>
                <p className='text-lg font-semibold text-richblack-5 text-start'>Ready to <br /> Work</p>
                <p className='text-sm  text-richblack-100 text-start'>Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.</p>
            </div>
        </div>
    </div>
  )
}

export default LearningGrid