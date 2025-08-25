import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  if (recommendations.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        border: '2px dashed #2196f3',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#1565c0', marginBottom: '10px' }}>Personalized Recommendations</h3>
        <p style={{ color: '#1976d2', marginBottom: '15px' }}>
          Get personalized recipe recommendations based on your favorites!
        </p>
        <button
          onClick={generateRecommendations}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Generate Recommendations
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ 
          color: '#1565c0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '1.5em' }}>🌟</span>
          Recommended For You ({recommendations.length})
        </h2>
        <button
          onClick={generateRecommendations}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Refresh
        </button>
      </div>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {recommendations.map((recipe) => (
          <div key={recipe.id} style={{
            border: '2px solid #bbdefb',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#fff'
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
                color: '#1565c0',
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
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                color: '#2196f3', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              View Recipe →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;