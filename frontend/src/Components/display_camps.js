import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

const Navbar = ({ onSearch, onLogout, onProfileClick, onAllCampsClick }) => (
  <nav className="bg-red-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <a href='/user/home' className="text-white text-lg font-bold">BloodBridge</a>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <button onClick={onAllCampsClick} className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">
                All Camps
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search camps..."
              className="bg-red-700 text-white placeholder-red-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
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

const CampCard = ({ eventName, date, location, description }) => (
  <div
    className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{eventName}</h2>
    <p className="text-gray-600 mb-2"><b>Date:</b> {new Date(date).toLocaleDateString()}</p>
    <p className="text-gray-600 mb-2"><b>Location:</b> {location}</p>
    <p className="text-gray-600 mb-2"><b>Description:</b> {description}</p>
  </div>
);

const AllCampsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [camps, setCamps] = useState([]);
  const navigate = useNavigate();

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

  const handleAllCampsClick = () => {
    navigate('/user/all-camps');
  };


  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const res = await axios.get('http://localhost:8080/bloodcamp');
        setCamps(res.data);
      } catch (error) {
        console.error("Error fetching camps:", error);
        toast.error("Failed to fetch camps. Please try again later.");
      }
    };
    fetchCamps();
  }, []);

  const filteredCamps = camps.filter(camp =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        onSearch={setSearchTerm} 
        onLogout={handleLogout} 
        onProfileClick={handleProfileClick}
        onAllCampsClick={handleAllCampsClick}
      />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">All Blood Donation Camps</h1>
          {filteredCamps && filteredCamps.length > 0 ? (
            filteredCamps.map((camp, index) => (
              <CampCard
                key={index}
                eventName={camp.name}
                date={camp.date}
                location={camp.location}
                description={camp.description}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">No camps found matching your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllCampsPage;