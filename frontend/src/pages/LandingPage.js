import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Suite Portal</h1>
      <div className="flex space-x-4">
        <Link to="/maintenance" className="px-4 py-2 bg-blue-500 text-white rounded">Normal User</Link>
        <Link to="/admin/login" className="px-4 py-2 bg-green-500 text-white rounded">Admin</Link>
      </div>
    </div>
  );
};

export default LandingPage;