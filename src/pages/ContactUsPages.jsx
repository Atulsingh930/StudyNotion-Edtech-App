import React, { useEffect, useState } from 'react'
import {HiChatBubbleLeftRight} from 'react-icons/hi2';
import {BsGlobeEuropeAfrica} from 'react-icons/bs';
import {BsFillTelephoneFill} from 'react-icons/bs'
import ContactUsFormSection from '../components/ContactPage/ContactUsFormSection';
import Footer from '../components/common/Footer';
import { getAllRatingAndReview } from '../services/operations/courseDetailsApi';
import ReviewViewer from '../components/common/ReviewViewer';

function ContactUsPages() {

    const [ratingReview, setratingReview] = useState([]);

    async function getAllRatingReview(){
        const result = await getAllRatingAndReview();
        console.log(result, 'Array')
        if(result){
            setratingReview(result)
        }
    }
    useEffect(() => {
        getAllRatingReview()
    }, [])
    
  return (
    <>
    <div className='w-11/12 max-w-maxContent mx-auto flex gap-[3.25rem] items-start py-[5.625rem]'>
        <div className='w-[28.125rem] flex flex-col gap-6 p-6 bg-richblack-800 rounded-lg'>
            <div className='flex gap-2 items-start p-3'>
                <div className='text-2xl text-richblack-100'>
                    <HiChatBubbleLeftRight/>
                </div>
                <div className='flex flex-col gap-0.5 text-sm text-richblack-100 font-semibold'>
                    <p className='text-lg text-richblack-5'>Chat on us</p>
                    <p className='font-medium'>Our friendly team is here to help.</p>
                    <p>@mail address</p>
                </div>
            </div>
            <div className='flex gap-2 items-start p-3'>
                <div className='text-2xl text-richblack-100'>
                    <BsGlobeEuropeAfrica/>
                </div>
                <div className='flex flex-col gap-0.5 text-sm text-richblack-100 font-semibold'>
                    <p className='text-lg text-richblack-5'>Visit us</p>
                    <p className='font-medium'>Come and say hello at our office HQ.</p>
                    <p>Here is the location/ address</p>
                </div>
            </div>
            <div className='flex gap-2 items-start p-3'>
                <div className='text-2xl text-richblack-100'>
                    <BsFillTelephoneFill/>
                </div>
                <div className='flex flex-col gap-0.5 text-sm text-richblack-100 font-semibold'>
                    <p className='text-lg text-richblack-5'>Call us</p>
                    <p className='font-medium'>Mon - Fri From 8am to 5pm</p>
                    <p>+123 456 7890</p>
                </div>
            </div>
        </div>
        <div className='p-[3.25rem] w-[43.625rem] flex flex-col items-center gap-8 border border-solid border-richblack-600 rounded-xl'>
            <div className='flex flex-col gap-3'>
                <p className='text-4xl font-semibold text-richblack-5 leading-tight'>Got a Idea? We’ve got the skills. Let’s team up</p>
                <p className='font-medium text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>
            </div>
            <ContactUsFormSection/>
        </div>
    </div>
    <div className='flex w-11/12 max-w-maxContent font-inter gap-[3.25rem] py-[5.62rem] mx-auto items-center flex-col'>
        <p className='w-full text-center text-4xl text-richblack-5 font-semibold -tracking-tight'>Reviews from other learners</p>
        <ReviewViewer compContent={ratingReview}/>
    </div>
    <Footer/>
    </>
  )
}

export default ContactUsPages