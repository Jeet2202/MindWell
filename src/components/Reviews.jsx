import React from 'react';
import { motion } from 'framer-motion';
import './Reviews.css';

const reviewsData = [
  {
    name: 'Sarah Johnson',
    role: 'Psychology Student',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    review: 'MindWell helped me through a difficult semester. My counselor was incredibly supportive and understanding. I couldn\'t have made it without them.',
    icon: 'fas fa-graduation-cap',
    delay: 0.1
  },
  {
    name: 'Michael Chen',
    role: 'Computer Science',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    review: 'The convenience of online sessions made it easy to fit therapy into my busy schedule. Highly recommend for any student struggling with stress.',
    icon: 'fas fa-laptop-code',
    delay: 0.2
  },
  {
    name: 'Dr. Emily Roberts',
    role: 'Licensed Counselor',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    review: 'As a counselor on MindWell, I appreciate the platform\'s commitment to quality care and the supportive community it has built.',
    icon: 'fas fa-user-md',
    delay: 0.3
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge">
            <i className="fas fa-quote-left"></i>
            Testimonials
          </div>
          <h2 className="section-title">
            What Our <span className="gradient-text">Community Says</span>
          </h2>
          <p className="section-description">
            Real stories from real people who have transformed their lives with MindWell
          </p>
        </motion.div>

        <div className="reviews-grid">
          {reviewsData.map((review, index) => (
            <motion.div
              key={index}
              className="review-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: review.delay }}
            >
              <div className="review-header">
                <img src={review.avatar} alt={review.name} className="review-avatar" />
                <div className="review-info">
                  <h4 className="review-name">{review.name}</h4>
                  <div className="stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-text">{review.review}</p>
              <div className="review-role">
                <i className={review.icon}></i>
                <span>{review.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
