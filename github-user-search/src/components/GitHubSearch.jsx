import { useState } from 'react';
import { searchUsers } from '../services/githubService';

export default function GitHubSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchUsers(searchTerm);
      setUsers(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GitHub users"
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {users.length > 0 && (
        <div className="results">
          <h3>Search Results:</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  <img src={user.avatar_url} alt={user.login} width="30" />
                  {user.login}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}