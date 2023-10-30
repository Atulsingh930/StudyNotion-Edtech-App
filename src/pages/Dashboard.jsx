import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import { sidebarLinks } from '../data/dashboard-links';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constants';

function Dashboard() {

  const location = useLocation();
  const currentPath = location.pathname;
  const {name, type} = sidebarLinks.filter((element)=>element.path===currentPath)[0] || {};
  const {loading : profileLoading}= useSelector((state)=>state.profile);
  const {loading : authLoading}= useSelector((state)=>state.auth);
  console.log(currentPath.split('/')[1])

  if(profileLoading || authLoading){
    toast.loading('Loading')
  }
  return (
  <div className='flex'>
      <Sidebar/>
      <div className={`pl-[13.875rem] pt-14 min-h-[calc(100vh-3.5rem)] w-[calc(100vw-13.875rem)]`}>
        {
          (type !== (ACCOUNT_TYPE.INSTRUCTOR || null) && currentPath.split('/')[2] !== 'edit-courses') && (        
          <div className='w-full p-6 flex flex-col items-start gap-3'>
          <div className='flex gap-2 text-richblack-200 text-sm'>
            <p>Home</p>
            <p>/</p>
            <p>Dashboard</p>
            <p>/</p>
            <p className='text-yellow-50 font-medium'>{name}</p>
          </div>
          <p className='text-3xl font-medium text-richblack-5'>{name === 'Cart'? `My ${name}` : name}</p>
          <p></p>
        </div>)
        }
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard