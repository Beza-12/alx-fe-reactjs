<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Query Caching Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/react-query@3/dist/react-query.development.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .content {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 30px;
        }
        
        .posts-container {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .sidebar {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .controls {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }
        
        button {
            padding: 12px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        
        .btn-primary {
            background: #6e8efb;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5a7dfa;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: #f5f7fa;
            color: #555;
            border: 1px solid #ddd;
        }
        
        .btn-secondary:hover {
            background: #e8ecf1;
        }
        
        .btn-danger {
            background: #ff6b6b;
            color: white;
        }
        
        .btn-danger:hover {
            background: #ff5252;
        }
        
        .post {
            background: #f9fafc;
            border-left: 4px solid #6e8efb;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 6px;
            transition: transform 0.2s ease;
        }
        
        .post:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .post h3 {
            color: #444;
            margin-bottom: 10px;
        }
        
        .post p {
            color: #666;
        }
        
        .status {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
        }
        
        .loading {
            background: #ffeaa7;
            color: #d35400;
        }
        
        .error {
            background: #ff6b6b;
            color: white;
        }
        
        .success {
            background: #a3e4d7;
            color: #1d8348;
        }
        
        .cache-info {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #eee;
        }
        
        .cache-info h3 {
            margin-bottom: 15px;
            color: #6e8efb;
        }
        
        .cache-item {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 10px;
            font-size: 0.9rem;
        }
        
        .stats {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #6e8efb;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #777;
        }
        
        .feature-demo {
            background: #f0f7ff;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #4dabf7;
        }
        
        .feature-demo h3 {
            color: #339af0;
            margin-bottom: 10px;
        }
        
        .window-focus-demo {
            background: #fff4e6;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #ff922b;
        }
        
        .window-focus-demo h3 {
            color: #f76707;
            margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
            .content {
                grid-template-columns: 1fr;
            }
            
            .controls {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState } = React;
        const { QueryClient, QueryClientProvider, useQuery } = ReactQuery;

        // Create a QueryClient instance
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: true,
                    staleTime: 5 * 60 * 1000,
                    cacheTime: 10 * 60 * 1000,
                },
            },
        });

        // Function to fetch posts from the API
        const fetchPosts = async () => {
            console.log("Fetching posts...");
            // Add a delay to simulate network latency
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        };

        // PostsComponent that uses React Query
        const PostsComponent = () => {
            const [postCount, setPostCount] = useState(5);
            const [simulateError, setSimulateError] = useState(false);
            
            const { data, isLoading, isError, error, refetch, isFetching } = useQuery(
                ['posts', postCount], 
                () => simulateError ? Promise.reject(new Error('Simulated error')) : fetchPosts(),
                {
                    select: (data) => data.slice(0, postCount)
                }
            );
            
            // Function to manually refetch data
            const handleRefetch = () => {
                refetch();
            };
            
            // Function to invalidate and refetch
            const handleInvalidate = () => {
                queryClient.invalidateQueries('posts');
            };
            
            // Function to clear the cache
            const handleClearCache = () => {
                queryClient.removeQueries('posts');
            };
            
            return (
                <div className="container">
                    <header>
                        <h1>React Query Caching Demo</h1>
                        <p className="subtitle">Advanced Data Handling with React Query</p>
                    </header>
                    
                    <div className="content">
                        <div className="posts-container">
                            <h2>Posts from JSONPlaceholder API</h2>
                            <p>Demonstrating data fetching, caching, and state management with React Query</p>
                            
                            <div className="controls">
                                <button className="btn-primary" onClick={handleRefetch} disabled={isFetching}>
                                    {isFetching ? 'Refetching...' : 'Refetch Data'}
                                </button>
                                <button className="btn-secondary" onClick={handleInvalidate}>
                                    Invalidate Queries
                                </button>
                                <button className="btn-danger" onClick={handleClearCache}>
                                    Clear Cache
                                </button>
                                <button className="btn-secondary" onClick={() => setSimulateError(!simulateError)}>
                                    {simulateError ? 'Disable Error Simulation' : 'Simulate Error'}
                                </button>
                                <select value={postCount} onChange={(e) => setPostCount(parseInt(e.target.value))}>
                                    <option value={5}>Show 5 posts</option>
                                    <option value={10}>Show 10 posts</option>
                                    <option value={20}>Show 20 posts</option>
                                    <option value={50}>Show 50 posts</option>
                                </select>
                            </div>
                            
                            {isLoading && (
                                <div className="status loading">
                                    <p>Loading posts...</p>
                                </div>
                            )}
                            
                            {isError && (
                                <div className="status error">
                                    <p>Error: {error.message}</p>
                                    <button className="btn-secondary" onClick={handleRefetch} style={{marginTop: '10px'}}>
                                        Retry
                                    </button>
                                </div>
                            )}
                            
                            {data && (
                                <>
                                    <div className="status success">
                                        <p>Successfully loaded {data.length} posts</p>
                                        {isFetching && <p>Background refetching...</p>}
                                    </div>
                                    
                                    <div className="posts-list">
                                        {data.map((post) => (
                                            <div key={post.id} className="post">
                                                <h3>{post.title}</h3>
                                                <p>{post.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <div className="sidebar">
                            <h3>React Query Cache Info</h3>
                            <p>This demo shows how React Query handles:</p>
                            <ul style={{marginLeft: '20px', marginBottom: '20px'}}>
                                <li>Data fetching and caching</li>
                                <li>Loading and error states</li>
                                <li>Background data refetching</li>
                                <li>Cache invalidation</li>
                                <li><strong>refetchOnWindowFocus</strong> - automatic refetch when window regains focus</li>
                            </ul>
                            
                            <div className="cache-info">
                                <h3>Cache Status</h3>
                                <div className="cache-item">
                                    <strong>Query Key:</strong> ['posts', {postCount}]
                                </div>
                                <div className="cache-item">
                                    <strong>Status:</strong> {isLoading ? 'Loading' : isError ? 'Error' : 'Success'}
                                </div>
                                <div className="cache-item">
                                    <strong>Data Updated At:</strong> {new Date().toLocaleTimeString()}
                                </div>
                                <div className="cache-item">
                                    <strong>Is Fetching:</strong> {isFetching ? 'Yes' : 'No'}
                                </div>
                            </div>
                            
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-value">{postCount}</div>
                                    <div className="stat-label">Posts</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-value">{data ? data.length : 0}</div>
                                    <div className="stat-label">Displayed</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-value">5m</div>
                                    <div className="stat-label">Stale Time</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        // Main App component
        const App = () => {
            return (
                <QueryClientProvider client={queryClient}>
                    <PostsComponent />
                </QueryClientProvider>
            );
        };

        // Render the App
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
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
