import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TalentRegistration from './pages/talent/Registration';
import TalentProfile from './pages/talent/Profile';
import TalentDirectory from './pages/talent/Directory';
import AdminDashboard from './pages/admin/Dashboard';
import TalentApproval from './pages/admin/TalentApproval';
import ClientRegistration from './pages/client/Registration';
import ClientDashboard from './pages/client/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<TalentDirectory />} />
        <Route path="/talent/register" element={<TalentRegistration />} />
        <Route path="/client/register" element={<ClientRegistration />} />
        <Route path="/talent/:id" element={<TalentProfile />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute role="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="talents" element={<TalentApproval />} />
              </Routes>
            </ProtectedRoute>
          } 
        />

        {/* Protected Client Routes */}
        <Route 
          path="/client/dashboard" 
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;