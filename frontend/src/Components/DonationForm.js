import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Button = ({ children, className, variant = 'primary', onClick, type = 'button' }) => {
  const baseStyle = "px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50",
    plain: "bg-white text-black"
  };

  const buttonClass = `${baseStyle} ${variants[variant]} ${className || ''}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
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

const InputField = ({ label, id, type = 'text', value, onChange, required = false,disabled=false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      name={id} 
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm  h-8 px-4"
    />
  </div>
);

const BloodDonationForm = () => {
  const { user_id, admin_id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    donationDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/user/${user_id}`);
        const userName = userResponse.data.name;

        setFormData(prevState => ({
          ...prevState,
          name: userName,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const payload = {
        adminId: admin_id,
        userId:user_id,
        donationDate: formData.donationDate,
      };

      await axios.post('http://localhost:8080/blood_donation', payload, config);
      toast.success('Blood donation recorded successfully!');
      navigate('/user/home');
    } catch (error) {
      console.error('Error submitting blood donation:', error);
      toast.error('Failed to record blood donation. Please try again.');
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} onProfileClick={handleProfileClick} />
      <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blood Donation Form</h1>
            <p className="mt-1 text-sm text-gray-500">
              Please fill out the form below to record your blood donation.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled
            />
            <InputField
              label="Donation Date"
              id="donationDate"
              type="date"
              value={formData.donationDate}
              onChange={handleChange}
              required
            />
            <div className="pt-5">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-3"
                  onClick={() => navigate('/user/home')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BloodDonationForm;
