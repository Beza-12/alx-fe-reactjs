import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import useRecipeStore from './store/recipeStore';
import { useEffect } from 'react';
import './App.css';

function App() {
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Generate recommendations when the app loads
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <Router>
      <div className="App" style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333',
          marginBottom: '10px'
        }}>
          Recipe Sharing App
        </h1>
        
        <Routes>
          <Route path="/" element={
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
              <div>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
              </div>
              <div>
                <FavoritesList />
                <RecommendationsList />
              </div>
            </div>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;