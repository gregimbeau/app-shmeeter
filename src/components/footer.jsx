import React from "react";
import { Link } from "react-router-dom";
import About from "@/components/about";
import Faq from "@/components/faq";
import Contact from "@/components/contact";
import Terms from "@/components/terms";
import Privacy from "@/components/privacy";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <p>&copy; 2023 My Social Network</p>
        <nav className='footer-nav'>
          <About />
          <Faq />
          <Contact />
          <Terms />
          <Privacy />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
