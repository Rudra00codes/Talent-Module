import { useState, useEffect } from 'react';
import { Talent } from '../../types/talent';
import { approveProfile, rejectProfile, getPendingProfiles } from '@services/adminService';

const AdminDashboard = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPendingProfiles();
  }, []);

  const loadPendingProfiles = async () => {
    try {
      const data = await getPendingProfiles();
      setPendingProfiles(data);
    } catch (err) {
      setError('Failed to load pending profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (profileId: string) => {
    try {
      await approveProfile(profileId);
      // Refresh the list after approval
      loadPendingProfiles();
    } catch (err) {
      setError('Failed to approve profile');
    }
  };

  const handleReject = async (profileId: string, reason?: string) => {
    try {
      await rejectProfile(profileId, reason);
      // Refresh the list after rejection
      loadPendingProfiles();
    } catch (err) {
      setError('Failed to reject profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        {pendingProfiles.map((profile: any) => (
          <div key={profile.id} className="border p-4 rounded">
            <h2>{profile.name}</h2>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleApprove(profile.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(profile.id)}
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