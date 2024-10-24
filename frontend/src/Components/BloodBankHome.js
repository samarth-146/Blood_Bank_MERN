import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ onLogout,OnProfileClick,onAddStock }) => (
  <nav className="bg-red-600 shadow-lg mb-8">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <a href='/admin/home' className="text-white text-lg font-bold">BloodBridge</a>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button onClick={OnProfileClick} className="bg-red-700 p-1 rounded-full text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-white">
            <span className="sr-only">View profile</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button
          className='ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          onClick={onAddStock}
          >
            Add Stock
          </button>
          <button
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const SearchBar = ({ onSearch }) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search donors by name, contact number, or blood type..."
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

const DonorTable = ({ donors }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-red-500 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Name</th>
          <th className="py-2 px-4 text-left">Contact Number</th>
          <th className="py-2 px-4 text-left">Blood Type</th>
        </tr>
      </thead>
      <tbody>
        {donors.map((donor, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="py-2 px-4">{donor.name}</td>
            <td className="py-2 px-4">{donor.contactNumber}</td>
            <td className="py-2 px-4">{donor.bloodType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InventoryTable = ({ inventory }) => (
  <div className="overflow-x-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Blood Inventory</h2>
    <table className="min-w-full bg-white">
      <thead className="bg-red-500 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Blood Type</th>
          <th className="py-2 px-4 text-left">Quantity Available</th>
          <th className="py-2 px-4 text-left">Expiration Date</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="py-2 px-4">{item.bloodType}</td>
            <td className="py-2 px-4">{item.quantity} units</td>
            <td className="py-2 px-4">{item.expirationDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


const OrganizeBloodCampButton = ({ onOrganizeCamp }) => (
  <button
    className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    onClick={onOrganizeCamp}
  >
    Organize Blood Camp
  </button>
);

export default function BloodBankHomePage() {
  const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [donors, setDonors] = useState([]);


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/admin/logout');
      localStorage.removeItem('token');
      toast.success("Logged Out Successfully");
      navigate('/admin/signin');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    const fetchDonors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/donors', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setDonors(response.data);
        } catch (error) {
            console.error("Error fetching donors:", error);
        }
    };

    fetchDonors();
}, []);



  const handleStock=()=>{
    navigate('/admin/inventory_form');
  }
  const handleOrganizeCamp = () => {
    navigate('/admin/blood_camp/form');
  };
  const handleAdminProfile=()=>{
    navigate('/admin/profile');
  }
  // Sample data for donors
 

  // Sample data for inventory


  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.contactNumber.includes(searchTerm) ||
    donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} OnProfileClick={handleAdminProfile} onAddStock={handleStock} />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-8">Blood Bank Management System</h1>
  
        <SearchBar onSearch={setSearchTerm} />
  
        <h2 className="text-2xl font-bold mb-4">Donor List</h2>
        <DonorTable donors={filteredDonors.length > 0 ? filteredDonors : donors} />
  
        {/* <InventoryTable inventory={inventoryData} /> */}
  
        <OrganizeBloodCampButton onOrganizeCamp={handleOrganizeCamp} />
      </div>
    </div>
  );
  
}