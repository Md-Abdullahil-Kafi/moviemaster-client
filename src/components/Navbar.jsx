import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaSignInAlt,
  FaUserCircle,
  FaSearch,
  FaTimes,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { AuthContext } from "./providers/AuthProvider";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      if (logoutUser) await logoutUser();
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
    // navigate to a search route (implement search page separately)
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setMobileOpen(false);
  };

  // helper for active link classes
  const activeClass = ({ isActive }) =>
    isActive ? "text-primary font-bold" : "text-base-content";

  return (
    <header className="w-full bg-base-100 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden btn btn-ghost btn-circle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link
              to="/"
              className="text-2xl font-bold tracking-tight btn btn-ghost p-0 normal-case"
              aria-label="Go to homepage"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">
                MovieMaster Pro
              </span>
            </Link>
          </div>

          {/* Center: nav links (large screens) */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
            <NavLink to="/allMovies" className={activeClass}>
              All Movies
            </NavLink>
            {user && (
              <NavLink to="/myCollection" className={activeClass}>
                My Collection
              </NavLink>
            )}
          </div>

          {/* Right: search, theme, auth */}
          <div className="flex items-center gap-3">
            {/* Search (desktop) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center gap-2 border rounded-lg px-2 py-1 bg-base-200"
              role="search"
              aria-label="Search movies"
            >
              <FaSearch className="opacity-60" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="input input-ghost input-sm w-40 md:w-56 focus:outline-none"
                aria-label="Search movies"
              />
            </form>

            {/* Theme toggle (if exists) */}
            <div className="hidden sm:flex">
              <ThemeToggle />
            </div>

            {/* Auth buttons or user dropdown */}
            {!user ? (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="btn btn-ghost gap-2">
                  <FaSignInAlt /> <span className="hidden sm:inline">Login</span>
                </NavLink>
                <NavLink to="/register" className="btn btn-primary">
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost gap-2 hidden sm:flex"
                  title="Logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt />
                </button>

                {/* Profile dropdown */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden ring ring-primary ring-offset-2">
                      <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt={user?.displayName || "User avatar"}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-64"
                    role="menu"
                    aria-label="User menu"
                  >
                    <li className="mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            alt="avatar"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">{user?.displayName || "User"}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link to="/profile-settings" className="btn btn-sm btn-outline w-full" role="menuitem">
                        <FaUserCircle className="mr-2" /> Profile & Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/myCollection")}
                        className="btn btn-sm btn-ghost w-full text-left"
                        role="menuitem"
                      >
                        My Collection
                      </button>
                    </li>
                    <li className="pt-2">
                      <button onClick={handleLogout} className="btn btn-sm btn-error w-full" role="menuitem">
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu (collapsible) */}
        <div
          className={`lg:hidden mt-2 transition-all duration-200 ${
            mobileOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="flex flex-col gap-2 py-3">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className="px-2">
              Home
            </NavLink>
            <NavLink to="/allMovies" onClick={() => setMobileOpen(false)} className="px-2">
              All Movies
            </NavLink>
            {user && (
              <NavLink to="/myCollection" onClick={() => setMobileOpen(false)} className="px-2">
                My Collection
              </NavLink>
            )}

            {/* Mobile search */}
            <form onSubmit={handleSearchSubmit} className="px-2 mt-2">
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                <FaSearch />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input input-ghost input-sm w-full"
                  placeholder="Search movies..."
                  aria-label="Search movies"
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Search
                </button>
              </div>
            </form>

            {/* Mobile auth */}
            <div className="px-2 mt-3">
              {!user ? (
                <div className="flex gap-2">
                  <NavLink to="/login" onClick={() => setMobileOpen(false)} className="btn btn-ghost w-full">
                    Login
                  </NavLink>
                  <NavLink to="/register" onClick={() => setMobileOpen(false)} className="btn btn-primary w-full">
                    Register
                  </NavLink>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 px-1">
                    <p className="font-semibold truncate">{user?.displayName}</p>
                    <p className="truncate text-xs">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="btn btn-error w-full">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
