import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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

const Button = ({ children, type = 'button', className }) => (
  <button
    type={type}
    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${className}`}
  >
    {children}
  </button>
);

export default function AdminSignUpPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    institution_name: '',
    street_no: '',
    city: '',
    state: '',
    email: '',
    password: '',
    contact_number: ''
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
    const adminData = {
      institution_name: formData.institution_name,
      email: formData.email,
      password: formData.password,
      contact_number: formData.contact_number,
      location: {
        street_no: formData.street_no,
        city: formData.city,
        state: formData.state
      },
    };
    try {
      const res = await axios.post('http://localhost:8080/admin/register', adminData);
      if (res.status === 201) {
        setSuccess("Admin Registered Successfully");
        setError('');
        const role="admin";
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role',role);
        setFormData({
          institution_name: '',
          street_no: '',
          city: '',
          state: '',
          email: '',
          password: '',
          contact_number: ''
        });
        toast.success("Admin Registered Successfully");
        navigate('/admin/home');
      }
    } catch (e) {
      setError("Admin Registration Failed");
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up as an Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Register your institution for the blood bank management system
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-red-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Institution Name"
              type="text"
              id="institution_name"
              value={formData.institution_name}
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
            <InputField
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <InputField
              label="Contact Number"
              type="tel"
              id="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
            <InputField
              label="Street No"
              type="text"
              id="street_no"
              value={formData.street_no}
              onChange={handleChange}
              required
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
                href="/admin/signin"
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
  );
}