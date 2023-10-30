import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import {FiLogOut} from 'react-icons/fi'
import LogoutPage from './LogoutPage'


function Sidebar() {
    const {user, loading : profileLoading} = useSelector((state)=>state.profile)
    const {loading : authLoading} = useSelector((state)=>state.auth)
    const [visible, setVisible] = useState(false);

    if(authLoading || profileLoading){
        return (
            <div>Loading....</div>
        )
    }

    function handleLogout(){
        setVisible(true)
    }



  return (
    <div className='h-[calc(100vh-3.5rem)] w-[13.875rem] py-[1.875rem] mt-[3.5rem] border-r border-solid border-richblack-800 flex flex-col gap-[0.625rem] items-center transition-all duration-150 fixed bg-richblack-800 z-10 '>
        <div className='w-full'>
            <SidebarLink link={sidebarLinks[0]} iconName={sidebarLinks[0].icon}/>
            {
                sidebarLinks.map((element, index)=>{
                    if(element.type !== user.accountType) return null;
                    return <SidebarLink link={element} iconName={element.icon} />
                })
            }
        </div>
        <div className='h-[0.0625rem] w-[11.875rem] bg-richblack-600'></div>
        <div className='w-full text-richblack-300'>
            <SidebarLink link={{name : 'Setting', path : "/dashboard/setting"}} iconName={'VscSettingsGear'}/>
            <div onClick={handleLogout} className='px-6 py-2 flex gap-3 cursor-pointer'>
                <FiLogOut/>
                <p className='text-sm font-medium'>Log Out</p>
            </div>
        </div>
        <div className={`${visible ? '' : 'invisible opacity-0'} fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[350px] flex justify-center items-center z-50 backdrop-blur-sm transition-all  bg-white duration-150`}>
            <LogoutPage setVisible={setVisible}/>
        </div>
        {/* <div className={`modal-container ${visible ? 'visible' : 'invisible'} `}>
            <div className="backdrop"></div>
            <div className="modal-content">
              <LogoutPage setVisible={setVisible}/>
            </div>
        </div> */}
        {visible && <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over'></div>}
    </div>
  )
}

export default Sidebar