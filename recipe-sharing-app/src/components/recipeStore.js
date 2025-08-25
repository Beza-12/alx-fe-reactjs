import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
  // Recipe actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: get().filterRecipes([...state.recipes, newRecipe], state.searchTerm)
  })),
  
  updateRecipe: (id, updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm)
    };
  }),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm),
      favorites: state.favorites.filter(favId => favId !== id)
    };
  }),
  
  setRecipes: (recipes) => set({ 
    recipes,
    filteredRecipes: get().filterRecipes(recipes, get().searchTerm)
  }),
  
  // Search actions
  setSearchTerm: (term) => set((state) => ({ 
    searchTerm: term,
    filteredRecipes: get().filterRecipes(state.recipes, term)
  })),
  
  filterRecipes: (recipes, searchTerm) => {
    if (!searchTerm.trim()) return recipes;
    
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => ({ 
    favorites: [...state.favorites, recipeId] 
  })),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set((state) => {
    const isFavorite = state.favorites.includes(recipeId);
    return {
      favorites: isFavorite
        ? state.favorites.filter(id => id !== recipeId)
        : [...state.favorites, recipeId]
    };
  }),
  
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Recommendations actions
  generateRecommendations: () => set((state) => {
    if (state.favorites.length === 0) {
      // If no favorites, show random recipes
      const randomRecipes = [...state.recipes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      return { recommendations: randomRecipes };
    }
    
    // Generate recommendations based on favorites
    const favoriteCategories = state.favorites.map(favId => {
      const recipe = state.recipes.find(r => r.id === favId);
      return recipe ? recipe.title.toLowerCase() : '';
    });
    
    const recommended = state.recipes
      .filter(recipe => 
        !state.favorites.includes(recipe.id) && // Don't recommend already favorited
        favoriteCategories.some(category =>
          recipe.title.toLowerCase().includes(category) ||
          recipe.description.toLowerCase().includes(category)
        )
      )
      .slice(0, 5);
    
    return { recommendations: recommended };
  })
}))

export default useRecipeStore;