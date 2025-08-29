import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import ProfileDetails from './components/profileDetails.jsx';
import ProfileSettings from './components/profileSettings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BlogPost from './components/BlogPost.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/posts/1">Post 1</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected and Nested Profile Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<p>Select a tab above to see details or settings.</p>} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="/blog/:id" element={<BlogPost />} />

          </Route>
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/posts/1">Post 1</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected and Nested Profile Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<p>Select a tab above to see details or settings.</p>} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="/posts/:id" element={<BlogPost />} />

          </Route>
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
