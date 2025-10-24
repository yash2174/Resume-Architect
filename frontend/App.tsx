import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import ExploreResumes from './components/ExploreResumes';
import AtsChecker from './components/AtsChecker';
import ResumeAnalyzer from './components/CareerCounselor';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';


const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </HashRouter>
  );
};

const Main: React.FC = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className="bg-neutral min-h-screen font-sans text-gray-800">
            <Header />
            <main className={!isLandingPage ? "pt-16" : ""}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    
                    <Route path="/builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
                    <Route path="/explore" element={<ProtectedRoute><ExploreResumes /></ProtectedRoute>} />
                    <Route path="/ats-checker" element={<ProtectedRoute><AtsChecker /></ProtectedRoute>} />
                    <Route path="/resume-analyzer" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
                    
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;