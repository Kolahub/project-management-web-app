import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-amber-200 flex justify-center items-center px-3">
      <div className="max-w-xl px-8 py-12 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl sm:4xl font-bold text-gray-800 mb-4">Welcome to Your Project Management App</h1>
        <p className="text-lg text-gray-600 mb-8">Manage your projects efficiently with ease.</p>
        <Link to='/signup'>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Get Started
        </button>
        </Link>

      </div>
    </div>
  );
};

export default LandingPage;
