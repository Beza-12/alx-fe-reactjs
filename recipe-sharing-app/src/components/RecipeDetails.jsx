import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId));
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <Link to="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>
          ← Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ color: '#4CAF50', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
        ← Back to Recipes
      </Link>
      
      <div style={{
        border: '2px solid #4CAF50',
        padding: '25px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isFavorite ? '#d32f2f' : '#ccc',
            transition: 'color 0.3s ease'
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <h1 style={{ color: '#2c3e50', marginBottom: '15px', paddingRight: '60px' }}>
          {recipe.title}
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.6', 
          color: '#34495e',
          marginBottom: '25px'
        }}>
          {recipe.description}
        </p>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;