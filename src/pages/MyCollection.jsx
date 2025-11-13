import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const MyCollection = () => {
  const navigate = useNavigate();

  // Example data (you can later fetch from backend)
  const [myMovies, setMyMovies] = useState([
    {
      title: "Inception",
      genre: "Sci-Fi",
      releaseYear: 2010,
      director: "Christopher Nolan",
      cast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
      rating: 8.8,
      duration: 148,
      plotSummary:
        "A thief who steals corporate secrets through dream-sharing technology...",
      posterUrl: "https://i.ibb.co/example.jpg",
      language: "English",
      country: "USA",
      addedBy: "user@example.com",
    },
    {
      title: "The Dark Knight",
      genre: "Action, Crime, Drama",
      releaseYear: 2008,
      director: "Christopher Nolan",
      cast: "Christian Bale, Heath Ledger",
      rating: 9.0,
      duration: 152,
      plotSummary:
        "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
      posterUrl: "https://i.ibb.co/Xp4hJw8/dark-knight.jpg",
      language: "English",
      country: "USA",
      addedBy: "user@example.com",
    },
  ]);

  const loggedInUserEmail = "user@example.com"; // Replace later with your auth user

  // ✏️ Handle Edit → Go to Update Page
  const handleEdit = (movie) => {
    navigate(`/edit/${encodeURIComponent(movie.title)}`, { state: { movie } });
  };

  // 🗑️ Handle Delete
  const handleDelete = (title) => {
    setMyMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.title !== title)
    );
    toast.success(`${title} deleted successfully!`);
  };

  return (
    <div className="min-h-screen bg-base-300 text-base-content py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-primary"
        >
          🎞️ My Movie Collection
        </motion.h1>

        {myMovies.length === 0 ? (
          <>
          <p className="text-center text-secondary-content">
            You haven’t added any movies yet.
          </p>
          <Link to="/add-movie" className="btn btn-primary text-base-content">
            <FaPlus className="mr-2" /> Add Your First Movie
         </Link>
          </>
          
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                <Link
                to="/add-movie"
                className="btn btn-primary btn-circle fixed bottom-6 right-6 shadow-lg hover:scale-110 transition-transform"
                >
                <FaPlus className="text-xl" />
                </Link>

            {myMovies
              .filter((movie) => movie.addedBy === loggedInUserEmail)
              .map((movie, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="card bg-base-200 shadow-xl hover:shadow-primary transition-shadow"
                >
                  <figure className="h-72">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="object-cover w-full h-full rounded-t-2xl"
                    />
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title text-lg font-semibold">
                      {movie.title}
                    </h2>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <FaStar /> <span>{movie.rating}</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {movie.genre} • {movie.releaseYear}
                    </p>

                    {/* Quick Actions */}
                    <div className="flex justify-between items-center mt-3">
                      <Link
                        to={`/movies/${encodeURIComponent(movie.title)}`}
                        state={{ movie }}
                        className="btn btn-primary btn-sm"
                      >
                        Details
                      </Link>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="btn btn-warning btn-sm flex items-center gap-1"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(movie.title)}
                          className="btn btn-error btn-sm flex items-center gap-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
