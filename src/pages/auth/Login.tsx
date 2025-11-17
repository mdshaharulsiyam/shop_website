import { auth } from '@/firebase/firebase.config';
import { useGoogleLoginMutation, usePostLoginInofMutation } from '@/Redux/apis/authSlice';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

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
  const [login] = usePostLoginInofMutation()
  const [googleLogin] = useGoogleLoginMutation()
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
      const promise = login(formData).unwrap();
      toast.promise(
        promise,
        {
          loading: 'Logging in...',
          success: (res) => res?.message || 'Login successful!',
          error: (err) => err?.data?.message || 'Login failed!',
        }
      );

      promise.then((res) => {
        localStorage.setItem('token', JSON.stringify(res?.token))
        window.location.href = "/";
      })
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
              {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
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
          Don't have an account? <Link to={`/sign-up`} className='text-blue-600 hover:underline'>Sign up</Link>
        </div>
        <div className='flex items-center justify-center my-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='px-4 text-gray-500 text-sm'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>
        <div className='flex items-center justify-center'>
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
                // console.log(payload)
                // return
                const promise = googleLogin(payload).unwrap()
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
    </div>
  );
};

export default Login;
