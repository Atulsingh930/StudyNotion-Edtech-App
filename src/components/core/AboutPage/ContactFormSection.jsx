import React from 'react'
import ContactUsFormSection from '../../ContactPage/ContactUsFormSection'

function ContactFormSection() {

  return (
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center pt-[5.625rem]'>
        <div className='flex flex-col gap-8 w-[37.5rem]'>
            <div className='flex flex-col items-center gap-3'>
                <p className='text-4xl text-richblack-5 font-semibold'>Get in Touch</p>
                <p className='font-medium text-richblack-100'>We’d love to here for you, Please fill out this form.</p>
            </div>
            <div className='p-8'>
                <ContactUsFormSection/>
            </div>
        </div>
    </div>
  )
}

export default ContactFormSection