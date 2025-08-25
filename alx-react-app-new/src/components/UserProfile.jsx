import React from 'react';

const UserProfile = (props) => {
  return (
    <div style={{ 
      border: '1px solid gray', 
      padding: '10px', 
      margin: '10px',
      borderRadius: '5px',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{ 
        color: 'blue', 
        fontSize: '1.5rem',
        marginBottom: '10px'
      }}>
        {props.name}
      </h2>
      <p style={{ 
        fontSize: '1rem',
        margin: '5px 0',
        color: '#333'
      }}>
        Age: <span style={{ 
          fontWeight: 'bold', 
          color: '#e74c3c' 
        }}>
          {props.age}
        </span>
      </p>
      <p style={{ 
        fontSize: '1rem',
        margin: '5px 0',
        color: '#555',
        lineHeight: '1.4'
      }}>
        Bio: {props.bio}
      </p>
    </div>
  );
};

export default UserProfile;