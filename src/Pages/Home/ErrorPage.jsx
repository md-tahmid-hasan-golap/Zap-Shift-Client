import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4">
      <h1 className="text-9xl font-extrabold drop-shadow-lg">404</h1>
      <p className="text-2xl mt-4 font-semibold">Oops! Page Not Found 😢</p>
      <p className="mt-2 text-lg text-white/80 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300"
      >
        ⬅ Go Back Home
      </Link>

      {/* Optional: Add funny emoji or illustration */}
      <div className="mt-10"></div>
    </div>
  );
};

export default ErrorPage;
