import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      deleteRecipe(recipeId);
      navigate('/'); // Redirect to home after deletion
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;