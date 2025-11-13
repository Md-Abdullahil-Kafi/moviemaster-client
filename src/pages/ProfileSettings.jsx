import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaCalendarAlt, FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../components/providers/AuthProvider";
import toast from "react-hot-toast";
import auth from "../components/firebase/firebase.config";
import { updateProfile } from "firebase/auth";

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
  });

  // Initialize form when user loads / changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error("No authenticated user found.");
      return;
    }

    setLoading(true);
    try {
      // Only update displayName and photoURL (email is read-only here)
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      // Try to reload the current user so SDK reflects changes (if method exists)
      if (typeof auth.currentUser.reload === "function") {
        await auth.currentUser.reload();
      }

      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  // Friendly joined date
  const joinedOn = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : "Unknown";

  return (
    <motion.div
      className="flex items-center justify-center min-h-[80vh] bg-base-100 text-base-content p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="card w-full max-w-lg bg-base-200 shadow-xl rounded-2xl p-6">
        <div className="flex flex-col items-center text-center">
          <div className="avatar mb-4">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  formData.photoURL ||
                  currentUser?.photoURL ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="User Avatar"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold">{formData.name || currentUser?.displayName || "User"}</h2>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FaEnvelope className="text-primary" />
              <p>{currentUser?.email || formData.email || "No email"}</p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <p>Joined on {joinedOn}</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary mt-6 flex items-center gap-2"
            >
              <FaUserEdit /> Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-error mt-6 flex items-center gap-2"
              disabled={loading}
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
            >
              <div>
                <label className="label font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Email (read-only)</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-full mt-4 flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FaSave /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfileSettings;
