import { useVerifyOtpMutation } from '@/Redux/apis/authSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define types for the form data and errors
interface FormData {
  otp: string;
}

interface FormErrors {
  otp?: string;
}

const Otp = () => {
  const [formData, setFormData] = useState<FormData>({
    otp: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate()
  const [verify,] = useVerifyOtpMutation()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Restrict input to only 6 digits
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
    // Clear the error for the field as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      const promise = verify({ code: formData.otp, email: localStorage.getItem("email") }).unwrap()
      toast.promise(
        promise,
        {
          loading: 'Verifying OTP...',
          success: (res) => res?.message || 'OTP verified successfully!',
          error: (err) => err?.data?.message || 'OTP verification failed!',
        }
      )
      promise.then((res) => {
        const from = localStorage.getItem("from")
        if (from == "signUp") {
          localStorage.setItem('token', JSON.stringify(res?.data?.token))
          localStorage.removeItem("from")
          localStorage.removeItem("email")
          navigate("/")
        } else {
          navigate("/reset")
        }
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
        <h1 className='text-3xl font-bold text-center mb-6'>Verify OTP</h1>
        <p className='text-center text-gray-600 mb-6'>Please enter the 6-digit code sent to your email address.</p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='otp'>Verification Code</label>
            <input
              type='text'
              id='otp'
              name='otp'
              value={formData.otp}
              onChange={handleChange}
              placeholder='_ _ _ _ _ _'
              maxLength={6}
              className={`mt-1 block w-full px-4 py-2 text-center text-2xl font-mono tracking-[0.5em] rounded-lg border ${getInputBorderClass('otp')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200'
          >
            Verify
          </button>
        </form>
        <div className='text-center text-sm mt-4'>
          <p className='text-gray-600'>Didn't receive the code?</p>
          <a href='#' className='text-blue-600 hover:underline'>Resend Code</a>
        </div>
        <div className='text-center text-sm mt-2'>
          <a href='#' className='text-blue-600 hover:underline'>Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default Otp;
