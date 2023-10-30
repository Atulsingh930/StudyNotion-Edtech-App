import React, { useEffect, useState } from 'react'
import { fetchAllCategory, getCategoryPageDetails } from '../services/operations/courseDetailsApi'
import { useParams } from 'react-router-dom'
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/CourseCard';
import Footer from '../components/common/Footer'
import { useDispatch, useSelector } from 'react-redux';

function Catalog() {

    const courseTypes = [
        {
            id : 1,
            name : 'Most popular'
        },
        {
            id : 2,
            name : 'New'
        }
    ]
    
    const [categoryPageData, setCategoryPageData] = useState([]);
    const [categoryId, setCategoryID] = useState(null);
    const [courseSituation, setcourseSituation] = useState(1)
    const {loading} = useSelector((state)=>state.course)
    const {categoryName} = useParams();
    const dispatch = useDispatch()

    async function getCategoryIds(){
        const result = await fetchAllCategory();
        const categoryID = result?.filter((value)=>value.name.toLowerCase().split(' ').join('-')===categoryName)[0]._id;
        setCategoryID(categoryID);
    }

    async function getCategoryDeitails(){
        const result = await getCategoryPageDetails(categoryId, dispatch);
        if(result){
            setCategoryPageData(result)
        }
    }

    useEffect(() => {
        getCategoryIds();
    }, [categoryName])

    useEffect(() => {
        getCategoryDeitails();
    }, [categoryId])
    

  return (
    categoryPageData.length  < 1 || loading? (<div className='loader'></div>) : (
        <div className='flex flex-col gap-16'>
            <div className='w-full bg-richblack-800'>
                <div className='w-full max-w-maxContent mx-auto pt-20 p-8 flex gap-12'>
                    <div className='w-[54.375rem] flex flex-col gap-3'>
                        <div className='flex gap-2 items-center text-sm text-richblack-300 my-4'>
                            <p>Home</p>
                            <p>/</p>
                            <p>Catalog</p>
                            <p>/</p>
                            <p className='text-yellow-50'>{categoryPageData?.selectedCategory?.name}</p>
                        </div>
                        <p className='text-richblack-5 text-3xl'>{categoryPageData?.selectedCategory?.name}</p>
                        <p className='text-richblack-200 text-sm -tracking-tight'>{categoryPageData?.selectedCategory?.description}</p>
                    </div>
                    <div className='w-[17.625rem] flex flex-col items-start gap-3'>
                        <p className='text-lg font-semibold -tracking-tight'>Related resources</p>
                        <ul className='flex flex-col items-start gap-2 text-sm text-richblack-100 list-disc pl-4'>
                            <li>Doc {categoryPageData?.selectedCategory?.name}</li>
                            <li>Cheatsheets</li>
                            <li>Articles</li>
                            <li>Community Forums</li>
                            <li>Projects</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full max-w-maxContent mx-auto flex flex-col gap-10'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-2 items-start w-full border-b border-richblack-600'>
                        <p className='text-3xl ring-richblack-5 font-semibold'>Courses to get you started</p>
                        <div className='flex'>
                            {
                                courseTypes.map((courseType, index)=>(
                                <p onClick={()=>setcourseSituation(courseType.id)} key={courseType.id} className={`p-2 ${courseSituation===courseType.id ? 'text-yellow-100 border-b border-yellow-100' : 'text-richblack-200'} cursor-pointer transition-all duration-100`}>{courseType.name}</p>
                                ))
                            }
                        </div>
                    </div>
                    <CourseSlider coures={categoryPageData?.selectedCategory?.courses}/>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-2 items-start w-full'>
                        <p className='text-3xl ring-richblack-5 font-semibold'>{`Top courses in ${categoryPageData?.selectedCategory?.name}`}</p>
                    </div>
                    <CourseSlider coures={categoryPageData?.selectedCategory?.courses}/>
                </div>
                <div className='flex flex-col gap-10 items-start'>
                    <p className='text-3xl ring-richblack-5 font-semibold'>Frequently Bought Together</p>
                    <div className='flex flex-wrap justify-center gap-8'>
                    {
                        courseSituation===1 ? (categoryPageData?.topAllCourses?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((course, index)=>{
                            if(index>3){
                                return;
                            }return (<CourseCard course={course}/>)
                        })) : (categoryPageData?.topAllCourses?.map((course, index)=>{
                            if(index>3){
                                return;
                            }return (<CourseCard course={course}/>)
                        }))
                    }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
  )
}

export default Catalog