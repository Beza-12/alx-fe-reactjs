import React from 'react';
import { useParams, Link } from 'react-router-dom';
import recipes from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-50">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text mb-3">
          Recipe Not Found
        </h2>
        <Link
          to="/"
          className="mt-2 inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const ingredients = recipe.ingredients || ['1 cup ingredient A', '2 tbsp ingredient B', 'Salt to taste'];
  const instructions = recipe.instructions || [
    'Step 1: Do something important.',
    'Step 2: Continue with the next step.',
    'Step 3: Finish and serve.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 flex justify-center">
      <div className="max-w-3xl w-full backdrop-blur-lg bg-white/70 border border-white/40 rounded-3xl shadow-xl overflow-hidden">
        {/* Image */}
        <div className="relative h-72 overflow-hidden group">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
            Featured
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            {recipe.title}
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">{recipe.summary}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-white/60 rounded-xl p-5 shadow-inner border border-blue-100">
              <h2 className="text-xl font-bold mb-3 text-blue-700">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white/60 rounded-xl p-5 shadow-inner border border-blue-100">
              <h2 className="text-xl font-bold mb-3 text-blue-700">Instructions</h2>
              <ol className="list-decimal list-inside space-y-1 text-gray-800">
                {instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-end">
            <Link
              to="/"
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
