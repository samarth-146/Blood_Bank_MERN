import React, { useState } from 'react';

const InputField = ({ label, type, id, value, onChange, required }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
    />
  </div>
);

const TextAreaField = ({ label, id, value, onChange, required }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
    ></textarea>
  </div>
);

export default function BloodCampForm() {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Blood Camp organized successfully!');
    // Reset form after submission
    setFormData({
      eventName: '',
      date: '',
      time: '',
      location: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Organize a Blood Camp
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Event Name"
              type="text"
              id="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date"
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <InputField
              label="Time"
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <InputField
              label="Location"
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextAreaField
              label="Description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Organize Blood Camp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}