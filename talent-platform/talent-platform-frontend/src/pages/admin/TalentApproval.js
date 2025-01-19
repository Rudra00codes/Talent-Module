import React, { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';

const TalentApproval = () => {
  const [pendingTalents, setPendingTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingTalents();
  }, []);

  const fetchPendingTalents = async () => {
    try {
      const response = await fetch('/api/admin/pending-talents');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }
      
      setPendingTalents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (talentId, action, reason = '') => {
    try {
      const response = await fetch(`/api/admin/talents/${talentId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rejectionReason: reason }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      // Refresh the list
      fetchPendingTalents();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Pending Talent Approvals</h2>
      
      <div className="talents-grid">
        {pendingTalents.map(talent => (
          <div key={talent._id} className="talent-card">
            <img 
              src={talent.profilePhoto} 
              alt={talent.name} 
              className="profile-photo"
            />
            
            <div className="talent-info">
              <h3>{talent.name}</h3>
              <p>{talent.email}</p>
              <p>{talent.phone}</p>
              
              <div className="skills-list">
                {talent.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.name} ({skill.yearsOfExperience} years)
                  </span>
                ))}
              </div>
              
              <p className="description">{talent.description}</p>
            </div>

            <div className="action-buttons">
              <button 
                onClick={() => handleApproval(talent._id, 'approve')}
                className="approve-button"
              >
                Approve
              </button>
              
              <button 
                onClick={() => {
                  const reason = window.prompt('Please provide a reason for rejection:');
                  if (reason) handleApproval(talent._id, 'reject', reason);
                }}
                className="reject-button"
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

export default TalentApproval;