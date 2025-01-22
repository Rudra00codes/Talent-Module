import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/jpd-logo.png" alt="JPD Hub" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">Talent Platform</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/talents" className="text-gray-600 hover:text-blue-600">Browse Talents</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Register as Talent
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 