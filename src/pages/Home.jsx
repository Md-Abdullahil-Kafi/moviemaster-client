import { useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouteLoaderData } from "react-router";
import HeroSection from "../components/HeroSection";
import Container from "../components/Container";
import RecentlyAdded from "../components/recently/RecentlyAdded";
import TopRatedMovies from "../components/top-rated/TopRatedMovies";
import GenreSection from "../components/genre/GenreSection";


const Home = () => {

  const data = useRouteLoaderData("movies-root");
  const safeData = data || [];

  const [selectedGenre, setSelectedGenre] = useState("All");

  const stats = {
    totalMovies: safeData.length,
    totalUsers: 45, // fake API number
  };

   return (
    <div className="space-y-16 pb-20">
      {/*  HERO SECTION */}
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
      {/* <Container>
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
      </Container> */}

      <Container>
        <TopRatedMovies></TopRatedMovies>
      </Container>

      {/*  RECENTLY ADDED */}
      <Container><RecentlyAdded></RecentlyAdded></Container>


      {/*  GENRE SECTION - UPDATED WITH TOGGLE FILTER */}
     
      <Container>
        <GenreSection safeData={safeData}></GenreSection>
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
