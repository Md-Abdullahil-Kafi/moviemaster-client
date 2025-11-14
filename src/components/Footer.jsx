import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="text-2xl font-bold inline-block mb-2">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-pink-500">MovieMaster Pro</span>
          </Link>
          <p className="text-sm text-gray-500 max-w-sm">
            MovieMaster Pro helps you browse, collect and organize your favorite movies. Built with simplicity and performance in mind.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="btn btn-ghost btn-sm rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="btn btn-ghost btn-sm rounded-full">
              <FaXTwitter />

            </a>
            <a href="#" aria-label="Instagram" className="btn btn-ghost btn-sm rounded-full">
              <FaInstagram />
            </a>
            <a href="#" aria-label="YouTube" className="btn btn-ghost btn-sm rounded-full">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/allMovies" className="hover:text-primary">All Movies</Link></li>
            <li><Link to="/myCollection" className="hover:text-primary">My Collection</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-500 mb-3">Have questions? Reach out at <a href="mailto:hello@moviemasterpro.example" className="link">hello@moviemasterpro.example</a></p>

          <div className="text-sm text-gray-500">
            <p>&copy; {year} MovieMaster Pro. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 text-xs text-center text-gray-500">
          Built with ❤️ — Designed for movie lovers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
