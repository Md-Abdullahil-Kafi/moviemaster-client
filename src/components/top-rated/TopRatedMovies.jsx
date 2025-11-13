import { useEffect, useState } from "react";
import { fakeApi } from "../api/fakeApi";
import FadeInSection from "../motion/FadeInSection";

export function TopRatedMovies({ limit = 5 }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fakeApi.fetchMovies(200);
      if (!mounted) return;
      const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, limit);
      setMovies(sorted);
    })();
    return () => (mounted = false);
  }, [limit]);

  return (
    <section className="py-12 bg-linear-to-b from-black via-gray-900 to-black  text-white">
      <div className="container mx-auto px-6">
        <FadeInSection>
        <h3 className="text-2xl font-bold mb-6">Top Rated Movies</h3>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((m) => (
           <FadeInSection>
            <article key={m.id} className="bg-white/5 rounded-lg overflow-hidden shadow-xl hover:scale-105  hover:shadow-primary transition-shadow">
              <img src={m.posterUrl} alt={m.title} className="w-full h-56 object-cover" />
              <div className="p-3">
                <h4 className="font-semibold">{m.title}</h4>
                <div className="text-sm text-gray-300">{m.genre} • {m.releaseYear}</div>
                <div className="text-orange-400 font-bold mt-2">⭐ {m.rating}</div>
              </div>
            </article>
           </FadeInSection>

          ))}
        </div>
      </div>
    </section>
  );
}