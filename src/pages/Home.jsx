import React, { useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighLightText from '../components/core/HomePage/HighLightText';
import Button from '../components/core/HomePage/Button';
import banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/HomePage/CodeBlock';
import LearninglanguageSection from '../components/core/HomePage/LearninglanguageSection';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import Instructor from '../assets/Images/Instructor.png'
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import ReviewViewer from '../components/common/ReviewViewer';
import { getAllRatingAndReview } from '../services/operations/courseDetailsApi';
import { useState } from 'react';

function Home() {

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
    <div className='realtive'>
        {/* section 1 */}
            <div className='relative mx-auto w-11/12 flex flex-col items-center justify-between gap-[2.38rem]'>
                <Link to={'/signup'}>
                    <div className=' group p-1 mt-16 bg-richblack-800 text-richblack-200 rounded-full mx-auto font-bold shadow-custom transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex items-center gap-[0.625rem] py-[0.375rem] rounded-full px-5 transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
                <div className='flex flex-col items-center w-3/5 gap-4 font-inter font-semibold text-richblack-5'>
                    <div className='text-4xl tracking-tight'>
                        Empower Your Future with <HighLightText text={"Coding Skills"}/>
                    </div>
                    <p className='text-center font-medium text-base text-richblack-300'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </p>
                </div>
                <div className='flex gap-6'>
                    <Button text={"Learn More"} linkTo={"/signup"} active={true}/>
                    <Button text={"Book a Demo"} linkTo={"/login"} active={false}/>
                </div>
                <div className='magicBox'>
                </div>
                <div className='mt-5 mb-20 shadow-[20px_20px_0px_0px_#F5F5F5] z-10'>
                    <video muted loop autoPlay src={banner} className='w-[65rem] h-auto waspect-video'></video>
                </div>
                <CodeBlock head = {{first : "Unlock your", highlighted : "coding potential", last : "with our online courses."}}
                 subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                 btn1 = {{text : "Try it Yourself", link : "/login"}}
                 btn2 = {{text : "Learn More", link : "/signup"}}
                 codeBlock={'<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>'}
                 postion={"lg:flex-row"} codeColor={"text-yellow-50"} gradiant={'left'}/>

                <CodeBlock head = {{first : "Start", highlighted : <>coding<br />in seconds</>, last : ""}}
                 subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                 btn1 = {{text : "Continue Lesson", link : "/login"}}
                 btn2 = {{text : "Learn More", link : "/signup"}}
                 codeBlock={'import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;'}
                 postion={"lg:flex-row-reverse"} codeColor={"text-pink-50"} gradiant={'right'}/>
                 
                 <ExploreMore/>
            </div>
        {/* section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700 pb-[5.62rem]'>
                <div className='homepage_bg h-[20rem]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col justify-center items-center mx-auto h-full'>
                        {/* <div className='h-[150px]'></div> */}
                        <div className='flex gap-6 mt-8'>
                            <Button text={'Explore Full Catalog'} active={true} showArrow={true} linkTo={'/login'}/>
                            <Button text={'Learn More'} active={false} linkTo={'/signup'}/>
                        </div>
                    </div>

                </div>
                <div className='w-11/12 max-w-maxContent flex flex-col pt-[5.62rem] gap-12 justify-between items-center mx-auto '>
                    <div className='font-inter flex gap-12'>
                        <div className='text-4xl font-semibold'>
                            Get the skills you need for a <HighLightText text={'job that is in demand.'}/>
                        </div>
                        <div className='flex flex-col items-start gap-9 font-bold'>
                            <p className='text-base font-medium pr-8'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <Button text={'Learn More'} active={true} linkTo={'/signup'}/>
                        </div>
                    </div>
                    <TimeLineSection/>
                    <LearninglanguageSection/>
                </div>
            </div>
        {/* section 3 */}
            <div className='flex w-11/12 max-w-maxContent font-inter gap-24 py-[5.62rem] mx-auto items-center'>
                <div className="relative h-full z-20 shadow-[20px_20px_0px_0px_#FFF]">
                    <img  src={Instructor} alt="" />
                </div>
                <div className='gap-3 flex flex-col'>
                    <p className='font-semibold text-4xl tracking-tight text-richblack-5'>Become an <br /> <HighLightText text={'instructor'}/></p>
                    <p className='font-medium text-base text-richblack-300'>Instructors from around the world teach millions of students on <br /> StudyNotion. We provide the tools and skills to teach what you <br /> love.</p>
                    <div className='flex items-start pt-14'>
                        <Button text={'Start Teaching Today'} active={true} showArrow={true} linkTo={'/signup'} />
                    </div>
                </div>
            </div>
            <div className='flex w-11/12 max-w-maxContent font-inter gap-[3.25rem] py-[5.62rem] mx-auto items-center flex-col'>
                <p className='w-full text-center text-4xl text-richblack-5 font-semibold -tracking-tight'>Reviews from other learners</p>
                <ReviewViewer compContent={ratingReview}/>
            </div>
        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Home