import React, { useState, useEffect } from 'react';
import { Talent } from '../../types/Talent';
import { approveProfile, rejectProfile } from '../../services/adminService';

const AdminDashboard = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Talent[]>([]);

  useEffect(() => {
    // Fetch pending profiles
    fetchPendingProfiles();
  }, []);

  const fetchPendingProfiles = async () => {
    try {
      const response = await fetch('/api/admin/pending-profiles');
      const data = await response.json();
      setPendingProfiles(data);
    } catch (error) {
      console.error('Error fetching pending profiles:', error);
    }
  };

  const handleApprove = async (talentId: string) => {
    try {
      await approveProfile(talentId);
      // Remove from pending list
      setPendingProfiles(prev => prev.filter(profile => profile.id !== talentId));
      // Trigger notification to talent
    } catch (error) {
      console.error('Error approving profile:', error);
    }
  };

  const handleReject = async (talentId: string) => {
    try {
      await rejectProfile(talentId);
      // Remove from pending list
      setPendingProfiles(prev => prev.filter(profile => profile.id !== talentId));
      // Trigger notification to talent
    } catch (error) {
      console.error('Error rejecting profile:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section className="pending-profiles">
        <h2>Pending Profiles ({pendingProfiles.length})</h2>
        {pendingProfiles.map(profile => (
          <div key={profile.id} className="profile-card">
            <img src={profile.profilePhoto} alt={profile.name} />
            <div className="profile-details">
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
              <p>{profile.description}</p>
              <div className="skills">
                {profile.skills.map(skill => (
                  <span key={skill.name} className="skill-tag">
                    {skill.name} ({skill.expertiseLevel})
                  </span>
                ))}
              </div>
            </div>
            <div className="action-buttons">
              <button 
                onClick={() => handleApprove(profile.id)}
                className="approve-btn"
              >
                Approve
              </button>
              <button 
                onClick={() => handleReject(profile.id)}
                className="reject-btn"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;