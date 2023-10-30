import React, { useEffect, useState } from 'react'
import {RxCross2} from 'react-icons/rx'

function CourseTagsChips({name, setValue, tagData, register, errors}) {

    const [tags, setTags] = useState('');
    const [tagsList, setTagsList] = useState([])

    useEffect(() => {
        register(
            name, {
                required : true
            }
        )
        if(tagData){
            setTagsList(tagData);
        }
    }, [])

    useEffect(() => {
        setValue(name, tagsList);
    }, [tagsList.length])
    
    

    function handleKeyPress(event){
        if(event.key==='Enter' || event.key===','){
            event.preventDefault()
            if(tags && !tagsList.includes(tags)){
                setTagsList([...tagsList, tags]);
                setTags('')
            }
        }
    }

    function handleCancel(index, event){
        event.preventDefault()
        const updatedTagsList = [...tagsList];
        updatedTagsList.splice(index, 1);
        setTagsList(updatedTagsList);
    }

  return (
    <div className='flex flex-col gap-2'>
        <label className='text-sm text-richblack-5' htmlFor="courseTag">Tags<sup className='text-pink-200'>*</sup></label>
        <div className='flex flex-wrap w-full'>
            {
                tagsList.map((tag, index)=>(
                    <div key={index} className='flex gap-1 bg-yellow-400 rounded-2xl px-2 py-1 m-1 text-sm text-r'>
                        <p>{tag}</p>
                        <button onClick={(e)=>handleCancel(index, e)}>
                            <RxCross2/>
                        </button>
                    </div>
                ))
            }
        </div>
        <input
            id='courseTag'
            type="text"
            value={tags}
            onChange={(e)=>setTags(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Enter Course Tags and Enter'
            className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
            {
                errors.courseName && (
                    <span>Course Tags are required</span>
                )
            }
    </div>
  )
}

export default CourseTagsChips