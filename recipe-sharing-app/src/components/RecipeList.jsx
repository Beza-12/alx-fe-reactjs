import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';
const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No recipes yet. Add your first recipe above!
        </p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
          }}>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                textDecoration: 'none', 
                color: '#2c3e50' 
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>
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
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                color: '#2196F3', 
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              View Details →
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;