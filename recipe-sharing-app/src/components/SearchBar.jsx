import React from 'react';
import useRecipeStore from '../store/recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px',
          outline: 'none',
          transition: 'border-color 0.3s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
      {searchTerm && (
        <p style={{ 
          margin: '8px 0 0 0', 
          fontSize: '14px', 
          color: '#666' 
        }}>
          Found {useRecipeStore.getState().filteredRecipes.length} recipes matching "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default SearchBar;