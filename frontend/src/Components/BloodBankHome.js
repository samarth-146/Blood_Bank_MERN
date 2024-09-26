import React, { useState } from 'react';

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

const OrganizeBloodCampButton = () => (
  <button
    className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    onClick={() => alert('Organizing a blood camp!')}
  >
    Organize Blood Camp
  </button>
);

export default function BloodBankHomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for donors
  const allDonors = [
    { name: "John Doe", contactNumber: "123-456-7890", bloodType: "A+" },
    { name: "Jane Smith", contactNumber: "098-765-4321", bloodType: "B-" },
    { name: "Alice Johnson", contactNumber: "111-222-3333", bloodType: "O+" },
    { name: "Bob Williams", contactNumber: "444-555-6666", bloodType: "AB-" },
    { name: "Charlie Brown", contactNumber: "777-888-9999", bloodType: "A-" },
  ];

  // Sample data for inventory
  const inventoryData = [
    { bloodType: "A+", quantity: 50, expirationDate: "2023-12-31" },
    { bloodType: "B-", quantity: 30, expirationDate: "2023-12-25" },
    { bloodType: "O+", quantity: 100, expirationDate: "2024-01-15" },
    { bloodType: "AB-", quantity: 20, expirationDate: "2023-12-20" },
    { bloodType: "A-", quantity: 40, expirationDate: "2024-01-05" },
  ];

  const filteredDonors = allDonors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.contactNumber.includes(searchTerm) ||
    donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Blood Bank Management System</h1>
      
      <SearchBar onSearch={setSearchTerm} />
      
      <h2 className="text-2xl font-bold mb-4">Donor List</h2>
      <DonorTable donors={filteredDonors} />
      
      <InventoryTable inventory={inventoryData} />
      
      <OrganizeBloodCampButton />
    </div>
  );
}