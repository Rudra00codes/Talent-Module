import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Connect with Top Talent
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Join JPD Hub's talent network and showcase your skills to potential clients
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Register as Talent
              </Link>
              <Link
                to="/talents"
                className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50"
              >
                Browse Talents
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Easy Registration</h3>
            <p className="text-gray-600">Simple profile creation with skill showcase</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
            <p className="text-gray-600">Admin verified profiles for credibility</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Client Connection</h3>
            <p className="text-gray-600">Direct hiring requests from potential clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
