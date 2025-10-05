import { useForgetEmailPostMutation } from '@/Redux/apis/authSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define types for the form data and errors
interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const Forget = () => {
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  const navigate=useNavigate()
  const [forgetEmailPost,{isLoading}]=useForgetEmailPostMutation()
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      const promise=forgetEmailPost(formData).unwrap()
      toast.promise(
        promise,
        {
          loading: 'Sending email...',
          success: (res) => res?.message || 'Email sent successfully!',
          error: (err) => err?.data?.message || 'Failed to send email!',
        }
      );
      promise.then((res) => {
        localStorage.setItem("email",formData.email)
        localStorage.setItem("from","forget")
        navigate("/otp")
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
        <h1 className='text-3xl font-bold text-center mb-6'>Forgot Password</h1>
        <p className='text-center text-gray-600 mb-6'>Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className={`mt-1 block w-full px-4 py-2 rounded-lg border ${getInputBorderClass('email')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200'
          >
            Submit
          </button>
        </form>
        <div className='text-center text-sm mt-4'>
          Remember your password? <a href='#' className='text-blue-600 hover:underline'>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Forget;
