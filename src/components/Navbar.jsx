// Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggle";
import {
  FaSignInAlt,
  FaUserCircle,
  FaSearch,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "./providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) {
      toast("Type something to search");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 md:px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            {/* hamburger */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow text-base-content"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allMovies">All Movies</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/myCollection">My Collection</NavLink>
              </li>
            )}
          </ul>
        </div>

        <NavLink
          to="/"
          className="btn btn-ghost text-2xl font-bold gradient-text"
        >
          MovieMaster Pro
        </NavLink>
      </div>

      {/* center links for large screens */}
      <div className="navbar-center hidden lg:flex text-base-content font-semibold">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allMovies">All Movies</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/myCollection">My Collection</NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <div className="hidden sm:flex items-center">
          <ThemeToggle />
        </div>

        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>

        {/* Authentication buttons */}
        {!user ? (
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className="btn btn-ghost flex items-center gap-2"
            >
              <FaSignInAlt /> Login
            </NavLink>
            <NavLink to="/register" className="btn btn-ghost px-4 ">
              Register
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Logout button visible outside dropdown */}
            <button
              onClick={handleLogout}
              className="btn btn-ghost flex items-center gap-2"
              title="Logout"
              aria-label="Logout"
            >
              <FaSignOutAlt /> Logout
            </button>

            {/* Profile dropdown: show avatar + name + email + Profile link */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden ring ring-primary ring-offset-2">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={user?.displayName || "User avatar"}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>

              <div
                tabIndex={0}
                className="dropdown-content card card-compact w-64 bg-base-100 shadow mt-3"
                role="menu"
                aria-label="User menu"
              >
                <div className="card-body p-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="avatar"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {user?.displayName || "Unnamed User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <div className="divider my-2" />

                  <div className="space-y-2">
                    <Link
                      to="/profile-settings"
                      className="btn btn-sm btn-outline w-full"
                    >
                      <FaUserCircle className="mr-2" /> Profile & Settings
                    </Link>
                    {/* optionally other lightweight links (e.g., account) */}
                    <button
                      onClick={() => navigate("/myCollection")}
                      className="btn btn-sm btn-ghost w-full"
                    >
                      My Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
