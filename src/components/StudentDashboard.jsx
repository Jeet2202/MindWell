import React from 'react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const StudentDashboard = ({ onLogout }) => {
  const statsCards = [
    { icon: 'fas fa-calendar-alt', title: 'Next Session', value: 'Tomorrow', subtitle: '2:00 PM with Dr. Sarah', badge: '+2 this week', gradient: 'gradient-bg-primary' },
    { icon: 'fas fa-check-circle', title: 'Sessions Completed', value: '12', subtitle: 'Great progress!', badge: '+3 this month', gradient: 'gradient-bg-success' },
    { icon: 'fas fa-smile', title: 'Current Mood Score', value: '8/10', subtitle: 'Feeling good', badge: '+1 from last week', gradient: 'gradient-bg-accent' },
    { icon: 'fas fa-book', title: 'Resources Available', value: '24', subtitle: 'Explore now', badge: '5 new', gradient: 'gradient-bg-secondary' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Welcome back, Alex!</h1>
            <p>Here's your mental wellness overview</p>
          </div>
          <button onClick={onLogout} className="btn btn-primary">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </motion.div>

        <div className="stats-grid">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card-dashboard card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-card-header">
                <div className={`stat-icon ${stat.gradient}`}>
                  <i className={stat.icon}></i>
                </div>
                <span className="stat-badge">{stat.badge}</span>
              </div>
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              {stat.value === '8/10' && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
              )}
              <p className="stat-subtitle">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid">
          <motion.div
            className="dashboard-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-header">
              <h2>Upcoming Sessions</h2>
              <button className="link-btn">View all</button>
            </div>
            <div className="sessions-list">
              <div className="session-item" style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
                <div className="session-left">
                  <img src="https://i.pravatar.cc/150?img=47" alt="Counselor" className="session-avatar" />
                  <div>
                    <h4>Dr. Sarah Johnson</h4>
                    <p>Anxiety Management</p>
                  </div>
                </div>
                <div className="session-right">
                  <h4>Tomorrow</h4>
                  <p>2:00 PM</p>
                </div>
              </div>
              <div className="session-item" style={{ background: 'rgba(76, 175, 254, 0.1)' }}>
                <div className="session-left">
                  <div className="session-icon gradient-bg-accent">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <h4>Group Session</h4>
                    <p>Stress & Study Balance</p>
                  </div>
                </div>
                <div className="session-right">
                  <h4>Friday</h4>
                  <p>4:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="dashboard-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-header">
              <h2>Recommended Resources</h2>
              <button className="link-btn">See more</button>
            </div>
            <div className="resources-list">
              <div className="resource-item">
                <div className="resource-icon gradient-bg-primary">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="resource-info">
                  <h4>Managing Exam Stress</h4>
                  <p>Article • 5 min read</p>
                </div>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="resource-item">
                <div className="resource-icon gradient-bg-success">
                  <i className="fas fa-video"></i>
                </div>
                <div className="resource-info">
                  <h4>Mindfulness Meditation Guide</h4>
                  <p>Video • 15 min</p>
                </div>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="resource-item">
                <div className="resource-icon gradient-bg-accent">
                  <i className="fas fa-headphones"></i>
                </div>
                <div className="resource-info">
                  <h4>Sleep Better Tonight</h4>
                  <p>Audio • 20 min</p>
                </div>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
