import FadeInSection from "../motion/FadeInSection";

export function AboutPlatform() {
  return (
    <section className="py-16  text-gray-200">
      <div className="container mx-auto px-6 max-w-4xl text-center">
       <FadeInSection>
           <h3 className="text-3xl font-extrabold mb-4 gradient-text">About MovieMaster Pro</h3>
        </FadeInSection>
        <FadeInSection>
          <p className="text-lg text-gray-400 mb-6">
          MovieMaster Pro is a modern movie platform that helps cinephiles discover,
          track, and share films. With curated collections, intelligent recommendations,
          and collaborative watchlists, MovieMaster Pro brings a delightful movie experience.
        </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <FadeInSection>
          <div className="p-6  rounded-xl shadow">
            <h4 className="font-semibold mb-2">Curated Collections</h4>
            <p className="text-sm text-gray-400">Hand-picked movies for every mood and genre.</p>
          </div>
        </FadeInSection>
          <FadeInSection>
            <div className="p-6  rounded-xl shadow">
            <h4 className="font-semibold mb-2">Smart Recommendations</h4>
            <p className="text-sm text-gray-400">AI-assisted suggestions tailored to your taste.</p>
          </div>
          </FadeInSection>
          <FadeInSection>
            <div className="p-6  rounded-xl shadow">
            <h4 className="font-semibold mb-2">Collaborative Watchlists</h4>
            <p className="text-sm text-gray-400">Share and build watchlists with friends.</p>
          </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}