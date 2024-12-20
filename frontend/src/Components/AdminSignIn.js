import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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
      className="mt-2 h-8 block w-full rounded-sm border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
    />
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

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      email: formData.email,
      password: formData.password
    };

    try {
      const res = await axios.post('http://localhost:8080/admin/login', userData);
      const role = "admin";
      localStorage.setItem('token', res.data);
      localStorage.setItem('role', role);
      toast.success("Logged in successfully");
      navigate('/admin/home');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User Doesn't Exist");
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("An unexpected error occurred");
      }
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to our blood bank management system
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-red-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div>
                <Button type="submit">Sign in</Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/admin/signup"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}