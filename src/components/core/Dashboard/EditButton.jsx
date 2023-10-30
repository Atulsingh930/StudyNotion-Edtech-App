import React from 'react'
import { Link } from 'react-router-dom'
import editIcon from '../../../assets/Images/editButton.svg'

function EditButton({name, path}) {
  return (
    <Link to={path}>
        <div className='px-5 py-2 text-lg text-richblack-900 font-medium shadow-[-0.5px_-1.5px_0px_0px_rgba(0_0_0_0.12)_inset rounded-lg flex gap-2 bg-yellow-50'>
            <img src={editIcon} alt="" />
            <p className='text-base'>{name}</p>
        </div>
    </Link>
  )
}

export default EditButton