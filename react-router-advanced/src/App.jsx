import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

// Mock Data for Dynamic Routes
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Post', content: 'This is the second blog post.' },
];

// ----------------------
// AUTHENTICATION CONTEXT
// ----------------------
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// ----------------------
// ROUTE COMPONENTS
// ----------------------

// Component for the Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="mb-4">You need to be logged in to view this page.</p>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 transition-colors"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }
  return children;
};

// Component for the Login Page
const Login = () => {
  const { login } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-4">Login Page</h2>
      <button
        className="px-6 py-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 transition-colors"
        onClick={login}
      >
        Log In
      </button>
    </div>
  );
};

// Main App component
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen">
          <header className="p-4 bg-white shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">React Router Demo</h1>
            <nav className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors">Profile</Link>
              <Link to="/post/1" className="text-gray-600 hover:text-blue-600 transition-colors">Post 1</Link>
              <Link to="/blog/1" className="text-gray-600 hover:text-blue-600 transition-colors">Blog Post 1</Link>
              <AuthStatus />
            </nav>
          </header>

          <main className="p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* Protected Route for Profile and its nested routes */}
              <Route
                path="/profile/*"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              {/* Dynamic Route for blog posts */}
              <Route path="/post/:id" element={<Post posts={posts} />} />
              <Route path="/blog/:id" element={<BlogPost posts={posts} />} />
              {/* Catch-all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

// ----------------------
// UI AND NAVIGATION COMPONENTS
// ----------------------

// Component to display login/logout status
const AuthStatus = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <button
          className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 transition-colors"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <span className="text-sm text-gray-500">Not Logged In</span>
      )}
    </div>
  );
};

// Component for Home page
const Home = () => (
  <div className="p-8 bg-white shadow-md rounded-lg">
    <h2 className="text-3xl font-bold mb-4">Home Page</h2>
    <p>Welcome to the advanced React Router demo. Navigate using the links above to see different routing techniques in action.</p>
  </div>
);

// Component for Profile (contains nested routes)
const Profile = () => (
  <div className="p-8 bg-white shadow-md rounded-lg">
    <h2 className="text-3xl font-bold mb-4">Profile Page</h2>
    <div className="border-b-2 border-gray-200 mb-4 pb-2 flex space-x-4">
      <Link to="details" className="text-blue-500 hover:underline">Details</Link>
      <Link to="settings" className="text-blue-500 hover:underline">Settings</Link>
    </div>
    <div className="mt-4">
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  </div>
);

// Component for Profile Details
const ProfileDetails = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h3 className="text-xl font-semibold mb-2">Profile Details</h3>
    <p>This is the user's profile information.</p>
  </div>
);

// Component for Profile Settings
const ProfileSettings = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
    <p>You can change your settings here.</p>
  </div>
);

// Component for Dynamic Post pages
const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-xl font-semibold">Post Not Found!</h2>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
};

// Component for a blog post, using a dynamic route.
const BlogPost = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-xl font-semibold">Blog Post Not Found!</h2>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-2">{`Blog: ${post.title}`}</h2>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
};

// Component for 404 Not Found page
const NotFound = () => (
  <div className="p-8 text-center bg-gray-100 rounded-lg">
    <h2 className="text-3xl font-bold mb-2">404 - Page Not Found</h2>
    <p className="text-gray-600">The page you are looking for does not exist.</p>
  </div>
);