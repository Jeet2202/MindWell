import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-wrapper">
              <div className="about-image-glow"></div>
              <img
                src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=500&fit=crop"
                alt="About MindWell"
                className="about-image"
              />
              <div className="stats-box about-stats-box">
                <h3>10K+</h3>
                <p>Happy Students</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="badge">
              <i className="fas fa-heart"></i>
              Our Story
            </div>
            <h2 className="about-title">
              Empowering Minds, <span className="gradient-text">Transforming Lives</span>
            </h2>
            <p className="about-text">
              MindWell is a revolutionary mental health platform designed specifically for students
              and educational institutions. We believe that mental wellness is the foundation of
              academic success and personal growth.
            </p>
            <p className="about-text">
              Our mission is to break down barriers to mental health care by providing accessible,
              affordable, and high-quality counseling services. We connect students with licensed
              professionals who understand the unique challenges faced in academic environments.
            </p>
            <div className="about-stats-grid">
              <div className="stat-card">
                <h3 className="stat-number" style={{ color: '#667eea' }}>500+</h3>
                <p className="stat-label">Expert Counselors</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number" style={{ color: '#4facfe' }}>24/7</h3>
                <p className="stat-label">Support Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
