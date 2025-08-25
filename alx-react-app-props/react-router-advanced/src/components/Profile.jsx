import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <h1>User Profile</h1>
      <nav>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}

export default Profile;
