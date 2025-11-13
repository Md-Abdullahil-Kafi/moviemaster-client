import { useEffect, useState } from "react";
import { fakeApi } from "../api/fakeApi";
import FadeInSection from "../motion/FadeInSection";

export function StatisticsSection() {
  const [moviesCount, setMoviesCount] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const movies = await fakeApi.fetchMovies(300);
      const users = await fakeApi.fetchTotalUsers(200);
      if (!mounted) return;
      setMoviesCount(movies.length);
      setUsersCount(users.totalUsers);
      setLoading(false);
    })();
    return () => (mounted = false);
  }, []);

  return (
    <FadeInSection>
      <section className="py-12 bg-linear-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-bold mb-6">Platform Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 rounded-xl">
            <div className="text-3xl font-extrabold">{loading ? "..." : moviesCount}</div>
            <div className="text-sm text-gray-300">Total Movies</div>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <div className="text-3xl font-extrabold">{loading ? "..." : usersCount}</div>
            <div className="text-sm text-gray-300">Total Users</div>
          </div>
        </div>
      </div>
    </section>
    </FadeInSection>
  );
}