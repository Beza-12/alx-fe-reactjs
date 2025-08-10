import { useState } from 'react';
import { searchUsers } from '../services/githubService';
import axios from 'axios';

// Create configured axios instance
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

/**
 * Fetches GitHub user data
 * @param {string} username - GitHub username to search for
 * @returns {Promise<{data: object|null, error: string|null}>}
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
export const fetchUserData = async (username) => {
  try {
    // Make GET request to GitHub API
    const response = await githubApi.get(`/users/${username}`);
    
    // Return successful response data
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
    // Handle different error cases
    if (error.response) {
      // GitHub API returned an error response
      if (error.response.status === 404) {
        return { data: null, error: "Looks like we can't find the user" };
      }
      return { data: null, error: "GitHub API error occurred" };
    } else if (error.request) {
      // Request was made but no response received
      return { data: null, error: "Network error - no response from server" };
    } else {
      // Other errors
      return { data: null, error: "An unexpected error occurred" };
    }
  }
};
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