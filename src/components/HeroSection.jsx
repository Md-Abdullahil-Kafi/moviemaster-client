import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination, EffectFade } from "swiper";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

/**
 * HeroSection — movies carousel
 * - Uses Swiper.js for a smooth, touch-friendly slider
 * - Enhances slide content with Framer Motion for eye-soothing animations
 * - Accepts `movies` prop (array) fetched from your backend. Each movie object should be:
 *   { id, title, description, posterUrl, backdropUrl }
 * - If `movies` is empty, the component renders a graceful placeholder
 * - Tailwind CSS classes are used for layout and styling (adjust to your design system)
 *
 * Example usage:
 * <HeroSection movies={moviesFromApi} />
 *
 * Notes:
 * - Install dependencies: `npm i swiper framer-motion` (and tailwind in project)
 * - Swiper's CSS imports are included above — ensure your bundler handles CSS imports.
 */

export default function HeroSection({ movies = [] }) {
  // Optional: provide a short fallback set for demo
  const fallback = [
    {
      id: "1",
      title: "Aurora Skies",
      description: "A quiet journey through the northern lights and human connection.",
      posterUrl: "https://picsum.photos/seed/aurora/800/1200",
      backdropUrl: "https://picsum.photos/seed/aurora-back/1600/900",
    },
    {
      id: "2",
      title: "The Long River",
      description: "An emotional story of a village that learns to let go and move forward.",
      posterUrl: "https://picsum.photos/seed/river/800/1200",
      backdropUrl: "https://picsum.photos/seed/river-back/1600/900",
    },
    {
      id: "3",
      title: "Midnight Gardens",
      description: "Magical realism meets human drama under a moonlit canopy.",
      posterUrl: "https://picsum.photos/seed/garden/800/1200",
      backdropUrl: "https://picsum.photos/seed/garden-back/1600/900",
    },
  ];

  const slides = movies.length ? movies : fallback;

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
          <SwiperSlide key={m.id}>
            <div
              className="relative h-[70vh] md:h-[80vh] flex items-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(5,6,7,0.45) 0%, rgba(5,6,7,0.65) 35%, rgba(5,6,7,0.85) 100%), url(${m.backdropUrl || m.posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label={`Featured movie: ${m.title}`}
            >
              <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left: Text */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white max-w-2xl"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-amber-400 via-pink-500 to-violet-500">
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
                      <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/20 transition">
                        Watch Trailer
                      </button>
                      <button className="inline-flex items-center gap-2 bg-linear-to-r from-amber-400 to-pink-500 text-black px-4 py-2 rounded-lg font-semibold shadow-lg">
                        Add to Watch-List
                      </button>
                    </div>
                  </motion.div>

                  {/* Right: Poster (hidden on small screens) */}
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
                        decoding="async"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Soft animated overlay (subtle pulse to soothe eyes) */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.02, 0.06, 0.03] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent to-black/40"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Small decorative indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 text-white text-xs opacity-80">
        Featured movies
      </div>
    </section>
  );
}
