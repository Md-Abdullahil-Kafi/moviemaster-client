import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../components/providers/AuthProvider";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const data = useLoaderData() || [];

  const [myMovies, setMyMovies] = useState([]);

  const filteredByUser = useMemo(() => {
    if (!Array.isArray(data) || !user?.email) return [];

    const email = String(user.email).toLowerCase();
    return data.filter((movie) => {
      const owner =
        (movie.addedBy ?? movie.owner ?? movie.userEmail ?? "").toString();
      return owner.toLowerCase() === email;
    });
  }, [data, user]);

  useEffect(() => {
    const a = myMovies;
    const b = filteredByUser;

    const sameLength = a.length === b.length;
    const firstEqual =
      sameLength &&
      ((a[0]?._id ?? a[0]?.title) === (b[0]?._id ?? b[0]?.title));

    if (!sameLength || !firstEqual) {
      setMyMovies(b);
    }
  }, [filteredByUser]);

  const loggedInUserEmail = user?.email;

  const handleEdit = (movie) => {
    const id = movie._id ? encodeURIComponent(String(movie._id)) : encodeURIComponent(movie.title);
    navigate(`/updateMovie/${id}`, { state: { movie } });
  };

  const handleDelete = (identifier) => {
    setMyMovies((prevMovies) =>
      prevMovies.filter((movie) => {
        if (movie._id) return String(movie._id) !== String(identifier);
        return movie.title !== identifier;
      })  
    );
    toast.success(`${identifier} deleted successfully!`);
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
                      to={`/movies/${movie._id ? encodeURIComponent(String(movie._id)) : encodeURIComponent(movie.title)}`}
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
                        onClick={() => handleDelete(movie._id ? String(movie._id) : movie.title)}
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
