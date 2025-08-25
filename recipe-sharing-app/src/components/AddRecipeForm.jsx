import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      addRecipe({ id: Date.now(), title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginBottom: '20px',
      backgroundColor: '#fff'
    }}>
      <h2>Add New Recipe</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            resize: 'vertical'
          }}
          required
        />
      </div>
      <button type="submit" style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;