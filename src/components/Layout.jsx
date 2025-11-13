import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router";
import "./transitions.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <div key={location.pathname} className="page-fade">
          
          <Outlet />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
      
    </div>
  );
};

export default Layout;
