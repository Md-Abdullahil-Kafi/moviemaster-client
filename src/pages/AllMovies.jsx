import { motion } from "framer-motion";
import { Link, useLoaderData} from "react-router";
import { FaStar } from "react-icons/fa";
import Container from "../components/Container";



const AllMovies = () => {
  const data = useLoaderData();
  
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
          🎬 All Movies
        </motion.h1>

        {/* Movie Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((movie, index) => (
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
                
                <div className="card-actions justify-end mt-3">
                  <Link
                    to={`/movies/${movie._id}`}
                    state={{ movie }}
                    className="btn btn-primary btn-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </Container>
  );
};

export default AllMovies;
