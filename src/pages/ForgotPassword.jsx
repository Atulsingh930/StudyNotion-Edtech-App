import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Button from '../components/core/HomePage/Button';
import { forgotPassword } from '../services/operations/authApi';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSumbit = () => {
      dispatch(forgotPassword(email, setEmailSent));
  };

  const renderEmailSent = () => (
    <div className='flex flex-col gap-9 w-[31.75rem] p-8 absolute mb-16'>
      <div className='flex flex-col gap-3'>
        <p className='font-semibold text-3xl text-richblack-5'>Check email</p>
        <p className='font-base text-lg text-richblack-100'>{`We have sent the reset email to ${email}`}</p>
      </div>
      <div className='flex flex-col gap-3 w-full'>
        <button onClick={handleSumbit}>
          <Button text={'Resend email'} active={true} />
        </button>
        <div className='flex gap-3 items-center w-full'>
          <BsArrowLeft />
          <Link to={'/login'}>
            <p>Back to login</p>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderEmailForm = () => (
    <div className='flex flex-col gap-6 w-[31.75rem] p-8 absolute'>
      <div className='flex flex-col gap-3'>
        <p className='font-semibold text-3xl text-richblack-5'>Reset your password</p>
        <p className='font-base text-lg text-richblack-100'>
          Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery
        </p>
      </div>
      <div className='flex flex-col gap-[0.375rem]'>
        <label className='text-sm text-richblack-5' htmlFor='userEmail'>
          Email Address<span className='text-pink-200'>*</span>
        </label>
        <input
          className='w-full p-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-[_0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset] border-none'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='userEmail'
          placeholder='Enter Email Address'
          required
        />
      </div>
      <div className='flex flex-col gap-3 w-full'>
        <button onClick={handleSumbit}>
          <Button text={'Learn More'} active={true} />
        </button>
        <div className='flex gap-3 items-center w-full'>
          <BsArrowLeft />
          <Link to={'/login'}>
            <p>Back to login</p>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className='w-full h-[90vh] relative flex flex-col justify-center items-center font-inter'>
      {!loading ? (emailSent ? renderEmailSent() : renderEmailForm()) : (<div className='loader'></div>)}
    </div>
  );
}

export default ForgotPassword;
