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
              placeholder="Search blood banks..."
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

const BloodBankCard = ({ id, institution_name, location, contact_number, onClick }) => (
  <div
    className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    onClick={() => onClick(id)}
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{institution_name}</h2>
    <span className="text-gray-600 mb-4"><b>Street-No: </b>{location.street_no}</span><br />
    <span className="text-gray-600 mb-4"><b>City: </b>{location.city}</span><br />
    <span className="text-gray-600 mb-4"><b>State: </b>{location.state}</span>
    <p className="text-gray-600 mb-4"><b>Contact:</b> {contact_number}</p>
  </div>
);

const BloodBankListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodBanks, setBloodBanks] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/user/logout');
      localStorage.removeItem('token');
      toast.success("Logged Out Successfully");
      navigate('/user/signin');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleProfileClick = () => {
    navigate('/user/profile');
  };

  const handleBloodBankClick = (id) => {
    navigate(`/user/bankdetails/${id}`);
  };

  const handleAllCampsClick = () => {
    navigate('/user/all-camps');
  };

  useEffect(() => {
    const fetchbloodBanks = async () => {
      try {
        const res = await axios.get('http://localhost:8080/admin');
        setBloodBanks(res.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchbloodBanks();
  }, []);

  const filteredBloodBanks = bloodBanks.filter(bank =>
    (bank.institution_name && bank.institution_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (bank.location && bank.location.city && bank.location.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (bank.location && bank.location.state && bank.location.state.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Blood Banks in the City</h1>
          {filteredBloodBanks && filteredBloodBanks.length > 0 ? (
            filteredBloodBanks.map((bank, index) => (
              <BloodBankCard
                key={index}
                id={bank._id} 
                institution_name={bank.institution_name}
                location={bank.location}
                contact_number={bank.contact_number}
                // availableBloodTypes={bank.availableBloodTypes}
                onClick={handleBloodBankClick}
              />))
          ) : (
            <p className="text-gray-600 text-center">No blood banks found matching your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default BloodBankListPage;