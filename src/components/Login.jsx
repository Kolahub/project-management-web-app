// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from './firebase.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [signInDetails, setSignInDetails] = useState({
        email: '',
        password: ''
    })

   function handleChange (e) {
    setSignInDetails(prevState => {
        const { name, value } = e.target
        return {
            ...prevState, 
            [name]: value
        }
    })
    }

  const navigate = useNavigate()

  const auth = getAuth()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const res = await signInWithEmailAndPassword(auth, signInDetails.email, signInDetails.password);
    const UserLog = res.user
    onAuthStateChanged(auth, (user) => {
        if(user) {
            navigate('/dashboard')
        }
    })
    console.log(UserLog, '⭐⭐LOGGED IN');
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brown-100 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-brown-700">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-brown-300 placeholder-brown-500 text-brown-900 rounded-t-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-brown-300 placeholder-brown-500 text-brown-900 rounded-b-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-700 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
            >
              Login
            </button>

            <div className="mt-4 flex justify-end">
                <div className="inline-block">
                <span>Don't Have an account?</span>
                {" "}<Link to='/signup'><button className='hover:text-amber-700'>Signup</button></Link>
                    </div>
          
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
