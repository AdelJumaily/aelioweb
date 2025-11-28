'use client';

import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-oval">
        {/* Logo */}
        <a href="/" className="navbar-brand">
          <span className="navbar-logo-icon">✦</span>
          <span
            className={`navbar-logo-text shadow-headline ${luckiestGuy.className}`}
          >
            Aelio
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <a href="#solutions" className="nav-link">
            Solutions
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#about" className="nav-link">
            About Us
          </a>
        </nav>

        {/* CTA Buttons */}
        <a href="#contact" className="navbar-btn navbar-btn-secondary">
          Get Started
        </a>
        <a href="#contact" className="navbar-btn navbar-btn-primary">
          Contact
        </a>
      </div>
    </div>
  );
}

