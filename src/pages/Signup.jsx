import React from 'react'
import signUpImg from '../assets/Images/signup.webp'
import Template from '../components/core/Auth/Template'

function Signup() {
  return (
    <div className='w-full mx-auto'>
          <Template
          title="Join the millions learing to code with StydyNotion for free"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image={signUpImg}
          formType="signup"/>
    </div>
  )
}

export default Signup