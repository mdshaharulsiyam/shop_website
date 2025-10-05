import { useResetPasswordMutation } from '@/Redux/apis/authSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define types for the form data and errors
interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {  
  password?: string;
  confirmPassword?: string;
}

const Reset = () => {
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });
  const navigate=useNavigate()
  const [resetPassword,{isLoading}]=useResetPasswordMutation()
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear the error for the field as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      const promise=resetPassword(formData).unwrap()
      toast.promise(
        promise,
        {
          loading: 'Resetting password...',
          success: (res) => res?.message || 'Password reset successfully!',
          error: (err) => err?.data?.message || 'Failed to reset password!',
        }
      );
      promise.then((res) => {
        navigate("/login")
      })
    } else {
      console.log('Form validation failed.');
    }
  };

  const getInputBorderClass = (field: keyof FormData): string => {
    return isSubmitted && errors[field] ? 'border-red-500' : 'border-gray-300';
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6'>Reset Password</h1>
        <p className='text-center text-gray-600 mb-6'>Create a new password for your account.</p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700' htmlFor='password'>New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter a new password'
              className={`mt-1 block w-full pr-10 px-4 py-2 rounded-lg border ${getInputBorderClass('password')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-gray-600'
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.958 12h.002a10.51 10.51 0 013.88 4.298m9.407-1.071a10.468 10.468 0 011.89-4.299m-1.89 4.299a10.468 10.468 0 003.88-4.299m-1.89 4.299A10.476 10.476 0 0112 18.223m-1.071-9.407a3.5 3.5 0 11-4.299-1.89" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.182.001.03.001.06 0 .092-.003.06-.003.12 0 .182s.003.12-.001.182l-.001.002c-1.388 4.172-5.325 7.182-9.963 7.182-4.639 0-8.576-3.01-9.964-7.182z" />
                </svg>
              )}
            </button>
          </div>
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>Confirm New Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your new password'
              className={`mt-1 block w-full pr-10 px-4 py-2 rounded-lg border ${getInputBorderClass('confirmPassword')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-gray-600'
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.958 12h.002a10.51 10.51 0 013.88 4.298m9.407-1.071a10.468 10.468 0 011.89-4.299m-1.89 4.299a10.468 10.468 0 003.88-4.299m-1.89 4.299A10.476 10.476 0 0112 18.223m-1.071-9.407a3.5 3.5 0 11-4.299-1.89" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.182.001.03.001.06 0 .092-.003.06-.003.12 0 .182s.003.12-.001.182l-.001.002c-1.388 4.172-5.325 7.182-9.963 7.182-4.639 0-8.576-3.01-9.964-7.182z" />
                </svg>
              )}
            </button>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200'
          >
            Reset Password
          </button>
        </form>
        <div className='text-center text-sm mt-4'>
          <a href='#' className='text-blue-600 hover:underline'>Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default Reset;
