import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;
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
