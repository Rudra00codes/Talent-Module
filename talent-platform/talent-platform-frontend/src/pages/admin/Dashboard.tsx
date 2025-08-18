import React, { useState, useEffect } from 'react';
import { getPendingProfiles, approveProfile, rejectProfile } from '../../services/adminService';
import { Talent } from '../../services/apiService';

const AdminDashboard: React.FC = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  const fetchPendingProfiles = async () => {
    try {
      const data = await getPendingProfiles();
      setPendingProfiles(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        {pendingProfiles.map((profile: any) => (
          <div key={profile._id} className="border p-4 rounded">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <div className="mt-2 space-x-2">
              <button 
                onClick={() => approveProfile(profile._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button 
                onClick={() => rejectProfile(profile._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;