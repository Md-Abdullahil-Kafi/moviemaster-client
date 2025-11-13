import React, { useMemo } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const fakeMovies = [
  {
    id: "m1",
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
    rating: 8.8,
    duration: 148,
    plotSummary:
      "A thief who steals corporate secrets through dream-sharing technology...",
    posterUrl: "https://picsum.photos/seed/inception/400/600",
    language: "English",
    country: "USA",
    addedBy: "user@example.com",
    addedAt: "2025-10-01T10:12:00Z",
  },
  {
    id: "m2",
    title: "Aurora Skies",
    genre: "Drama",
    releaseYear: 2021,
    director: "Maya Sol",
    cast: "Ana Rivera, Tom Scott",
    rating: 7.9,
    duration: 112,
    plotSummary:
      "A quiet journey through the northern lights and human connection.",
    posterUrl: "https://picsum.photos/seed/aurora/400/600",
    language: "English",
    country: "Iceland",
    addedBy: "editor@example.com",
    addedAt: "2025-11-05T08:00:00Z",
  },
  {
    id: "m3",
    title: "Midnight Gardens",
    genre: "Fantasy",
    releaseYear: 2018,
    director: "Helen Park",
    cast: "Sara Kim, Rohan Patel",
    rating: 8.3,
    duration: 130,
    plotSummary: "Magical realism meets human drama under a moonlit canopy.",
    posterUrl: "https://picsum.photos/seed/garden/400/600",
    language: "English",
    country: "UK",
    addedBy: "user2@example.com",
    addedAt: "2025-11-10T14:30:00Z",
  },
  {
    id: "m4",
    title: "The Long River",
    genre: "Adventure",
    releaseYear: 2015,
    director: "Samir K.",
    cast: "Rahul Sen, Priya Malik",
    rating: 7.5,
    duration: 125,
    plotSummary:
      "An emotional story of a village that learns to let go and move forward.",
    posterUrl: "https://picsum.photos/seed/river/400/600",
    language: "Hindi",
    country: "India",
    addedBy: "curator@example.com",
    addedAt: "2025-11-12T09:45:00Z",
  },
  {
    id: "m5",
    title: "Solaris Echo",
    genre: "Sci-Fi",
    releaseYear: 2019,
    director: "I. Petrov",
    cast: "K. Ivanov, L. Petrova",
    rating: 9.1,
    duration: 140,
    plotSummary:
      "A contemplative look at memory and loss on a distant station.",
    posterUrl: "https://picsum.photos/seed/solar/400/600",
    language: "Russian",
    country: "Russia",
    addedBy: "admin@example.com",
    addedAt: "2025-11-15T11:00:00Z",
  },
  {
    id: "m6",
    title: "Laugh Lines",
    genre: "Comedy",
    releaseYear: 2022,
    director: "Jon B.",
    cast: "E. Brooks, N. Hill",
    rating: 6.8,
    duration: 98,
    plotSummary: "A light-hearted comedy about unexpected friendships.",
    posterUrl: "https://picsum.photos/seed/laugh/400/600",
    language: "English",
    country: "USA",
    addedBy: "user3@example.com",
    addedAt: "2025-11-18T16:12:00Z",
  },
  {
    id: "m7",
    title: "Twilight Dance",
    genre: "Romance",
    releaseYear: 2017,
    director: "L. Nguyen",
    cast: "Min Ho, Sara L.",
    rating: 8.0,
    duration: 105,
    plotSummary:
      "Two strangers find each other in the heart of a bustling city.",
    posterUrl: "https://picsum.photos/seed/twilight/400/600",
    language: "Korean",
    country: "South Korea",
    addedBy: "user4@example.com",
    addedAt: "2025-11-20T12:00:00Z",
  },
  {
    id: "m8",
    title: "Neon Run",
    genre: "Action",
    releaseYear: 2023,
    director: "G. Torres",
    cast: "A. Cruz, D. Reyes",
    rating: 8.6,
    duration: 118,
    plotSummary: "High-speed chases and neon-lit cityscapes in a near future.",
    posterUrl: "https://picsum.photos/seed/neon/400/600",
    language: "Spanish",
    country: "Spain",
    addedBy: "editor2@example.com",
    addedAt: "2025-11-21T10:00:00Z",
  },
  {
    id: "m9",
    title: "Quiet Harbor",
    genre: "Drama",
    releaseYear: 2012,
    director: "A. Gomez",
    cast: "C. Vale, H. Ortega",
    rating: 7.2,
    duration: 110,
    plotSummary: "A family returns to a seaside town and re-discovers roots.",
    posterUrl: "https://picsum.photos/seed/harbor/400/600",
    language: "Spanish",
    country: "Chile",
    addedBy: "user5@example.com",
    addedAt: "2025-11-22T09:00:00Z",
  },
  {
    id: "m10",
    title: "Pixel Hearts",
    genre: "Animation",
    releaseYear: 2024,
    director: "T. Iwasaki",
    cast: "K. Sato, Y. Tan",
    rating: 8.9,
    duration: 95,
    plotSummary:
      "A charming animated tale about connection in the digital age.",
    posterUrl: "https://picsum.photos/seed/pixel/400/600",
    language: "Japanese",
    country: "Japan",
    addedBy: "studio@example.com",
    addedAt: "2025-11-23T07:30:00Z",
  },
  // ... add rest of your fake movie data
];

const Home = () => {
  const topRated = useMemo(
    () => [...fakeMovies].sort((a, b) => b.rating - a.rating).slice(0, 5),
    []
  );

  const recent = useMemo(
    () =>
      [...fakeMovies]
        .sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        )
        .slice(0, 6),
    []
  );

  const stats = {
    totalMovies: fakeMovies.length,
    totalUsers: 45, // fake API number
  };

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
      <section className="relative">
        <Slider {...sliderSettings}>
          {fakeMovies.slice(0, 4).map((movie) => (
            <div key={movie.id} className="relative h-[75vh]">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="object-cover w-full h-full brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40">
                <motion.h2
                  className="text-5xl font-bold mb-3"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {movie.title}
                </motion.h2>
                <p className="max-w-xl">{movie.plotSummary}</p>
                <Link
                  to={`/movies/${encodeURIComponent(movie.title)}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/*  STATS SECTION */}
      <motion.section
        className="flex justify-center gap-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h3 className="text-4xl font-bold text-primary">
            {stats.totalMovies}
          </h3>
          <p className="text-gray-500">Total Movies</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-secondary">
            {stats.totalUsers}
          </h3>
          <p className="text-gray-500">Total Users</p>
        </div>
      </motion.section>

      {/*  TOP RATED MOVIES */}
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-6">Top Rated Movies</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {topRated.map((movie) => (
            <motion.div
              key={movie.id}
              className="card bg-base-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
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

      {/*  RECENTLY ADDED */}
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-6">Recently Added</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {recent.map((movie) => (
            <motion.div
              key={movie.id}
              className="bg-base-200 rounded-xl shadow-md overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-60 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.genre}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/*  GENRE SECTION */}
      <motion.section
        className="text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Explore by Genre</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              className="btn btn-outline btn-sm rounded-full hover:scale-110 transition"
            >
              {genre}
            </button>
          ))}
        </div>
      </motion.section>

      {/*  ABOUT PLATFORM */}
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
    </div>
  );
};

export default Home;
