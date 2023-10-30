import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";


function Button({text, active, linkTo, clickHandler, showArrow=false}) {
  return (
    <Link to={linkTo}>
        <button type='' onClick={clickHandler} className={`px-5 py-3 w-full flex gap-2 text-center justify-center items-center ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-800 text-richblack-5"} font-medium text-base rounded-lg drop-shadow-xl transition-all duration-200 hover:scale-95 btnShadow`}>
            {text}{showArrow ? <FaArrowRight className='text-sm'/> : ""}
        </button>
    </Link>
  )
}

export default Button