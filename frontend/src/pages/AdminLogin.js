import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import the custom hook
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate('/admin/dashboard'); // Redirect to the admin dashboard upon successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/register')} // Navigate to the registration page
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/')} // Navigate to the home page
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;