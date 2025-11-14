import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { AuthContext } from "./providers/AuthProvider";

export default function HeroSection({ safeData = [] }) {
  const slides = safeData || [];
  const { loading } = useContext(AuthContext);
  const handleAddWatchList = async (movie) => {
    try {
      const res = await fetch(
        "https://moviemaster-server-omega.vercel.app/myWatchList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
        }
      );

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

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="hero-swiper"
      >
        {slides.map((m) => (
          <SwiperSlide key={m._id ?? m.id}>
            <div
              className="relative h-[70vh] md:h-[80vh] flex items-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(5,6,7,0.45) 0%, rgba(5,6,7,0.65) 35%, rgba(5,6,7,0.85) 100%), url(${
                  m.backdropUrl || m.posterUrl
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-white max-w-2xl"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                    {m.title}
                  </h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="text-gray-200 text-sm md:text-base mb-6"
                  >
                    {m.description}
                  </motion.p>

                  <div className="flex gap-3">
                    <Link
                      to={`/movies/${m._id ?? m.id}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-pink-500 text-black px-4 py-2 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
                    >
                      Show Details
                    </Link>
                    <button
                      onClick={() => handleAddWatchList(m)}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/20 transition"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add to Watchlist"}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="hidden md:flex justify-end"
                >
                  <div className="w-64 lg:w-80 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition">
                    <img
                      src={m.posterUrl}
                      alt={`${m.title} poster`}
                      className="w-full h-auto object-cover block"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
