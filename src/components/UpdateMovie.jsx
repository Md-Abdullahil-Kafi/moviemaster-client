import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "./providers/AuthProvider";

const UpdateMovie = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movieData = state?.movie;
  const {user} = useContext(AuthContext);
  
  if (!movieData) {
    return (
      <div className="min-h-screen bg-base-300 text-gray-400 flex items-center justify-center">
        <p>Movie not found!</p>
      </div>
    );
  }
  const [formData, setFormData] = useState({ ...movieData });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const payload = { ...formData };
    const id = payload._id ? String(payload._id) : null;
    if (payload._id) delete payload._id;

    if (!id) {
      toast.error("Missing movie id");
      return;
    }

    const token = await user.getIdToken(); 

    const res = await fetch(`http://localhost:3000/movies/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(payload),
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
    toast.success(`${formData.title} updated successfully!`);
    navigate(`/myCollection`);
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Update failed: " + (err.message || "Server error"));
  }
};




  return (
    <div className="min-h-screen bg-base-300 text-base-content flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-base-200 p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          ✏️ Update Movie
        </h1>

        <form onSubmit={handleUpdate} className="grid gap-4">
          {/* Title */}
          <div>
            <label className="label font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="label font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
              required
            />
          </div>

          {/* Release Year */}
          <div>
            <label className="label font-semibold">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
              required
            />
          </div>

          {/* Director */}
          <div>
            <label className="label font-semibold">Director</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Cast */}
          <div>
            <label className="label font-semibold">Cast</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="label font-semibold">Rating</label>
            <input
              type="number"
              step="0.1"
              max="10"
              min="0"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="label font-semibold">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Plot Summary */}
          <div>
            <label className="label font-semibold">Plot Summary</label>
            <textarea
              name="plotSummary"
              value={formData.plotSummary}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-base-300"
              rows="4"
            ></textarea>
          </div>

          {/* Poster URL */}
          <div>
            <label className="label font-semibold">Poster URL</label>
            <input
              type="text"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Language */}
          <div>
            <label className="label font-semibold">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Country */}
          <div>
            <label className="label font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-300"
            />
          </div>

          {/* Added By (Disabled) */}
          <div>
            <label className="label font-semibold">Added By</label>
            <input
              type="email"
              name="addedBy"
              value={formData.addedBy}
              className="input input-bordered w-full bg-base-300"
              disabled
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-primary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateMovie;
