import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../components/providers/AuthProvider";
import Container from "../components/Container";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myMovies, setMyMovies] = useState([]);

useEffect(() => {
  if (!user?.email) return;
  const fetchMovies = async () => {
    try {
      const token = user.accessToken;
      const res = await fetch(
        `http://localhost:3000/my-collection?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,   
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();
      setMyMovies(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  fetchMovies();
}, [user]);

  const handleEdit = (movie) => {
    const id = movie._id
      ? encodeURIComponent(String(movie._id))
      : encodeURIComponent(movie.title);
    navigate(`/updateMovie/${id}`, { state: { movie } });
  };

  return (
    <Container>
      <div className="min-h-screen text-base-content py-10 px-5">
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
              <Link
                to="/add-movie"
                className="btn btn-primary text-base-content"
              >
                <FaPlus className="mr-2" /> Add Your First Movie
              </Link>
            </>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Link
                to="/add-movie"
                className="btn btn-primary btn-circle fixed bottom-6 right-6 shadow-lg hover:scale-110 transition-transform"
              >
                <FaPlus className="text-xl" />
              </Link>

              {myMovies.map((movie, index) => (
                <motion.div
                  key={movie._id ? String(movie._id) : index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="card bg-base-200 shadow-xl hover:shadow-primary transition-shadow"
                >
                  <figure className="h-72">
                    <img
                      src={movie.posterUrl || "https://i.ibb.co/example.jpg"}
                      alt={movie.title}
                      className="object-cover w-full h-full rounded-t-2xl"
                    />
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title text-lg font-semibold">
                      {movie.title}
                    </h2>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <FaStar /> <span>{movie.rating ?? "N/A"}</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {movie.genre} • {movie.releaseYear}
                    </p>

                    {/* Quick Actions */}
                    <div className="flex justify-between items-center mt-3">
                      <Link
                        to={`/movies/${
                          movie._id
                            ? encodeURIComponent(String(movie._id))
                            : encodeURIComponent(movie.title)
                        }`}
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

                        
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyCollection;
