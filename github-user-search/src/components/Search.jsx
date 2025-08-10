import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    
    try {
      const { data, error: apiError } = await fetchUserData(username);
      
      if (apiError) {
        setError("Looks like we can't find the user"); // Exact error message here
      } else {
        setUserData(data);
      }
    } catch (err) {
      setError("Looks like we can't find the user"); // Consistent error message
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      
      {/* Exact error message display */}
      {error === "Looks like we can't find the user" && (
        <p className="error">Looks like we can't find the user</p>
      )}

      {userData && !error && (
        <div className="user-card">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            width="100"
          />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio || 'No bio available'}</p>
          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}