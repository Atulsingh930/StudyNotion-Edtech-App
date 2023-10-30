import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateProfileDetails } from '../../../../services/operations/profileApi';

function ProfileDetailsUpdater() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{user} = useSelector((state)=>state.profile);


    const {token} = useSelector((state)=>state.auth);
    const{firstName, lastName, email, additionalDetails} = user
    const [formData, setformData] = useState({
        firstName : firstName?firstName:null,
        lastName : lastName?lastName:null,
        email : email?email:null,
        gender : additionalDetails.gender?additionalDetails.gender:null,
        dateOfBirth : additionalDetails.dateOfBirth?additionalDetails.dateOfBirth.split('.').reverse().join('-'):null,
        contactNumber : additionalDetails.contactNumber?additionalDetails.contactNumber:null,
        about : additionalDetails.about?additionalDetails.about:null
    })

    function handleProfileDetailsUpdate(e){
        e.preventDefault()
        updateProfileDetails(formData, token, dispatch);
    }

    function handleCancel(){
        navigate('/dashboard/my-profile')
    }


  return (
    <form className='flex flex-col gap-8 items-end' onSubmit={handleProfileDetailsUpdate}>
        <div className='p-6 w-full bg-richblack-800 rounded-lg border border-richblack-700 flex gap-5 items-start flex-col'>
            <p>Profile Information</p>
            <div className='w-full flex justify-between gap-3'>
                <label className='flex flex-col gap-[0.375rem] items-start' htmlFor="">
                    <p className='text-sm text-richblack-5'>First Name</p>
                    <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg'  onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} value={formData.firstName} type="text" name="firstName" id="firstName" />
                    {
                        formData.firstName==='' && <span className='text-xs text-yellow-100'>First name is manditory</span>
                    }
                </label>
                <label className='flex flex-col gap-[0.375rem] items-start' htmlFor="">
                    <p className='text-sm text-richblack-5'>Last Name</p>
                    <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} value={formData.lastName} type="text" name="lastName" id="lastName" />
                    {
                        formData.lastName === '' && <span className='text-xs text-yellow-100'>Last Name is manditory</span>
                    }
                </label>
            </div>
            <div className='flex justify-between w-full'>
                <label className='flex flex-col gap-[0.375rem] items-start' htmlFor="">
                    <p className='text-sm text-richblack-5'>Date of Birth</p>
                    <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} value={formData.dateOfBirth} type="date" name="dateOfBirth" id="dateOfBirth" />
                    {
                        formData.email === '' && <span className='text-xs text-yellow-100'>Email is manditory</span>
                    }
                </label>
                <label className='flex flex-col gap-[0.375rem] items-start' htmlFor="">
                    <p className='text-sm text-richblack-5'>Gender</p>
                    {/* <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} value={formData.gender} type="text" name="gender" id="" /> */}
                    <select className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' name="gender" defaultValue={formData.gender?formData.gender:'None'} onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} id="gender">
                        <option value="none">None</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                        <option value="Other">Other</option>
                    </select>
                    {
                        formData.gender === 'none' && <span className='text-xs text-yellow-100'>Gender is manditory</span>
                    }
                </label>
            </div>
            <div className='flex justify-between w-full'>
                <label className='flex flex-col gap-[0.375rem] items-start' htmlFor="">
                    <p className='text-sm text-richblack-5'>Contact Number</p>
                    <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} value={formData.contactNumber} type="text" name="contactNumber" placeholder='Enter your Phone Number' />
                    {
                        (formData.contactNumber+'').length !== 10 ? (<span className='text-xs text-yellow-100'>Conatct Number is Invalid</span>) : (<div></div>)
                    }
                    {
                        formData.contactNumber === '' && <span className='text-xs text-yellow-100'>Conatct Number is manditory</span>
                    }
                </label>
                <label className='flex flex-col gap-[0.375rem] items-start' htmlFor="">
                    <p className='text-sm text-richblack-5'>About</p>
                    <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' onChange={(e)=>setformData({...formData, [e.target.name] : e.target.value})} value={formData.about} type="text" name="about" id="about" placeholder='Enter your About' />
                    {
                        formData.about === '' && <span className='text-xs text-yellow-100'>About is manditory</span>
                    }
                </label>
            </div>
        </div>
        <div className='flex gap-4'>
            <div className='px-6 py-3 rounded-lg bg-richblack-800 text-richblack-5 font-medium cursor-pointer' onClick={handleCancel}>
                Clear
            </div>
            <button className='px-6 py-3 rounded-lg bg-yellow-50 text-richblack-800 font-medium'>
                Save
            </button>
        </div>
    </form>
  )
}

export default ProfileDetailsUpdater