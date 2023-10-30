import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseSlice';

function SidebarLink({link, iconName}) {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch()
    
    const currentPath = location.pathname
    const matchRoute = (route) => {
        return matchPath({ path: route }, currentPath);
    };

  return (
    <NavLink to={link.path} onClick={()=>dispatch(resetCourseState())}>
        <div className={`px-6 py-2 flex gap-3 text-richblack-300 ${matchRoute(link.path) && 'text-yellow-50 bg-yellow-800 border-l-2 border-yellow-50'}`}>
            <Icon/>
            <p className='text-sm font-medium'>{link.name}</p>
        </div>
    </NavLink>
  )
}

export default SidebarLink