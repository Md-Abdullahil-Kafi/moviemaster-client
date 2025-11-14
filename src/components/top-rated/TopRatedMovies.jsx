import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://moviemaster-server-omega.vercel.app/topMovies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching latest movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-white">
        🎬 Top Rated Movies
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <motion.div
              key={movie.id ?? movie._id}
              className="bg-base-200 rounded-xl shadow-md overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/movies/${movie._id}`}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-60 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.genre}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopRatedMovies;
