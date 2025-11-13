import FadeInSection from "../motion/FadeInSection";

export function GenreSection() {
  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Animation",
    "Documentary",
  ];

  return (
    <section className="py-12 text-gray-300">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl gradient-text font-bold mb-6">Genres</h3>
        <div className="flex flex-wrap gap-3">
          {genres.map((g) => (
            <FadeInSection>
          <span key={g} className="px-4 py-2 rounded-full  shadow-sm border text-sm">
              {g}
            </span>
        </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}