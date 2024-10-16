import React from 'react';

const Button = ({ children, className, href, variant = 'primary' }) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50"
  };
  
  const buttonClass = `${baseStyle} ${variants[variant]} ${className || ''}`;
  
  return (
    <a href={href} className={buttonClass}>
      {children}
    </a>
  );
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-red-600">BloodBridge</a>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">Home</a>
              <a href="/about" className="text-base font-medium text-gray-900">About</a>
              {/* <a href="/support" className="text-base font-medium text-gray-500 hover:text-gray-900">Support</a> */}
            </nav>
            <div className="flex items-center">
              <Button href="/signup" className="ml-8">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:text-center">
            {/* <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">About Us</h2> */}
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-red-600">
              Bridging the Gap in Blood Donation
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              BloodBridge is a comprehensive Blood Bank Management System designed to streamline the process of blood donation and distribution.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              <div className="relative">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Our Mission</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our mission is to connect donors with those in need, ensuring a steady and reliable supply of blood for medical emergencies and treatments.
                </p>
              </div>
              <div className="relative">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Key Features</h3>
                <ul className="mt-2 text-base text-gray-500 list-disc list-inside">
                  <li>Efficient donor management</li>
                  <li>Real-time inventory tracking</li>
                  <li>Streamlined blood request handling</li>
                  <li>Comprehensive reporting and analytics</li>
                </ul>
              </div>
              <div className="relative">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Our Impact</h3>
                <p className="mt-2 text-base text-gray-500">
                  Since our inception, we've facilitated thousands of successful donations, helping save countless lives across the country.
                </p>
              </div>
              <div className="relative">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Join Us</h3>
                <p className="mt-2 text-base text-gray-500">
                  Whether you're a donor, a medical professional, or a blood bank administrator, we invite you to join us in our mission to make blood donation more accessible and efficient.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-medium leading-6 text-gray-900 mb-4">Our Creators</h3>
            <p className="text-base text-gray-500">
              BloodBridge was created by two passionate individuals dedicated to improving healthcare through technology:
            </p>
            <div className="mt-6 flex justify-center space-x-8">
              <div>
                <p className="text-lg font-medium text-gray-900">Samarth Ganjawala</p>
                <p className="text-base text-gray-500">Co-founder & Developer</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Juhi Hirpara</p>
                <p className="text-base text-gray-500">Co-founder & Designer</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {['Facebook', 'Twitter', 'Instagram'].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item}</span>
                {/* You can add social media icons here */}
              </a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} BloodBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}