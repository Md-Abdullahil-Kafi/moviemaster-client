import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "./providers/AuthProvider";

const AddMovie = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  // Simulate logged-in user (replace with your auth data)
  const loggedInUser = { email: `${user.email}` };

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
    addedBy: loggedInUser.email,
    created_at: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally you'd send this data to your backend here
    fetch('http://localhost:3000/movies/add',{
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(formData) 
    })
    .then(res => res.json())
    .then(data => {
      toast.success(`${formData.title} added successfully! 🎬`);
      navigate("/myCollection");
    }).catch(err => {
      console.log(err)
    })

  };

  return (
    <div className="min-h-screen bg-base-300 flex justify-center items-center p-6 text-base-content ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-base-200 p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          🎥 Add New Movie
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
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
              type="date"
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
              step="0.5"
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

          {/* Added By (Read Only) */}
          <div>
            <label className="label font-semibold">Added By</label>
            <input
              type="email"
              name="addedBy"
              value={formData.addedBy}
              className="input input-bordered w-full bg-base-300"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Add Movie
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddMovie;
