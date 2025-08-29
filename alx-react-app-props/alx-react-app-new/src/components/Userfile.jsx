import React from 'react';

const UserProfile = (props) => {
  return (
    <div style={{ 
      border: '2px solid #e0e0e0', 
      padding: '20px', 
      margin: '15px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2c3e50', 
        fontSize: '1.8rem',
        marginBottom: '15px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '5px'
      }}>
        {props.name}
      </h2>
      <p style={{ 
        fontSize: '1.1rem',
        margin: '8px 0',
        color: '#34495e'
      }}>
        Age: <span style={{ 
          fontWeight: 'bold', 
          color: '#e74c3c' 
        }}>
          {props.age}
        </span>
      </p>
      <p style={{ 
        fontSize: '1.1rem',
        margin: '8px 0',
        color: '#2c3e50',
        lineHeight: '1.5'
      }}>
        Bio: {props.bio}
      </p>
    </div>
  );
};

export default UserProfile;