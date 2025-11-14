import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";

export default function GenreSection({
  fetchUrl = "http://localhost:3000/genreMovies",
  defaultSelected = ["Action"],
}) {
  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "Adventure",
    "Animation",
  ];

  const [selectedGenres, setSelectedGenres] = useState(defaultSelected);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // toggle genre multi-select
  const toggleGenre = (g) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setMinRating("");
    setMaxRating("");
  };

  useEffect(() => {
    let mounted = true;
    let timer = null;
    const fetchFiltered = async () => {
      try {
        setLoading(true);
        setError(null);

        const qs = new URLSearchParams();

        if (selectedGenres && selectedGenres.length > 0) {
          qs.set("genres", selectedGenres.join(","));
        }
        if (minRating !== "" && !isNaN(minRating)) qs.set("minRating", String(minRating));
        if (maxRating !== "" && !isNaN(maxRating)) qs.set("maxRating", String(maxRating));

        const url = `${fetchUrl}?${qs.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Fetch error");
        setMovies([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    timer = setTimeout(fetchFiltered, 250);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [selectedGenres, minRating, maxRating, fetchUrl]);

  const cardVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28 } },
  };

  return (
    <section className="text-center px-6">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <h2 className="text-3xl font-bold mb-6">Explore by Genre</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {genres.map((g) => {
            const active = selectedGenres.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => toggleGenre(g)}
                className={`btn btn-ghost btn-sm transition ${
                  active ? "btn-active text-blue-500" : ""
                }`}
              >
                {g} {active && <span className="ml-1 text-xs">✓</span>}
              </button>
            );
          })}
          <button type="button" onClick={() => setSelectedGenres([])} className="btn btn-error text-white btn-sm rounded-full font-bold ml-2">
            Clear Genres
          </button>
        </div>

        <div className="flex justify-center gap-4 items-center mb-8 flex-wrap">
          <label className="text-sm">
            Min
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="input input-sm ml-2 w-20"
              placeholder="0"
            />
          </label>

          <label className="text-sm">
            Max
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              className="input input-sm ml-2 w-20"
              placeholder="10"
            />
          </label>

          <button type="button" onClick={clearFilters} className="btn btn-sm btn-outline ml-2">
            Reset All
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : error ? (
          <p className="text-red-400">Error: {error}</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-500">No movies found for selected filters.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <motion.div
                key={movie._id ?? movie.id ?? movie.title}
                className="bg-base-200 rounded-xl shadow-md overflow-hidden flex flex-col"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`/movies/${movie._id ?? movie.id}`} className="flex flex-col h-full">
                  <div className="h-60 overflow-hidden">
                    <img
                      src={movie.posterUrl ?? "https://i.ibb.co/placeholder.png"}
                      alt={movie.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{movie.title}</h3>
                      <p className="text-sm text-gray-500">{movie.genre}</p>
                    </div>

                    <div className="mt-3">
                      <div className="text-orange-400 font-bold">⭐ {movie.rating}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
