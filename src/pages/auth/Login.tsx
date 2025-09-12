import React, { useState } from 'react';

// Define types for the form data and errors for a login screen
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      console.log('Login submitted successfully:', formData);
      // Here you would typically handle the login logic, e.g., API call to authenticate the user
    } else {
      console.log('Form validation failed.');
    }
  };

  const getInputBorderClass = (field: keyof FormData): string => {
    return isSubmitted && errors[field] ? 'border-red-500' : 'border-gray-300';
  };

  return (
    <div className='flex items-center justify-center min-h-screen  p-4'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6'>Log In</h1>
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
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700' htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className={`mt-1 block w-full pr-10 px-4 py-2 rounded-lg border ${getInputBorderClass('password')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-gray-600'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.958 12h.002a10.51 10.51 0 013.88 4.298m9.407-1.071a10.468 10.468 0 011.89-4.299m-1.89 4.299a10.468 10.468 0 003.88-4.299m-1.89 4.299A10.476 10.476 0 0112 18.223m-1.071-9.407a3.5 3.5 0 11-4.299-1.89" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.182.001.03.001.06 0 .092-.003.06-.003.12 0 .182s.003.12-.001.182l-.001.002c-1.388 4.172-5.325 7.182-9.963 7.182-4.639 0-8.576-3.01-9.964-7.182z" />
                )}
              </svg>
            </button>
          </div>
          <div className='flex justify-end text-sm mt-2'>
            <a href='#' className='text-blue-600 hover:underline'>Forgot Password?</a>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200'
          >
            Log In
          </button>
        </form>
        <div className='text-center text-sm mt-4'>
          Don't have an account? <a href='#' className='text-blue-600 hover:underline'>Sign up</a>
        </div>
        <div className='flex items-center justify-center my-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='px-4 text-gray-500 text-sm'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>
        <button
          className='w-full flex items-center justify-center bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 transition-colors duration-200'
        >
          <svg className='w-5 h-5 mr-2' viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.284v3.696h5.312c-.22.426-.93 1.93-2.66 3.32-1.74 1.4-4.45 2.58-7.39 2.58-5.32 0-9.67-4.35-9.67-9.67s4.35-9.67 9.67-9.67c2.94 0 5.65 1.18 7.39 2.58 1.73 1.39 2.44 2.89 2.66 3.32h-5.312z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
