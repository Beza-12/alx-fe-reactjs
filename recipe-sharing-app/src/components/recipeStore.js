import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  // Recipe actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: get().filterRecipes([...state.recipes, newRecipe], get().searchTerm)
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
      filteredRecipes: get().filterRecipes(updatedRecipes, state.searchTerm)
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
  }
}))

export default useRecipeStore;