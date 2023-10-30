import React, {useState} from 'react'
import {HomePageExplore} from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import user from '../../../assets/Images/user.svg'
import chart_tree from '../../../assets/Images/chart_tree.svg'


function ExploreMore() {

    const [currentTag, setCurrentTag] = useState(HomePageExplore[0].tag);
    const [columnClick, setColumnClick] = useState(0);
    const {courses} = HomePageExplore.filter((element) => element.tag === currentTag)[0];

  return (
    <div className='flex flex-col gap-9 mb-5 items-center font-inter relative pb-[17rem]'>
        <div className='flex flex-col gap-2 items-center'>
            <p className='text-4xl text-richblack-5 font-semibold '>Unlock the <HighLightText text={'Power of Code'}/></p>
            <p className='text-base text-richblack-300 font-medium'>Learn to Build Anything You Can Imagine</p>
        </div>
        <div className='flex justify-center bg-richblack-800 rounded-full p-1 gap-2 w-auto'>
            {
                HomePageExplore.map((element)=>(
                    <button onClick={()=>setCurrentTag(element.tag)} className={`text-richblack-200 text-base font-medium px-[1.125rem] py-[0.375rem] rounded-full transition-all duration-100 ${element.tag === currentTag ? 'bg-richblack-900 text-white' : ''} hover:bg-richblack-900 text-white`}>{element.tag}</button>
                ))
            }
        </div>
        <div className='flex py-12 pt-8 gap-[2.25rem] absolute top-44'>
            {
                courses.map((course, index)=>(
                    <div onClick={()=>{setColumnClick(index)}} className={`flex flex-col justify-between h-[19rem] w-[23rem] bg-richblack-800 transition-all duration-200 cursor-pointer ${index===columnClick ? 'bg-white text-richblack-800 shadow-[12px_12px_0px_0px_#FFD60A]' : ""}`}>
                        <div className='px-6 py-8 flex flex-col gap-3'>
                            <p className='text-lg font-semibold -tracking-tight'>{course.heading}</p>
                            <p className='text-base text-richblack-300'>{course.description}</p>
                        </div>
                        <div className={`flex px-6 py-4 justify-between border-t-2 border-richblack-600 border-dashed ${index===columnClick ? 'text-blue-500' : ""}`}>
                            <div className='flex gap-1'>
                                <img src={user} alt="" />
                                <p>{course.level}</p>
                            </div>
                            <div className='flex gap-1'>
                                <img src={chart_tree} alt="" />
                                <p>{course.lessionNumber} Lessons</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ExploreMore