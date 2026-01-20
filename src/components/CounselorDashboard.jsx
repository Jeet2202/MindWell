import React from 'react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const CounselorDashboard = ({ onLogout }) => {
  const statsCards = [
    { icon: 'fas fa-calendar-day', title: "Today's Sessions", value: '6', subtitle: '3 completed', badge: 'On track', gradient: 'gradient-bg-primary' },
    { icon: 'fas fa-users', title: 'Active Students', value: '24', subtitle: 'Excellent engagement', badge: '+2 this week', gradient: 'gradient-bg-success' },
    { icon: 'fas fa-chart-line', title: 'Total Sessions', value: '342', subtitle: 'This month', badge: '+12%', gradient: 'gradient-bg-accent' },
    { icon: 'fas fa-star', title: 'Average Rating', value: '4.9', subtitle: '★★★★★', badge: 'Excellent', gradient: 'gradient-bg-secondary' }
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
            <h1>Counselor Dashboard</h1>
            <p>Manage your sessions and track student progress</p>
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
              <h2>Today's Schedule</h2>
              <button className="link-btn">View calendar</button>
            </div>
            <div className="sessions-list">
              <div className="session-item" style={{ background: 'rgba(67, 233, 123, 0.1)', borderLeft: '4px solid #43e97b' }}>
                <div className="session-left">
                  <img src="https://i.pravatar.cc/150?img=20" alt="Student" className="session-avatar" />
                  <div>
                    <h4>Emma Wilson</h4>
                    <p>Anxiety & Depression</p>
                  </div>
                </div>
                <div className="session-right">
                  <h4>9:00 AM</h4>
                  <p style={{ color: '#43e97b' }}>Completed</p>
                </div>
              </div>
              <div className="session-item" style={{ background: 'rgba(76, 175, 254, 0.1)', borderLeft: '4px solid #4facfe' }}>
                <div className="session-left">
                  <img src="https://i.pravatar.cc/150?img=33" alt="Student" className="session-avatar" />
                  <div>
                    <h4>James Chen</h4>
                    <p>Academic Stress</p>
                  </div>
                </div>
                <div className="session-right">
                  <h4>10:30 AM</h4>
                  <p style={{ color: '#4facfe' }}>In Progress</p>
                </div>
              </div>
              <div className="session-item" style={{ background: 'rgba(102, 126, 234, 0.1)', borderLeft: '4px solid #667eea' }}>
                <div className="session-left">
                  <div className="session-icon gradient-bg-accent">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <h4>Group Session</h4>
                    <p>Mindfulness Workshop</p>
                  </div>
                </div>
                <div className="session-right">
                  <h4>2:00 PM</h4>
                  <p style={{ color: '#667eea' }}>Upcoming</p>
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
              <h2>Student Progress Overview</h2>
              <button className="link-btn">View details</button>
            </div>
            <div className="progress-list">
              <div className="progress-item">
                <div className="progress-header">
                  <div className="progress-user">
                    <img src="https://i.pravatar.cc/150?img=23" alt="Student" className="progress-avatar" />
                    <div>
                      <h4>Sarah Martinez</h4>
                      <p>Psychology Major</p>
                    </div>
                  </div>
                  <span className="progress-percentage">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%', background: 'var(--success-gradient)' }}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-header">
                  <div className="progress-user">
                    <img src="https://i.pravatar.cc/150?img=15" alt="Student" className="progress-avatar" />
                    <div>
                      <h4>David Kim</h4>
                      <p>Engineering</p>
                    </div>
                  </div>
                  <span className="progress-percentage">72%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '72%', background: 'var(--accent-gradient)' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;
