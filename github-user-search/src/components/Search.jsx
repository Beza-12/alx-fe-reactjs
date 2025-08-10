import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);
    
    try {
      const response = await fetchUserData(username);
      
      if (response.error) {
        setError("Looks like we can't find the user");  // Fixed: Added apostrophe
      } else {
        setUserData(response.data);
      }
    } catch (err) {
      setError("Looks like we can't find the user");  // Fixed: Added apostrophe
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      
      {/* Exact error message with proper apostrophe */}
      {error && <p className="error">{error}</p>}

      {userData && !error && (
        <div className="user-card">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            width="100"
            className="avatar"
          />
          <div className="user-details">
            <h2>{userData.name || userData.login}</h2>
            {userData.bio && <p className="bio">{userData.bio}</p>}
            <div className="user-stats">
              <span>Repos: {userData.public_repos}</span>
              <span>Followers: {userData.followers}</span>
              <span>Following: {userData.following}</span>
            </div>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              View Profile on GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
}