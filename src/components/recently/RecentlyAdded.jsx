import { useEffect, useState } from "react";
import { fakeApi } from "../api/fakeApi";
import FadeInSection from "../motion/FadeInSection";

export function RecentlyAdded({ limit = 6 }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fakeApi.fetchMovies(200);
      if (!mounted) return;
      const sorted = data
        .slice()
        .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
        .slice(0, limit);
      setMovies(sorted);
    })();
    return () => (mounted = false);
  }, [limit]);

  return (
    <section className="py-12 bg-linear-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <FadeInSection>
          <h3 className="text-2xl font-bold mb-6">Recently Added</h3>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((m) => (
            <FadeInSection>
          <article key={m.id} className="bg-white/5 rounded-lg overflow-hidden shadow-sm flex gap-3">
              <img src={m.posterUrl} alt={m.title} className="w-28 object-cover" />
              <div className="p-3 flex-1">
                <h4 className="font-semibold">{m.title}</h4>
                <div className="text-sm text-gray-300">Added: {new Date(m.addedAt).toLocaleDateString()}</div>
                <div className="text-sm text-gray-400 mt-2">{m.plotSummary.slice(0, 80)}...</div>
              </div>
            </article>
        </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}