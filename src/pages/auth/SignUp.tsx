import { auth } from '@/firebase/firebase.config';
import { useGoogleLoginMutation, usePostSignUpMutation } from '@/Redux/apis/authSlice';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

// Define types for the form data and errors
interface FormData {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()
  const [signUp] = usePostSignUpMutation()
  const [googleSignUp] = useGoogleLoginMutation()
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

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      const promise = signUp(formData).unwrap();
      toast.promise(
        promise,
        {
          loading: 'Signing up...',
          success: (res) => res?.message || 'Sign up successfully',
          error: (err) => err?.data?.message || 'Sign up failed',
        }
      );
      promise.then((_res) => {
        localStorage.setItem("email", formData.email)
        localStorage.setItem("from", "signUp")
        navigate("/otp")
      })
      // Here you would typically handle the login logic, e.g., API call to authenticate the user
    } else {
      console.log('Form validation failed.');
    }
  };

  const getInputBorderClass = (field: keyof FormData): string => {
    return isSubmitted && errors[field] ? 'border-red-500' : 'border-gray-300';
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-6'>Create an Account</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name'
              className={`mt-1 block w-full px-4 py-2 rounded-lg border ${getInputBorderClass('name')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
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
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='phone_number'>Phone Number</label>
            <input
              type='tel'
              id='phone_number'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              placeholder='Enter your phone number'
              className={`mt-1 block w-full px-4 py-2 rounded-lg border ${getInputBorderClass('phone_number')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              className={`mt-1 block w-full pr-10 px-4 py-2 rounded-lg border ${getInputBorderClass('confirmPassword')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-gray-600'
            >
              {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
            </button>
          </div>
          <button
            type='submit'
            className='cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200'
          >
            Submit
          </button>
        </form>
        <div className='text-center text-sm mt-4'>
          ALready have an account? <Link to={`/login`} className='text-blue-600 hover:underline'>Login</Link>
        </div>
        <div className='flex items-center justify-center my-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='px-4 text-gray-500 text-sm'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>
        <button
          className='w-full flex items-center justify-center bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 transition-colors duration-200'
          onClick={async () => {
            try {
              const provider = new GoogleAuthProvider()
              const result = await signInWithPopup(auth, provider)
              const user = result.user
              const idToken = await user.getIdToken()
              const payload = {
                name: user.displayName,
                email: user.email,
                img: user.photoURL ? [user.photoURL] : undefined,
                provider: 'GOOGLE',
                accessToken: idToken,
              } as any
              const promise = googleSignUp(payload).unwrap()
              toast.promise(promise, {
                loading: 'Signing in with Google...',
                success: (res) => res?.message || 'Login successful!',
                error: (err) => err?.data?.message || 'Google login failed!',
              })
              promise.then((res) => {
                const token = res?.token || res?.data?.token
                if (token) {
                  localStorage.setItem('token', JSON.stringify(token))
                  window.location.href = '/'
                }
              })
            } catch (e: any) {
              toast.error(e?.message || 'Google popup blocked or failed')
            }
          }}
        >
          <FcGoogle className='w-5 h-5 mr-2' />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
