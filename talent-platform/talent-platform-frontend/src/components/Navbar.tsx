import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPD Hub
              </span>
              <span className="ml-2 text-gray-600 font-medium hidden sm:block">Talent Platform</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/talents" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Browse Talents
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Register as Talent
            </Link>
            
            <Link 
              to="/admin" 
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 flex items-center group"
            >
              <FaUserShield className="mr-2 group-hover:scale-110 transition-transform" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="py-4 space-y-4 border-t border-gray-200 mt-4">
            <Link 
              to="/talents" 
              className="block text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Talents
            </Link>
            
            <Link 
              to="/register" 
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Register as Talent
            </Link>
            
            <Link 
              to="/admin" 
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserShield className="mr-2" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 