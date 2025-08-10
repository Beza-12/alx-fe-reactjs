import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Create a configured axios instance
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

/**
 * Fetches a single user's data
 * @param {string} username - GitHub username
 * @returns {Promise<{data: object|null, error: string|null}>}
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.status === 404 
        ? 'User not found' 
        : 'An error occurred'
    };
  }
};

/**
 * Basic user search
 * @param {string} username - Search query
 * @returns {Promise<array>} - Array of user objects
 */
export const searchUsers = async (username) => {
  try {
    const response = await githubApi.get(`/search/users?q=${username}`);
    return response.data.items;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

/**
 * Advanced user search with multiple parameters
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search
 * @param {string} params.location - Location filter
 * @param {number} params.minRepos - Minimum repositories
 * @param {string} params.language - Programming language
 * @param {number} params.page - Pagination page
 * @returns {Promise<{items: array, total_count: number, error: string|null}>}
 */
export const advancedSearchUsers = async ({ username, location, minRepos, language, page = 1 }) => {
  try {
    const queryParts = [];
    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:${location}`);
    if (minRepos) queryParts.push(`repos:>${minRepos}`);
    if (language) queryParts.push(`language:${language}`);

    const response = await githubApi.get('/search/users', {
      params: {
        q: queryParts.join(' '),
        page,
        per_page: 30
      }
    });

    return {
      items: response.data.items,
      total_count: response.data.total_count,
      error: null
    };
  } catch (error) {
    console.error('Advanced search error:', error);
    return {
      items: [],
      total_count: 0,
      error: 'An error occurred during search'
    };
  }
};

/**
 * Gets detailed user information
 * @param {string} username - GitHub username
 * @returns {Promise<object|null>} - User details
 */
export const getUserDetails = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};