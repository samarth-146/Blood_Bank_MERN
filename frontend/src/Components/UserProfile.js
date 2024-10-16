import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Button = ({ children, className, variant = 'primary', onClick }) => {
  const baseStyle = "px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50",
    plain: "bg-white text-black"
  };

  const buttonClass = `${baseStyle} ${variants[variant]} ${className || ''}`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

const Navbar = ({ onLogout }) => (
  <nav className="bg-red-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <a href="/user/home" className="text-white text-lg font-bold">BloodBridge</a>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Button onClick={onLogout} className="mr-2">Logout</Button>
        </div>
      </div>
    </div>
  </nav>
);

const ProfileField = ({ label, value, icon }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-500">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value || 'Not provided'}</p>
    </div>
  </div>
);

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bloodDonations,setBloodDonations]=useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(`http://localhost:8080/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
          if (response.data.blood_donation.length > 0) {
            const bloodDonationPromises = response.data.blood_donation.map(bloodDonationId =>
              axios.get(`http://localhost:8080/blood_donation/${bloodDonationId}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            );
            const bloodDonationResponses = await Promise.all(bloodDonationPromises);
            setBloodDonations(bloodDonationResponses.map(res => res.data));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user profile. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('You are not logged in. Please log in to view your profile.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/user/logout');
      localStorage.removeItem('token');
      toast.success("Logged Out Successfully");
      navigate('/user/signin');
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-red-600">
              <h1 className="text-3xl font-bold text-white">User Profile</h1>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField 
                  label="Name" 
                  value={user.name} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                />
                <ProfileField 
                  label="Email" 
                  value={user.email} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                />
                <ProfileField 
                  label="Blood Type" 
                  value={user.blood_type} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                />
                <ProfileField 
                  label="Contact Number" 
                  value={user.contact_number} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                />
                <ProfileField 
                  label="Street No" 
                  value={user.address?.street_no} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <ProfileField 
                  label="Apartment Name" 
                  value={user.address?.apartment_name} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
                <ProfileField 
                  label="City" 
                  value={user.address?.city} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                />
                <ProfileField 
                  label="State" 
                  value={user.address?.state} 
                  icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>}
                />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-gray-700">Blood Donation Records</h2>
              {bloodDonations.length > 0 ? (
                <div className="mt-4">
                  {bloodDonations.map((donation) => (
                    <div key={donation._id} className="bg-gray-200 p-4 mb-4 rounded-lg shadow">
                      <p className="font-bold">Donation Date: {new Date(donation.donation_date).toLocaleDateString()}</p>
                      <p className="text-gray-600">Admin ID: {donation.admin_id}</p>
                      <p className="text-gray-600">Status {donation.status}</p>
                      <p className="text-gray-600">Created At: {new Date(donation.created_at).toLocaleDateString()}</p>
                      <p className="text-gray-600">Updated At: {new Date(donation.updated_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-600">No blood donation records found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}