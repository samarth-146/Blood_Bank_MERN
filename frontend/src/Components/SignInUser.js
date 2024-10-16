import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, className, href, variant = 'primary', type = 'button' }) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50",
    plain: "bg-white text-black"
  };

  const buttonClass = `${baseStyle} ${variants[variant]} ${className || ''}`;

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClass}>
      {children}
    </button>
  );
};

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



export default function UserSignInPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const res = await axios.post('http://localhost:8080/user/login', userData);
      const role = "user";
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      toast.success("Logged in successfully");
      navigate('/user/home');
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
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-red-600">BloodBridge</a>
            </div>
          </div>
        </div>
      </header>

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
                <Button type="submit" variant="primary">Sign in</Button>
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
                <Button href="/user/signup" variant="outline" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}