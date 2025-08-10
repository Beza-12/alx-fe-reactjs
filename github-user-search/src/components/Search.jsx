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
        setError("Looks like we can't find the user");
      } else {
        setUserData(response.data);
      }
    } catch (err) {
      setError("Looks like we can't find the user");
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
      
      {error && <p className="error">{error}</p>}

      {/* Using map to display results even for single user */}
      {userData && !error && (
        <div className="results-container">
          {[userData].map(user => (
            <div key={user.id} className="user-card">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                width="100"
                className="avatar"
              />
              <div className="user-details">
                <h2>{user.name || user.login}</h2>
                {user.bio && <p className="bio">{user.bio}</p>}
                <div className="user-stats">
                  <span>Repos: {user.public_repos}</span>
                  <span>Followers: {user.followers}</span>
                  <span>Following: {user.following}</span>
                </div>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  View Profile on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}