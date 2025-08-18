import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaRocket, FaShieldAlt, FaStar, FaArrowRight } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Connect with
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Top Talent</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Join JPD Hub's premium talent network and showcase your skills to potential clients worldwide
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up animation-delay-200">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center"
              >
                Register as Talent
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/talents"
                className="group bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Browse Talents
                <FaUsers className="ml-2 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">1000+</div>
                <div className="text-gray-300 mt-2">Verified Talents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">500+</div>
                <div className="text-gray-300 mt-2">Successful Hires</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">98%</div>
                <div className="text-gray-300 mt-2">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose JPD Hub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of talent acquisition with our premium platform features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Easy Registration</h3>
              <p className="text-gray-600 leading-relaxed">Simple profile creation with comprehensive skill showcase and portfolio integration</p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">Admin verified profiles with rigorous quality checks for maximum credibility</p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Client Connection</h3>
              <p className="text-gray-600 leading-relaxed">Direct hiring requests from verified clients with seamless communication tools</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals</h2>
            <p className="text-xl text-gray-600">See what our community says about JPD Hub</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"JPD Hub transformed my freelance career. The quality of clients and projects is exceptional."</p>
              <div className="font-semibold text-gray-900">Sarah Chen</div>
              <div className="text-gray-500">Full-Stack Developer</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"As a client, I found amazing talent quickly. The verification process gives me confidence."</p>
              <div className="font-semibold text-gray-900">Mike Johnson</div>
              <div className="text-gray-500">Tech Startup Founder</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The admin approval process ensures quality. My profile stands out among verified professionals."</p>
              <div className="font-semibold text-gray-900">Alex Kumar</div>
              <div className="text-gray-500">UI/UX Designer</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the Elite?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Start your journey with JPD Hub today and connect with premium opportunities
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Started Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
