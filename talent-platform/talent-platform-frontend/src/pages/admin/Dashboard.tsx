import React, { useState, useEffect } from 'react';
import { getPendingProfiles, approveProfile, rejectProfile } from '../../services/adminService';
import { 
  FaUsers, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChartBar, 
  FaClock, 
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload
} from 'react-icons/fa';

interface Profile {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  photo?: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration when backend is not available
  const mockProfiles: Profile[] = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      skills: ['React', 'Node.js', 'MongoDB'],
      experience: '5 years',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '3 years',
      createdAt: '2025-01-14T15:45:00Z'
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      skills: ['UI/UX', 'Figma', 'Adobe Creative Suite'],
      experience: '4 years',
      createdAt: '2025-01-13T09:15:00Z'
    }
  ];

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  const fetchPendingProfiles = async () => {
    try {
      const data = await getPendingProfiles();
      setPendingProfiles(data);
    } catch (error) {
      console.error('Error:', error);
      // Use mock data when backend is not available
      setPendingProfiles(mockProfiles);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveProfile(id);
      setPendingProfiles(prev => prev.filter(profile => profile._id !== id));
    } catch (error) {
      console.error('Error approving profile:', error);
      // For demo, just remove from list
      setPendingProfiles(prev => prev.filter(profile => profile._id !== id));
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectProfile(id);
      setPendingProfiles(prev => prev.filter(profile => profile._id !== id));
    } catch (error) {
      console.error('Error rejecting profile:', error);
      // For demo, just remove from list
      setPendingProfiles(prev => prev.filter(profile => profile._id !== id));
    }
  };

  const filteredProfiles = pendingProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage talent profiles and platform analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Pending Profiles</p>
                <p className="text-2xl font-bold text-gray-900">{pendingProfiles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Approved Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaChartBar className="text-purple-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Total Talents</p>
                <p className="text-2xl font-bold text-gray-900">847</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FaClock className="text-orange-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Avg. Review Time</p>
                <p className="text-2xl font-bold text-gray-900">2.5h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search profiles by name, email, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaFilter className="mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <FaDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid gap-6">
          {filteredProfiles.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-lg border border-gray-100 text-center">
              <FaUsers className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Pending Profiles</h3>
              <p className="text-gray-600">All profiles have been reviewed. Great job!</p>
            </div>
          ) : (
            filteredProfiles.map((profile) => (
              <div key={profile._id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Profile Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h3>
                      <p className="text-gray-600 mb-2">{profile.email}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {profile.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaClock className="mr-1" />
                        <span>Experience: {profile.experience}</span>
                        <span className="mx-2">•</span>
                        <span>Applied: {new Date(profile.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 lg:flex-col lg:min-w-0">
                    <button 
                      onClick={() => handleApprove(profile._id)}
                      className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex-1 lg:flex-none"
                    >
                      <FaCheckCircle className="mr-2" />
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(profile._id)}
                      className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25 flex-1 lg:flex-none"
                    >
                      <FaTimesCircle className="mr-2" />
                      Reject
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 lg:w-full">
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;