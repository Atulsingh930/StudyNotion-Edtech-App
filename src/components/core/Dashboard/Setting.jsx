import React from 'react'
import ProfileImageUploader from './Setting/ProfileImageUploader';
import ProfileDetailsUpdater from './Setting/ProfileDetailsUpdater';
import ChangePassword from './Setting/ChangePassword';
import DeleteAccount from './Setting/DeleteAccount';

function Setting() {
  return (
    <div className='flex flex-col gap-6 items-start py-6 ml-[7.5rem] w-[49rem] box-border'>
        <ProfileImageUploader/>
        <ProfileDetailsUpdater/>
        <ChangePassword/>
        <DeleteAccount/>
    </div>
  )
}

export default Setting