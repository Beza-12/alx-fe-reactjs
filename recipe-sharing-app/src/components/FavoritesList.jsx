import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
  );
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  if (favorites.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        backgroundColor: '#fff8e1',
        borderRadius: '8px',
        border: '2px dashed #ffd54f',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#ff6f00', marginBottom: '10px' }}>No Favorites Yet</h3>
        <p style={{ color: '#ff8f00' }}>
          Start adding recipes to your favorites by clicking the heart icon! ❤️
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2 style={{ 
        color: '#d32f2f', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '1.5em' }}>❤️</span>
        My Favorite Recipes ({favorites.length})
      </h2>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {favorites.map((recipe) => (
          recipe && (
            <div key={recipe.id} style={{
              border: '2px solid #ffcdd2',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              position: 'relative'
            }}>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{ 
                  textDecoration: 'none', 
                  color: '#2c3e50' 
                }}
              >
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  color: '#d32f2f',
                  fontSize: '1.2rem'
                }}>
                  {recipe.title}
                </h3>
              </Link>
              <p style={{ 
                margin: '0 0 15px 0', 
                color: '#666',
                lineHeight: '1.4'
              }}>
                {recipe.description.length > 100 
                  ? `${recipe.description.substring(0, 100)}...` 
                  : recipe.description
                }
              </p>
              
              <button
                onClick={() => removeFavorite(recipe.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Remove from Favorites
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;