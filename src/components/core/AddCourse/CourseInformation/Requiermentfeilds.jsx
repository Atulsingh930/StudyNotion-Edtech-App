import React, { useEffect, useState } from 'react'

function Requiermentfeilds({name, label, register, errors, setValue, reqData}) {
    const [requierment, setRequierment] = useState('');
    const [requiermentList, setRequiermentList] = useState([]);

    
    useEffect(() => {
        register(
            name,{
                required : true
            }
        )
        if(reqData){
            setRequiermentList(reqData)
        }
    }, [])

    useEffect(() => {
        setValue(name, requiermentList)
    }, [requiermentList])
    
    

    function handleRemoveRequierment(index){
        const updatedRequierment = [...requiermentList];
        updatedRequierment.splice(index, 1);
        setRequiermentList(updatedRequierment);
    }

    function handleAddRequierment(){
        if(requierment){
            const updatedRequierment = [...requiermentList, requierment]; 
            setRequiermentList(updatedRequierment);
            setRequierment('');
        }
    }

  return (
    <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-[0.375rem]'>
            <label className='flex flex-col gap-[0.375rem]'>
                <p className='text-sm text-richblack-5'>Requirements/Instructions<sup className='text-pink-200'>*</sup></p>
                <input
                id='courseName'
                type="text"
                onChange={(e)=>setRequierment(e.target.value)}
                value={requierment}
                placeholder='Enter Course Requirements & Instructions'
                className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
                {
                    errors.courseName && (
                        <span>Course Title is required</span>
                    )
                }
            </label>
            <p onClick={handleAddRequierment} className='text-yellow-50 font-bold px-2 py-1 cursor-pointer'>Add</p>
        </div>
        <div className='text-white'>
            {
                requiermentList.length>0 && requiermentList.map((element, index)=>(
                    <div className='flex gap-2 text-richblack-5' key={index}>
                        <p>{element}</p>
                        <button className='text-sm text-pure-greys-300' onClick={()=>handleRemoveRequierment(index)}>clear</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Requiermentfeilds