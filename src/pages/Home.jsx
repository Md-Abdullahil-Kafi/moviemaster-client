import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useRouteLoaderData } from "react-router";
import HeroSection from "../components/HeroSection";
import Container from "../components/Container";
import RecentlyAdded from "../components/recently/RecentlyAdded";

const Home = () => {

  useEffect(()=>{

  },[])

  const data = useRouteLoaderData("movies-root");
  const safeData = data || [];

  const [selectedGenre, setSelectedGenre] = useState("All");

  const topRated = useMemo(
    () => [...safeData].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [safeData]
  );

  const recent = useMemo(
    () =>
      [...safeData]
        .sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        )
        .slice(0, 6),
    [safeData]
  );

  const stats = {
    totalMovies: safeData.length,
    totalUsers: 45, // fake API number
  };

  const genres = [
    "All",
    "Action",
    "Drama",
    "Comedy",
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "Adventure",
    "Animation",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 🎬 HERO SECTION */}
      <HeroSection safeData={safeData}></HeroSection>

      {/*  STATS SECTION */}
      <motion.section
        className="flex justify-center gap-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h3 className="text-7xl font-bold text-primary">
            {stats.totalMovies}
          </h3>
          <p className="text-gray-500">Total Movies</p>
        </div>
        <div>
          <h3 className="text-7xl font-bold text-secondary">
            {stats.totalUsers}
          </h3>
          <p className="text-gray-500">Total Users</p>
        </div>
      </motion.section>

      {/*  TOP RATED MOVIES */}
      <Container>
        <section className="px-6 ">
        <h2 className="text-3xl font-bold mb-6">Top Rated Movies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topRated.map((movie) => (
            <motion.div
              key={movie.id ?? movie._id}
              className="card bg-base-200 shadow-lg rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/movies/${movie._id}`}>
                <figure>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-60 w-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">⭐ {movie.rating}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      </Container>

      {/*  RECENTLY ADDED */}
      <Container><RecentlyAdded></RecentlyAdded></Container>


      {/*  GENRE SECTION - UPDATED WITH TOGGLE FILTER */}
      <Container>
        <motion.section
        className="text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Explore by Genre</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`btn btn-outline btn-sm rounded-full transition ${
                selectedGenre === genre ? "btn-primary text-blue-400" : ""
              }`}
              onClick={() =>
                setSelectedGenre((prev) => (prev === genre ? "All" : genre))
              }
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Filtered Movies */}
        <div className="grid md:grid-cols-3 gap-6">
          {safeData
            .filter(
              (movie) =>
                selectedGenre === "All" ||
                movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
            )
            .map((movie) => (
              <motion.div
                key={movie._id ?? movie.id ?? movie.title}
                className="bg-base-200 rounded-xl shadow-md overflow-hidden flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to={`/movies/${movie._id}`}
                  className="flex flex-col h-full"
                >
                  <div className="h-60 overflow-hidden">
                    <img
                      src={movie.posterUrl || "https://i.ibb.co/placeholder.png"}
                      alt={movie.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{movie.title}</h3>
                      <p className="text-sm text-gray-500">{movie.genre}</p>
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-outline btn-sm w-full">
                        Details
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          {safeData.filter(
            (movie) =>
              selectedGenre !== "All" &&
              !movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
          ).length === safeData.length && (
            <p className="text-gray-500 col-span-full">No movies found for {selectedGenre}</p>
          )}
        </div>
      </motion.section>
      </Container>

      {/*  ABOUT PLATFORM */}
      <Container>
        <motion.section
        className="text-center px-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">About MovieMaster Pro</h2>
        <p className="text-gray-500 leading-relaxed">
          MovieMaster Pro is your personal movie collection manager. Browse,
          track, and organize movies from different genres, discover new
          favorites, and share your list with friends. Designed with simplicity
          and beauty in mind.
        </p>
      </motion.section>
      </Container>
    </div>
  );
};

export default Home;
