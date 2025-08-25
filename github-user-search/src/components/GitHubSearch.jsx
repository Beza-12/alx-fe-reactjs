import { useState } from 'react';
import axios from 'axios';

// Create configured axios instance
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

/**
 * Basic user search
 */
export const searchUsers = async (username) => {
  try {
    const response = await githubApi.get(`/search/users?q=${username}`);
    return response.data.items;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

/**
 * Advanced user search with multiple parameters
 */
export const advancedSearchUsers = async (params) => {
  try {
    const queryParts = [];
    
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:${params.location}`);
    if (params.minRepos) queryParts.push(`repos:>${params.minRepos}`);
    if (params.language) queryParts.push(`language:${params.language}`);
    
    const query = queryParts.join(' ');
    const response = await githubApi.get('/search/users', {
      params: {
        q: query,
        page: params.page || 1,
        per_page: 30
      }
    });

    // Get detailed info for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async user => {
        const userDetails = await githubApi.get(`/users/${user.login}`);
        return {
          ...user,
          ...userDetails.data
        };
      })
    );

    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw error;
  }
};

/**
 * Single user fetch
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return {
      data: {
        login: response.data.login,
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        html_url: response.data.html_url,
        bio: response.data.bio,
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following
      },
      error: null
    };
  } catch (error) {
    if (error.response) {
      return { 
        data: null, 
        error: error.response.status === 404 
          ? "Looks like we can't find the user" 
          : "GitHub API error occurred" 
      };
    }
    return { 
      data: null, 
      error: error.request 
        ? "Network error - no response from server" 
        : "An unexpected error occurred" 
    };
  }
};

export default function GitHubSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    minRepos: '',
    language: ''
  });

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      // Use advanced search if any additional parameters are provided
      if (searchParams.location || searchParams.minRepos || searchParams.language) {
        const results = await advancedSearchUsers({
          username: searchTerm,
          ...searchParams
        });
        setUsers(results.items);
      } else {
        const results = await searchUsers(searchTerm);
        setUsers(results);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="github-search">
      <div className="search-inputs">
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
      </div>

      <div className="advanced-params">
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleParamChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="minRepos"
          value={searchParams.minRepos}
          onChange={handleParamChange}
          placeholder="Min repos"
          min="0"
        />
        <input
          type="text"
          name="language"
          value={searchParams.language}
          onChange={handleParamChange}
          placeholder="Language"
        />
      </div>
      
      {users.length > 0 && (
        <div className="results">
          <h3>Search Results:</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  <img src={user.avatar_url} alt={user.login} width="30" />
                  <span>{user.login}</span>
                  {user.location && <span> | {user.location}</span>}
                  {user.public_repos && <span> | Repos: {user.public_repos}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}