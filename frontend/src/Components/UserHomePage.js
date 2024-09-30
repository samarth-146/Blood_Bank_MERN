import React, {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { jwtDecode } from 'jwt-decode';
  // const [user, setUser] = useState({ name: '', email: '', blood_type: '' });

  // useEffect(()=>{
  //   const fetchData=async()=>{
  //     const token=localStorage.getItem('token');
  //     if(token)
  //     {
  //       try{
  //         const decodedToken=jwtDecode(token);
  //         const userId=decodedToken.userId;
  //         const res=await axios.get(`http://localhost:8080/user/${userId}`);
  //         setUser({
  //           name:res.data.name,
  //           email:res.data.email
  //         })
  //       }
  //       catch(error)
  //       {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   fetchData();
  // },[]);

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

const Navbar = ({ onSearch, onLogout, onProfileClick }) => (
  <nav className="bg-red-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <a href='/user/home' className="text-white text-lg font-bold">BloodBridge</a>
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

const BloodBankCard = ({ name, address, contactNumber, availableBloodTypes }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
    <p className="text-gray-600 mb-2">{address}</p>
    <p className="text-gray-600 mb-2">Contact: {contactNumber}</p>
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Available Blood Types:</h3>
      <div className="flex flex-wrap gap-2">
        {availableBloodTypes.map((type) => (
          <span key={type} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {type}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const BloodBankListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Sample data for blood banks
  const bloodBanks = [
    {
      id: 1,
      name: "City Central Blood Bank",
      address: "123 Main St, Downtown, City",
      contactNumber: "+1 (555) 123-4567",
      availableBloodTypes: ["A+", "B+", "O+", "AB+"]
    },
    {
      id: 2,
      name: "Westside Medical Center Blood Bank",
      address: "456 West Ave, Westside, City",
      contactNumber: "+1 (555) 987-6543",
      availableBloodTypes: ["A-", "B-", "O-", "AB-"]
    },
    {
      id: 3,
      name: "Eastside Community Blood Bank",
      address: "789 East Blvd, Eastside, City",
      contactNumber: "+1 (555) 246-8135",
      availableBloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-"]
    },
    {
      id: 4,
      name: "Northside Hospital Blood Center",
      address: "321 North Rd, Northside, City",
      contactNumber: "+1 (555) 369-2580",
      availableBloodTypes: ["O+", "O-", "AB+", "AB-"]
    },
    {
      id: 5,
      name: "Southside Red Cross Blood Bank",
      address: "654 South St, Southside, City",
      contactNumber: "+1 (555) 159-7531",
      availableBloodTypes: ["A+", "B+", "AB+", "O+"]
    }
  ];

  const filteredBloodBanks = bloodBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bank.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={setSearchTerm} onLogout={handleLogout} onProfileClick={handleProfileClick} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Blood Banks in the City</h1>
          {filteredBloodBanks && filteredBloodBanks.length > 0 ? (
            filteredBloodBanks.map(bank => (
              <BloodBankCard key={bank.id} {...bank} />
            ))
          ) : (
            <p className="text-gray-600 text-center">No blood banks found matching your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default BloodBankListPage;