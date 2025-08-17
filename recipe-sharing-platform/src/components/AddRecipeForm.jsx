import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    } else if (ingredients.split('\n').filter(line => line.trim()).length < 2) {
      newErrors.ingredients = 'Please enter at least two ingredients (one per line).';
    }
    if (!steps.trim()) newErrors.steps = 'Preparation steps are required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    if (validate()) {
      setSuccess(true);
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-100/80 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="animate-fadeInUp w-full max-w-xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-10 relative"
        style={{ animation: 'fadeInUp 0.6s ease-out' }}
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-8 text-center tracking-tight">
          Add a New Recipe
        </h2>

        {success && (
          <div className="mb-4 p-3 bg-green-100/70 text-green-700 rounded-lg border border-green-200 text-center font-semibold shadow">
            Recipe submitted successfully!
          </div>
        )}

        {/* Input: Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`w-full px-5 py-3 border-2 rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg placeholder-gray-400 ${
              errors.title ? 'border-red-400' : 'border-blue-200'
            }`}
            placeholder="e.g. Chocolate Cake"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.title}</p>}
        </div>

        {/* Input: Ingredients */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Ingredients <span className="text-xs text-gray-400">(one per line)</span>
          </label>
          <textarea
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            rows={4}
            className={`w-full px-5 py-3 border-2 rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 ${
              errors.ingredients ? 'border-red-400' : 'border-blue-200'
            }`}
            placeholder={'e.g.\n2 cups flour\n1 cup sugar'}
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.ingredients}</p>}
        </div>

        {/* Input: Steps */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">Preparation Steps</label>
          <textarea
            value={steps}
            onChange={e => setSteps(e.target.value)}
            rows={4}
            className={`w-full px-5 py-3 border-2 rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base placeholder-gray-400 ${
              errors.steps ? 'border-red-400' : 'border-blue-200'
            }`}
            placeholder={'e.g.\nMix ingredients\nBake at 350°F for 30 minutes'}
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1 font-semibold">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 border-2 border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          <span className="tracking-wide flex items-center justify-center gap-2 text-lg font-extrabold text-white drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Submit Recipe
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
