import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ openSignupModal }) => {
  return (
    <section id="home" className="hero-section">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Left Content */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <i className="fas fa-sparkles"></i>
              Transform Your Mental Wellness
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your Journey to{' '}
              <span className="gradient-text">Mental Wellness</span>{' '}
              Starts Here
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience a revolutionary approach to mental health care. Connect with expert counselors,
              access personalized resources, and join a supportive community dedicated to your well-being.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => openSignupModal('student')}
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-graduation-cap"></i>
                Join as Student
              </motion.button>
              <motion.button
                onClick={() => openSignupModal('counselor')}
                className="btn btn-secondary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-user-md"></i>
                Join as Counselor
              </motion.button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="stat-item">
                <div className="avatar-group">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User" className="avatar" />
                  <img src="https://i.pravatar.cc/150?img=2" alt="User" className="avatar" />
                  <img src="https://i.pravatar.cc/150?img=3" alt="User" className="avatar" />
                  <div className="avatar-count">+5k</div>
                </div>
                <span className="stat-text">Trusted by thousands</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Showcase Image */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-image-wrapper">
              <motion.div
                className="hero-image-glow"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=500&fit=crop"
                alt="Mental Health Support"
                className="hero-image"
              />

              {/* Floating Success Badge */}
              <motion.div
                className="success-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="success-badge-content">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="success-info">
                    <p className="success-number">10K+</p>
                    <p className="success-label">Happy Students</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
