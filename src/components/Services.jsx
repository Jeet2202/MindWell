import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const servicesData = [
  {
    icon: 'fas fa-comments',
    title: 'One-on-One Counseling',
    description: 'Private, confidential sessions with licensed mental health professionals in a secure online environment.',
    gradient: 'gradient-bg-primary',
    delay: 0.1
  },
  {
    icon: 'fas fa-users',
    title: 'Group Support',
    description: 'Connect with peers in supportive group sessions facilitated by experienced counselors and build lasting relationships.',
    gradient: 'gradient-bg-success',
    delay: 0.2
  },
  {
    icon: 'fas fa-book-open',
    title: 'Educational Resources',
    description: 'Access to curated mental health resources, articles, self-help tools, and guided meditation sessions.',
    gradient: 'gradient-bg-accent',
    delay: 0.3
  }
];

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge">
            <i className="fas fa-star"></i>
            Premium Services
          </div>
          <h2 className="section-title">
            Comprehensive Mental Health{' '}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-description">
            Discover our range of services designed to support your mental wellness journey
            with professional care and innovative approaches.
          </p>
        </motion.div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: service.delay }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`icon-box ${service.gradient}`}
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
              >
                <i className={service.icon}></i>
              </motion.div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-link">
                <span>Learn more</span>
                <i className="fas fa-arrow-right"></i>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
