import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * Fetches a single user's data
 * @param {string} username - GitHub username to search for
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: "Looks like we can't find the user"
    };
  }
};

/**
 * Advanced search for GitHub users with multiple parameters
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search for
 * @param {string} params.location - Location filter
 * @param {number} params.minRepos - Minimum repositories filter
 * @param {number} params.page - Pagination page number
 */
export const advancedSearchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    // Build query string
    let queryParts = [];
    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:${location}`);
    if (minRepos) queryParts.push(`repos:>${minRepos}`);

    const query = queryParts.join(' ');
    
    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: 10
      }
    });

    // Get detailed info for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(`${GITHUB_API_URL}/users/${user.login}`);
        return userDetails.data;
      })
    );

    return {
      items: usersWithDetails,
      total_count: response.data.total_count,
      error: null
    };
  } catch (error) {
    console.error('Advanced search error:', error);
    return {
      items: [],
      total_count: 0,
      error: "An error occurred during search"
    };
  }
};