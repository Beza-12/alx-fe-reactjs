// src/PostsComponent.jsx
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";

// Function to fetch posts
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


// Create a QueryClient instance with refetchOnWindowFocus enabled
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true, // This is enabled by default but explicitly set for demonstration
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});

function PostsComponent() {
  // useQuery hook
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
    "posts",        // key for caching
    fetchPosts,     // function to fetch
    {
      staleTime: 5000,   // 5 sec - data considered fresh
      cacheTime: 10000,  // 10 sec - cache kept in memory
    }
  );

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
