import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ onLogout, OnProfileClick, onAddStock }) => (
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
          <th className="py-2 px-4 text-left">Donation Date</th>
        </tr>
      </thead>
      <tbody>
        {donors.map((donor, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="py-2 px-4">{donor.name}</td>
            <td className="py-2 px-4">{donor.contactNumber}</td>
            <td className="py-2 px-4">{donor.bloodType}</td>
            <td className="py-2 px-4">{new Date(donor.donationDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InventoryTable = ({ inventory, onEdit, editingId, onSave, onCancel, editedValues, setEditedValues }) => (
  <div className="overflow-x-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Blood Inventory</h2>
    <table className="min-w-full bg-white">
      <thead className="bg-red-500 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Blood Type</th>
          <th className="py-2 px-4 text-left">Quantity Available</th>
          <th className="py-2 px-4 text-left">Expiration Date</th>
          <th className="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item._id} className={item._id % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="py-2 px-4">
              {editingId === item._id ? (
                <input
                  type="text"
                  value={editedValues.blood_type}
                  onChange={(e) => setEditedValues({...editedValues, blood_type: e.target.value})}
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                item.blood_type
              )}
            </td>
            <td className="py-2 px-4">
              {editingId === item._id ? (
                <input
                  type="number"
                  value={editedValues.quantity}
                  onChange={(e) => setEditedValues({...editedValues, quantity: e.target.value})}
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                `${item.quantity} units`
              )}
            </td>
            <td className="py-2 px-4">
              {editingId === item._id ? (
                <input
                  type="date"
                  value={editedValues.expiration_date.split('T')[0]}
                  onChange={(e) => setEditedValues({...editedValues, expiration_date: e.target.value})}
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                new Date(item.expiration_date).toLocaleDateString()
              )}
            </td>
            <td className="py-2 px-4">
              {editingId === item._id ? (
                <>
                  <button
                    onClick={() => onSave(item._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onEdit(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
              )}
            </td>
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [donors, setDonors] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({
    blood_type: '',
    quantity: '',
    expiration_date: ''
  });

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/admin/logout');
      localStorage.removeItem('token');
      toast.success("Logged Out Successfully");
      navigate('/admin/signin');
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Logout failed. Please try again.");
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
        toast.error("Failed to fetch donors. Please try again.");
      }
    };

    const fetchInventory = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const adminId = decodedToken.id;
          const res = await axios.get(`http://localhost:8080/blood_inventory/admin/${adminId}`);
          setInventory(res.data.blood_inventory);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
        toast.error("Failed to fetch inventory. Please try again.");
      }
    };

    fetchDonors();
    fetchInventory();
  }, []);

  const handleStock = () => {
    navigate('/admin/inventory_form');
  }

  const handleOrganizeCamp = () => {
    navigate('/admin/blood_camp/form');
  };

  const handleAdminProfile = () => {
    navigate('/admin/profile');
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleEdit = (id) => {
    const itemToEdit = inventory.find(item => item._id === id);
    setEditedValues({
      blood_type: itemToEdit.blood_type,
      quantity: itemToEdit.quantity,
      expiration_date: itemToEdit.expiration_date.split('T')[0]
    });
    setEditingId(id);
  };

  const handleSave = async (id) => {
    try {
      const updatedData = {
        blood_type: editedValues.blood_type,
        quantity: parseInt(editedValues.quantity),
        expiration_date: new Date(editedValues.expiration_date).toISOString()
      };

      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/blood_inventory/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setInventory(inventory.map(item => 
        item._id === id ? { ...item, ...updatedData } : item
      ));
      setEditingId(null);
      toast.success("Inventory updated successfully");
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Failed to update inventory. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({
      blood_type: '',
      quantity: '',
      expiration_date: ''
    });
  };

  const filteredDonors = donors.filter(donor => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      donor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      donor.contactNumber.includes(searchTerm) ||
      donor.bloodType.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} OnProfileClick={handleAdminProfile} onAddStock={handleStock} />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-8">Blood Bank Management System</h1>
        <SearchBar onSearch={handleSearch} />
        <h2 className="text-2xl font-bold mb-4">Donor List</h2>
        <DonorTable donors={filteredDonors} />
        
        <InventoryTable 
          inventory={inventory} 
          onEdit={handleEdit} 
          editingId={editingId} 
          onSave={handleSave}
          onCancel={handleCancel}
          editedValues={editedValues}
          setEditedValues={setEditedValues}
        />

        <OrganizeBloodCampButton onOrganizeCamp={handleOrganizeCamp} />
      </div>
    </div>
  );
}