import React, { useEffect } from 'react'
import RenderSteps from './RenderSteps'

function AddCourse() {

  return (
    <div className='flex gap-5 w-full justify-center ml-14 mt-5'>
        <div className='-ml-96'>
            <h1 className='text-3xl text-richblack-5 font-medium mt-6 mb-14'>Add Course</h1>
            <RenderSteps/>
        </div>
        <div>
            <div className='flex flex-col gap-5 w-[26rem] text-richblack-5 bg-richblack-800 rounded-lg p-6 fixed -z-10'>
                <p>⚡Course Upload Tips</p>
                <ol className='text-sm font-medium flex flex-col gap-[0.6875rem] list-disc pl-6'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ol>
            </div>
        </div>
    </div>
  )
}

export default AddCourse