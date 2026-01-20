import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Reviews from './components/Reviews';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import StudentDashboard from './components/StudentDashboard';
import CounselorDashboard from './components/CounselorDashboard';
import './App.css';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupType, setSignupType] = useState('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = (type = 'student') => {
    setSignupType(type);
    setIsSignupModalOpen(true);
  };
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    closeLoginModal();
  };

  const handleSignup = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    closeSignupModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <>
            <Header
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
            />
            <main>
              <Hero openSignupModal={openSignupModal} />
              <Services />
              <About />
              <Reviews />
            </main>

            {isLoginModalOpen && (
              <LoginModal
                closeModal={closeLoginModal}
                onLogin={handleLogin}
              />
            )}

            {isSignupModalOpen && (
              <SignupModal
                closeModal={closeSignupModal}
                onSignup={handleSignup}
                initialType={signupType}
              />
            )}
          </>
        ) : (
          <>
            {userType === 'student' ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : (
              <CounselorDashboard onLogout={handleLogout} />
            )}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
