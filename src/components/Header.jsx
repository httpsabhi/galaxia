import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-lg shadow-lg z-60 px-5">
      <div className="container mx-auto flex justify-between items-center p-4">
          <img src="/header.png" alt="" className="w-20" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="/"
            className="text-white text-lg hover:text-blue-300 transition"
          >
            Home
          </a>
          <a
            href="/all-payloads"
            className="text-white text-lg hover:text-blue-300 transition"
          >
            Payloads
          </a>
          <a
            href="/sky-patrol"
            className="text-white text-lg hover:text-blue-300 transition"
          >
            Sky Patrol
          </a>
          <a
            href="/cosmic-explorer"
            className="text-white text-lg hover:text-blue-300 transition"
          >
            Cosmic Explorer
          </a>
          <a
            href="/solar-surge"
            className="text-white text-lg hover:text-blue-300 transition"
          >
            Solar Surge
          </a>
         
        </nav>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg shadow-lg">
          <ul className="flex flex-col items-center p-4 space-y-4">
            <li>
              <a
                href="#home"
                className="text-white text-lg hover:text-blue-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#missions"
                className="text-white text-lg hover:text-blue-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Missions
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-white text-lg hover:text-blue-300 transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-white text-lg hover:text-blue-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
