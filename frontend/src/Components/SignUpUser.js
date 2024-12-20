import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-red-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <a href='/' className="text-white text-lg font-bold">BloodBridge</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const InputField = ({ label, type, id, value, onChange, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      
      required={required}
      className="mt-2 h-6 block w-full rounded-sm border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
    />
  </div>
);

const SelectField = ({ label, id, value, onChange, options, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border-black focus:border-red-500 focus:ring-red-500 sm:text-sm"
    >
      <option value="">Select Blood Type</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Button = ({ children, type = 'button', className }) => (
  <button
    type={type}
    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${className}`}
  >
    {children}
  </button>
);

export default function UserSignUpPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodType: '',
    contactNumber: '',
    streetNo: '',
    apartmentName: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      blood_type: formData.bloodType,
      contact_number: formData.contactNumber,
      address: {
        street_no: formData.streetNo,
        apartment_name: formData.apartmentName,
        city: formData.city,
        state: formData.state
      },
    };
    try {
      const res = await axios.post('http://localhost:8080/user/register', userData);
      if(res.status === 201) {
        setSuccess("User Registered Successfully");
        setError('');
        const role = "user";
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', role);
        setFormData({
          name: '',
          email: '',
          password: '',
          bloodType: '',
          contactNumber: '',
          streetNo: '',
          apartmentName: '',
          city: '',
          state: ''
        });
        toast.success("User Registered Successfully");
        navigate('/user/home');
      }
    } catch(e) {
      console.log(error);
      if (e.response && e.response.status === 409) {
        // Assuming 409 Conflict is the response for user already exists
        setError("User already exists");
        setSuccess('');
        toast.error("User already exists");
      } else {
        setError("User Registration Failed");
        setSuccess('');
        toast.error("User Registration Failed");
      }
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up as a User
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our blood bank management system
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-red-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  label="Name"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <InputField
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <SelectField
                  label="Blood Type"
                  id="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  options={bloodTypes}
                  required
                />
                <InputField
                  label="Contact Number"
                  type="tel"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <InputField
                label="Street No"
                type="number"
                id="streetNo"
                value={formData.streetNo}
                onChange={handleChange}
                required
              />
              <InputField
                label="Apartment Name"
                type="text"
                id="apartmentName"
                value={formData.apartmentName}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  label="City"
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="State"
                  type="text"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Button type="submit">Sign up</Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/user/signin"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in
                </a>
              </div>
            </div>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {success && <p className="mt-4 text-green-600">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}