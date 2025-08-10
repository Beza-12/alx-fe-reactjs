import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { searchUsers } from './services/githubService';

function App() {
  const [count, setCount] = useState(0);
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
    <>
      {/* Keep all existing Vite/React elements */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + GitHub Search</h1> {/* Updated title */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        {/* Add GitHub search components below */}
        <div className="github-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search GitHub users"
            style={{ margin: '10px 0', padding: '8px', width: '300px' }}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            style={{ marginLeft: '10px', padding: '8px 16px' }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          
          {users.length > 0 && (
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <h3>Search Results:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                  <li key={user.id} style={{ margin: '10px 0' }}>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={user.avatar_url} 
                        alt={user.login} 
                        width="30" 
                        style={{ verticalAlign: 'middle', marginRight: '10px' }}
                      />
                      {user.login}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;