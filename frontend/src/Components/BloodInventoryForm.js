import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Button = ({ children, className, variant = 'primary', onClick, type = 'button' }) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50",
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
            <a href='/admin/home' className="text-white text-lg font-bold">BloodBridge</a>
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

const BloodStockForm = () => {
  const [stockEntries, setStockEntries] = useState([{ bloodType: '', quantity: '', expirationDate: '' }]);
  const navigate = useNavigate();

  const allBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (index, field, value) => {
    const newEntries = [...stockEntries];
    newEntries[index][field] = value;
    setStockEntries(newEntries);
  };

  const handleAddField = () => {
    setStockEntries([...stockEntries, { bloodType: '', quantity: '', expirationDate: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const adminId = decodedToken.id;
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        await axios.post('http://localhost:8080/blood_inventory', { adminId, stockEntries }, config);
        toast.success('Blood stock updated successfully!');
        navigate('/admin/home');
      }
    } catch (error) {
      console.error('Error updating blood stock:', error);
      toast.error('Failed to update blood stock. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/user/logout');
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      navigate('/admin/signin');
    } catch (error) {
      console.error('Logout error', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  const getAvailableBloodTypes = (index) => {
    const selectedTypes = stockEntries.slice(0, index).map(entry => entry.bloodType);
    return allBloodTypes.filter(type => !selectedTypes.includes(type));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} onProfileClick={handleProfileClick} />
      <main className="max-w-3xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Update Blood Stock</h1>
          <p className="mt-1 text-sm text-gray-500">Add new blood stock entries or update existing ones.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {stockEntries.map((entry, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor={`bloodType-${index}`} className="block text-sm font-medium text-gray-700">
                  Blood Type
                </label>
                <select
                  id={`bloodType-${index}`}
                  value={entry.bloodType}
                  onChange={(e) => handleChange(index, 'bloodType', e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select Blood Type</option>
                  {getAvailableBloodTypes(index).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
                  Quantity (in units)
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  value={entry.quantity}
                  onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor={`expirationDate-${index}`} className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <input
                  type="date"
                  id={`expirationDate-${index}`}
                  value={entry.expirationDate}
                  onChange={(e) => handleChange(index, 'expirationDate', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddField}
              disabled={stockEntries.length >= allBloodTypes.length}
            >
              Add Another Field
            </Button>
            <Button type="submit">Add Stock</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BloodStockForm;
