import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginModal.css';

const SignupModal = ({ closeModal, onSignup, initialType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(initialType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(userType);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>

          <div className="modal-header">
            <h2>Join MindWell</h2>
            <p>Start your mental wellness journey today</p>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Join as:</label>
              <div className="user-type-selector">
                <button
                  type="button"
                  className={`user-type-btn ${userType === 'student' ? 'active' : ''}`}
                  onClick={() => setUserType('student')}
                >
                  <i className="fas fa-graduation-cap"></i>
                  Student
                </button>
                <button
                  type="button"
                  className={`user-type-btn ${userType === 'counselor' ? 'active' : ''}`}
                  onClick={() => setUserType('counselor')}
                >
                  <i className="fas fa-user-md"></i>
                  Counselor
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <i className="fas fa-user-plus"></i>
              Create Account
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignupModal;
