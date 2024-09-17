import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch maintenance requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get('/maintenance', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // Close a ticket
  const closeTicket = async (id) => {
    try {
      await axios.put(
        `/maintenance/close/${id}`,
        { status: 'closed' },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchRequests();
    } catch (error) {
      console.error('Error closing ticket:', error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Maintenance Requests</h3>
          <ul>
            {requests.map((request) => (
              <li key={request.id} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">{request.name}</span>
                  <FontAwesomeIcon
                    icon={request.status === 'Open' ? faTimesCircle : faCheckCircle}
                    className={`text-xl ${request.status === 'Open' ? 'text-red-600' : 'text-green-600'}`}
                  />
                </div>
                <p className="text-gray-700"><strong>Email:</strong> {request.email}</p>
                <p className="text-gray-700"><strong>Unit Number:</strong> {request.unitNumber}</p>
                <p className="text-gray-700"><strong>Service Type:</strong> {request.serviceType}</p>
                <p className="text-gray-700"><strong>Summary:</strong> {request.summary}</p>
                <p className="text-gray-700"><strong>Details:</strong> {request.details}</p>
                {request.status === 'Open' && (
                  <button
                    onClick={() => closeTicket(request.id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Close Ticket
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;