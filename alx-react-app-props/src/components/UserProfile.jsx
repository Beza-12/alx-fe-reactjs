import React, { useContext } from 'react';
import UserContext from '../UserContext';

const UserProfile = (props) => {
  const userData = useContext(UserContext);

  return (
    <div style={{ 
      border: '1px solid gray', 
      padding: '10px', 
      margin: '10px',
      borderRadius: '5px',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{ color: 'blue' }}>{userData.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
      <p>Email: {userData.email}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;