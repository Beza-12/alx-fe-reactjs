import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '15px',
      marginTop: '20px',
      position: 'relative',
      bottom: '0',
      width: '100%'
    }}>
      <p style={{ 
        margin: 0,
        fontSize: '1rem'
      }}>
        © 2024 My Travel Blog. All rights reserved.
      </p>
      <p style={{ 
        margin: '5px 0 0 0',
        fontSize: '0.9rem',
        color: '#bdc3c7'
      }}>
        Created with React
      </p>
    </footer>
  );
};

export default Footer;
