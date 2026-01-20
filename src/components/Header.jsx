import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = ({ openLoginModal, openSignupModal }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon gradient-bg-primary">
              <i className="fas fa-brain"></i>
            </div>
            <span className="logo-text gradient-text">MindWell</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="nav-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link">
              Home
              <span className="nav-link-underline"></span>
            </a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="nav-link">
              Services
              <span className="nav-link-underline"></span>
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="nav-link">
              About
              <span className="nav-link-underline"></span>
            </a>
            <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }} className="nav-link">
              Reviews
              <span className="nav-link-underline"></span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            <motion.button
              onClick={toggleDarkMode}
              className="icon-btn"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </motion.button>
            <motion.button
              onClick={openLoginModal}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-sign-in-alt"></i>
              Login
            </motion.button>
            <motion.button
              onClick={() => openSignupModal('student')}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
