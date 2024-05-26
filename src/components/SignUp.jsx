// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from './firebase.js';
import { getFirestore, doc, setDoc}from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Signup = () => {
const [signupDetails, setSignupDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
})

const navigate = useNavigate();

const auth = getAuth()
const db = getFirestore()

  function handleChange(e) {
    setSignupDetails (prevState => {
        const {name, value} = e.target
        return {
            ...prevState,
            [name]: value
        }
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
     const res = await createUserWithEmailAndPassword(auth, signupDetails.email, signupDetails.password);
     const userLog = res.user
     const userRef = doc(db, 'UserInfo', userLog.uid)
     setDoc(userRef, {
        firstName: signupDetails.firstName,
        lastName: signupDetails.lastName,
        email: signupDetails.email,
        imgUrl: '',
        projectsState: {seletedProjectId: 0, projects: []}
     })
     onAuthStateChanged(auth, (user) => {
        if(user) {
            navigate('/dashboard')
        }
     })
     console.log(userLog);
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brown-100 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-brown-700">Sign Up</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignup} >

          <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
          <div className='flex gap-3 md:gap-1 flex-col md:flex-row w-full'>
            <div className="flex-1">
            <label htmlFor="first-name" className="sr-only">Email address</label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                required
                autoComplete='first-name'
                // autoComplete={true}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-brown-300 placeholder-brown-500 text-brown-900 rounded-t-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                placeholder="Enter your first name"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex-1">
            <label htmlFor="last-name" className="sr-only">Email address</label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                required
                autoComplete='last-name'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-brown-300 placeholder-brown-500 text-brown-900 rounded-t-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                placeholder="Enter your last name"
                onChange={(e) => handleChange(e)}
              />
            </div>

            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                autoComplete='email'
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
              Sign Up
            </button>

            <div className="mt-4 flex justify-end">
                <div className="inline-block">
                <span>Already signed up?</span>
                {" "}<Link to='/login'><button className='hover:text-amber-700'>Login</button></Link>
                    </div>
          
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
