import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333',
          marginBottom: '30px'
        }}>
          Recipe Sharing App
        </h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <SearchBar />
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;