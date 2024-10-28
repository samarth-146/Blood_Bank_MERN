import React, { useState } from 'react';

const Button = ({ children, className, href, variant = 'primary' }) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50",
    plain: "bg-white text-black"
  };

  const buttonClass = `${baseStyle} ${variants[variant]} ${className || ''}`;

  return (
    <a href={href} className={buttonClass}>
      {children}
    </a>
  );
};


const SignUpDropdown = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a href="/user/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign up as User</a>
        <a href="/admin/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign up as BloodBank</a>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
              <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">About</a>
              {/* <a href="/support" className="text-base font-medium text-gray-500 hover:text-gray-900">Support</a> */}
            </nav>
            <div className="flex items-center relative">
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Button className="ml-8">Sign up</Button>
                <SignUpDropdown isOpen={isDropdownOpen} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Save Lives with</span>
                <span className="block text-red-600">Blood Bank Management</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Streamline blood donation processes, manage inventory efficiently, and connect donors with those in need.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Button href="/user/signup" className="w-full sm:w-auto">Get started</Button>
                <Button href="/about" variant="outline" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">Learn more</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to manage blood donations
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our blood bank management system offers a comprehensive solution for blood centers and hospitals.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'Donor Management',
                    description: 'Efficiently manage donor information, schedules, and donation history.'
                  },
                  {
                    title: 'Inventory Tracking',
                    description: 'Real-time tracking of blood units, types, and expiration dates.'
                  },
                  {
                    title: 'Request Handling',
                    description: 'Streamline blood requests from hospitals and manage distributions.'
                  },
                  {
                    title: 'Reporting & Analytics',
                    description: 'Generate comprehensive reports and gain insights into donation trends.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                        {/* You can add icons here if needed */}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-red-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start saving lives?</span>
              <span className="block text-red-300">Sign up for our platform today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button href="/user/signup" variant="plain" className="">Get started</Button>
              </div>
            </div>
          </div>

        </section>
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
              &copy; {new Date().getFullYear()} BloodBank Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}