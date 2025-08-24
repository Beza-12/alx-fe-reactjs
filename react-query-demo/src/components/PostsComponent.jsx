// src/components/PostsComponent.jsx
import React from 'react';
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const PostsComponent = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // Advanced Configuration Options
    staleTime: 5 * 60 * 1000, // Data becomes "stale" after 5 minutes
    cacheTime: 10 * 60 * 1000, // Data is garbage collected after 10 minutes of inactivity
    refetchOnWindowFocus: true, // Re-fetches data when the window is refocused
    keepPreviousData: false, // Keeps the previous data while fetching new data
  });

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="posts-container">
      <h1 className="title">Posts</h1>
      <button className="refetch-button" onClick={() => refetch()} disabled={isFetching}>
        Refetch Posts
      </button>
      {isFetching && <span> (Updating...)</span>}
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </li>
        ))}
      </ul>
      {isPreviousData && <div className="previous-data-note">Displaying cached data...</div>}
    </div>
  );
};

export default PostsComponent;