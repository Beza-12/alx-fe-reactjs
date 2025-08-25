import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const advancedSearchUsers = async (params) => {
  try {
    const queryParts = [];
    
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:${params.location}`);
    if (params.minRepos) queryParts.push(`repos:>${params.minRepos}`);
    
    const response = await axios.get(
      `https://api.github.com/search/users?q=${queryParts.join('+')}`,
      {
        params: {
          page: params.page || 1,
          per_page: 30
        }
      }
    );

    return {
      items: response.data.items,
      total_count: response.data.total_count,
      error: null
    };
  } catch (error) {
    return {
      items: [],
      total_count: 0,
      error: 'Search failed'
    };
  }
};

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
      error: error.response?.status === 404 
        ? 'User not found' 
        : 'An error occurred'
    };
  }
};

export const searchUsers = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/users?q=${username}`);
    return response.data.items;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};