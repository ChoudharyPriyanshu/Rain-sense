import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="relative min-h-screen overflow-hidden">
            <AnimatedBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1E293B',
                  color: '#F8FAFC',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
