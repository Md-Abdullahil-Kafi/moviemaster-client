import React from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-base-100 text-base-content">
      <h1 className="text-6xl font-bold mb-4 text-error">404</h1>
      <p className="text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <FaHome /> Go Home
      </Link>
    </div>
  );
};

export default NotFound;
