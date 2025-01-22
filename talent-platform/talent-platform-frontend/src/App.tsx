// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/talent/Registration';
import Directory from './pages/talent/Directory';
import AdminDashboard from './pages/admin/Dashboard';
import TalentApproval from './pages/admin/TalentApproval';
import ClientRegistration from './pages/client/Registration';
import ClientDashboard from './pages/client/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/talents" element={<Directory />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={
            <ProtectedRoute role="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="talents" element={<TalentApproval />} />
              </Routes>
            </ProtectedRoute>
          } />
          <Route path="/client/dashboard" element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/client/register" element={<ClientRegistration />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;