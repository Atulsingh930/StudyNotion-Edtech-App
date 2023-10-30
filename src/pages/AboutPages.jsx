import React, { useEffect, useState } from 'react';
import HighLightText from '../components/core/HomePage/HighLightText';
import AboutUs1 from '../assets/Images/aboutus1.webp';
import AboutUs2 from '../assets/Images/aboutus2.webp';
import AboutUs3 from '../assets/Images/aboutus3.webp';
import FoundingStory from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import Footer from '../components/common/Footer';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import ReviewViewer from '../components/common/ReviewViewer';
import { getAllRatingAndReview } from '../services/operations/courseDetailsApi';

const aboutImage = [AboutUs1, AboutUs2, AboutUs3]

function AboutPages() {

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
        <div className='bg-richblack-800 font-inter'>
            <div className='flex flex-col gap-12 w-11/12 max-w-maxContent mx-auto mt-20 mb-72 relative'>
                <div className='flex flex-col gap-9 items-center'>
                    <p className='font-medium text-richblack-200'>About us</p>
                    <div className='px-14 w-[57.0625rem] flex flex-col gap-4'>
                        <div className='flex flex-col items-center text-4xl font-semibold text-richblack-5'>
                            <p>Driving Innovation in Online Education for a</p>
                            <HighLightText text={'Brighter Future'}/>
                        </div>
                        <p className='text-center text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                </div>
                <div className='w-full flex gap-6 absolute top-64'>
                    {
                        aboutImage.map((about)=>(
                            <div className='h-[20rem]'>
                                <img src={about} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <div className='py-[5.62rem] mt-10 flex flex-col gap-12 w-11/12 max-w-maxContent mx-auto'>
            <p className='text-center text-4xl'>We are passionate about revolutionizing the way we learn. Our innovative platform <HighLightText text={'combines technology'}/>, <HighLightText text={'expertise'} gradiant={'orange'}/>, and community to create an <HighLightText text={'unparalleled educational experience.'} gradiant={'yellow'}/></p>
        </div>
        <div className='py-[5.62rem] mt-10 flex flex-col items-center gap-12 w-11/12 max-w-maxContent mx-auto'>
            <div className='flex gap-[6.125rem] items-center'>
                <div className='text-4xl font-semibold leading-tight flex flex-col gap-6 w-[30.375rem]'>
                    <HighLightText text={'Our Founding Story'} gradiant={'red'}/>
                    <div className='text-richblack-300 text-base font-medium flex flex-col gap-4'>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                </div>
                <div className='w-[33.375rem] p-8'>
                    <img className='w-full' src={FoundingStory} alt="" />
                </div>
            </div>
        </div>
        <div className='flex items-center justify-center gap-[6.125rem] w-11/12 max-w-maxContent mx-auto py-[5.62rem]'>
            <div className='text-4xl font-semibold leading-tight w-[30.375rem] flex flex-col gap-6'>
                <HighLightText text={'Our Vision'} gradiant={'orange'}/>
                <p className='text-base text-richblack-300 font-normal'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className='text-4xl font-semibold leading-tight w-[30.375rem] flex flex-col gap-6'>
                <HighLightText text={'Our Mission'}/>
                <p className='text-base text-richblack-300 font-normal'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
        <StatsComponent/>
        <LearningGrid/>
        <ContactFormSection/>
        <div className='flex w-11/12 max-w-maxContent font-inter gap-[3.25rem] py-[5.62rem] mx-auto items-center flex-col'>
            <p className='w-full text-center text-4xl text-richblack-5 font-semibold -tracking-tight'>Reviews from other learners</p>
            <ReviewViewer compContent={ratingReview}/>
        </div>
        <Footer/>
    </>
  )
}

export default AboutPages