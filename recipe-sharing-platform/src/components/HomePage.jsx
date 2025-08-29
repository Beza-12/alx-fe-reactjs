import React from "react";
import { Link } from "react-router-dom";
import recipes from "../data.json";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto mb-12 gap-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-center sm:text-left">
          Recipe Sharing Platform
        </h1>
        <Link
          to="/add"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Recipe
        </Link>
      </div>

      {/* Recipe Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 group"
          >
            <div className="overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                {recipe.title}
              </h2>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                {recipe.summary}
              </p>
              <Link
                to={`/recipe/${recipe.id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
