import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FaArrowLeft, FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "./providers/AuthProvider";
import swal from "sweetalert2";
import toast from "react-hot-toast";




const MovieDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {setLoading} = useContext(AuthContext);
  const [movie, setMovie] = useState({});
  const {id} = useParams();
  const {loading}= useContext(AuthContext)
  
  
  useEffect(() => {
  const fetchMovie = async () => {
    try {
      const token = await user.getIdToken(); 
      const res = await fetch(`http://localhost:3000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        return;
      }

      const data = await res.json();
      setMovie(data.result);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMovie();
}, [id, user]);

  const loggedInUserEmail = user?.email;

  if (!movie)
    return (
      <div className="min-h-screen bg-base-300 text-gray-400 flex items-center justify-center">
        <p>Movie not found!</p>
      </div>
    );

  const isOwner = movie.addedBy === loggedInUserEmail;

    // Handle WatchList
    const handleAddWatchList = async (movie) => {
        try {
            const res = await fetch('http://localhost:3000/myWatchList', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(movie),
            });
        
            if (!res.ok) {
              let errText;
              try {
                const errJson = await res.json();
                errText = errJson.message || JSON.stringify(errJson);
              } catch {
                errText = await res.text();
              }
              throw new Error(errText || `Request failed with status ${res.status}`);
            }
        
            const data = await res.json();
            toast.success(`${movie.title} added successfully! 🎬`);
          } catch (err) {
            console.error("Add movie failed:", err);
            toast.error("Add movie failed: " + (err.message || "Server error"));
          }
        
    
      };
  

  // safer delete
  const handleDelete = async () => {
  const confirmed = await swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmed.isConfirmed) return;

  try {
    const token = await user.getIdToken(); // Firebase ID token

    const res = await fetch(
      `http://localhost:3000/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (!res.ok) {
      let errBody;
      try {
        errBody = await res.json();
        throw new Error(errBody.message || JSON.stringify(errBody));
      } catch (jsonErr) {
        const txt = await res.text();
        throw new Error(txt || `Request failed with status ${res.status}`);
      }
    }

    const result = await res.json();
    await swal.fire("Deleted!", "The movie has been deleted.", "success");
    navigate("/myCollection");
  } catch (err) {
    console.error("Delete failed:", err);
    swal.fire("Error", "Delete failed: " + (err.message || "Server error"), "error");
  }
};


  const handleEdit = () => {
    navigate(`/updateMovie/${movie._id}`, { state: { movie } });
  };

  return (
    <div className="min-h-screen bg-base-300 text-gray-100 p-6 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-base-200 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <img src={movie.posterUrl} alt={movie.title} className="w-full md:w-1/3 object-cover" />

          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <div className="flex justify-between">
              <h1 className="text-3xl font-bold mb-2 text-primary">{movie.title}</h1>

              <button
                      onClick={() => handleAddWatchList(movie)}
                      className="btn btn-soft  transition"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add to Watchlist"}
                    </button>

              </div>

              <div className="flex items-center gap-2 text-yellow-400 mb-3">
                <FaStar /> <span>{movie.rating}</span>
              </div>

              <p className="text-gray-400 mb-2">
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Release Year:</strong> {movie.releaseYear}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Duration:</strong> {movie.duration} min
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Language:</strong> {movie.language}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Country:</strong> {movie.country}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Director:</strong> {movie.director}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Cast:</strong> {movie.cast}
              </p>

              <div className="mt-4">
                <strong className="text-gray-300">Plot Summary:</strong>
                <p className="text-gray-400 mt-1">{movie.plotSummary}</p>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <strong>Added By:</strong> {movie.addedBy}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button onClick={() => navigate(-1)} className="btn btn-outline btn-primary flex items-center gap-2">
                <FaArrowLeft /> Back
              </button>

              {isOwner && (
                <div className="flex gap-3">
                  <button onClick={handleEdit} className="btn btn-warning flex items-center gap-2">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={handleDelete} className="btn btn-error flex items-center gap-2">
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieDetails;
