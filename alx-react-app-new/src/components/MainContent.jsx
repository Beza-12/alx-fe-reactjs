import React from 'react';

const MainContent = () => {
  return (
    <main style={{ 
      backgroundColor: '#f0f8ff',
      padding: '20px',
      margin: '15px',
      borderRadius: '8px',
      border: '1px solid #ddd'
    }}>
      <h2 style={{ 
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '15px'
      }}>
        My Travel Experiences
      </h2>
      <p style={{ 
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#34495e'
      }}>
        I love to visit New York, Paris, and Tokyo. Each city offers unique experiences and cultural insights that make traveling so rewarding.
      </p>
    </main>
  );
};

export default MainContent;