import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const Navbar = ({ onLogout, onProfileClick }) => (
  <nav className="bg-red-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <a href='/user/home' className="text-white text-lg font-bold">BloodBridge</a>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Button onClick={onLogout} className="mr-2">Logout</Button>
          <button
            onClick={onProfileClick}
            className="bg-red-700 p-2 rounded-full text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="sr-only">View profile</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const DetailCard = ({ title, value, icon }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const BloodBankDetailPage = () => {
  const [bloodBank, setBloodBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBloodBank = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${id}`);
        setBloodBank(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blood bank details');
        setLoading(false);
      }
    };

    fetchBloodBank();
  }, [id]);

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

  const handleProfileClick = () => {
    navigate('/user/profile');
  };

  const handleDonateBlood = () => {
    const token = localStorage.getItem('token');
    if(token){
      try{
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
        if(bloodBank && userId)
          {
            navigate(`/user/donation_form/${userId}/${bloodBank._id}`);
          }
          else{
            toast.error("Unable to process");
          }
      }catch(e){
        console.error("Error",e);
        toast.error("Currently Not Available");
      }
    }    
  };

  const handleRequestBlood = () => {
    toast.info("Blood request feature coming soon!");
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} onProfileClick={handleProfileClick} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Blood Bank Details</h1>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailCard 
              title="Institution Name" 
              value={bloodBank.institution_name}
              icon={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>}
            />
            <DetailCard 
              title="Email" 
              value={bloodBank.email}
              icon={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
            />
            <DetailCard 
              title="Street No" 
              value={bloodBank.location.street_no}
              icon={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>}
            />
            <DetailCard 
              title="City" 
              value={bloodBank.location.city}
              icon={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>}
            />
            <DetailCard 
              title="State" 
              value={bloodBank.location.state}
              icon={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>}
            />
            <DetailCard 
              title="Contact Number" 
              value={bloodBank.contact_number}
              icon={<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>}
            />
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={handleDonateBlood}>Donate Blood</Button>
            <Button onClick={handleRequestBlood} variant="outline">Request Blood</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BloodBankDetailPage;