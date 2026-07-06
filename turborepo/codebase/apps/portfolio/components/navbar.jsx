"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 64; // Adjust for navbar height
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: { x: "100vw" },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: { x: "100vw" },
  };

  const itemVariants = {
    closed: { x: -10, opacity: 0 },
    opened: { x: 0, opacity: 1 },
  };

  return (
    <nav className="w-full border-b-2 border-black bg-inherit fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold font-space-grotesk">
            <Link href="/" className="text-black hover:underline hover:underline-offset-4 transition-all duration-300">
              <Image
                src="/logo.svg"
                alt="Logo Image"
                height={53}
                width={53}
                className="object-cover"
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 font-semibold font-space-grotesk">
            <button
              onClick={() => scrollToSection("about")}
              className="text-black hover:underline hover:underline-offset-4 transition-all duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("project")}
              className="text-black hover:underline hover:underline-offset-4 transition-all duration-300"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-black hover:underline hover:underline-offset-4 transition-all duration-300"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("internships")}
              className="text-black hover:underline hover:underline-offset-4 transition-all duration-300"
            >
              Experience
            </button>
          </div>

          <div className="text-black hover:underline hover:underline-offset-4 transition-all duration-300 font-space-grotesk font-semibold">
            <Link href="/contact" className="text-black hover:underline hover:underline-offset-4 transition-all duration-300">
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none" aria-label="Toggle menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Framer Motion */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black flex items-center justify-center z-50"
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="exit"
            >
              <motion.div
                className="flex flex-col space-y-8"
                variants={menuVariants}
                initial="closed"
                animate="opened"
              >
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 text-white focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/"
                    onClick={toggleMenu}
                    className="text-white text-4xl font-space-grotesk hover:underline hover:underline-offset-4 transition-all duration-300 text-center px-3 py-2"
                  >
                    Home
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      toggleMenu();
                      scrollToSection("about");
                    }}
                    className="text-white text-4xl font-space-grotesk hover:underline hover:underline-offset-4 transition-all duration-300 text-center px-3 py-2"
                  >
                    About
                  </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      toggleMenu();
                      scrollToSection("project");
                    }}
                    className="text-white text-4xl font-space-grotesk hover:underline hover:underline-offset-4 transition-all duration-300 text-center px-3 py-2"
                  >
                    Projects
                  </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      toggleMenu();
                      scrollToSection("skills");
                    }}
                    className="text-white text-4xl font-space-grotesk hover:underline hover:underline-offset-4 transition-all duration-300 text-center px-3 py-2"
                  >
                    Skills
                  </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      toggleMenu();
                      scrollToSection("internships");
                    }}
                    className="text-white text-4xl font-space-grotesk hover:underline hover:underline-offset-4 transition-all duration-300 text-center px-3 py-2"
                  >
                    Experience
                  </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/contact"
                    onClick={toggleMenu}
                    className="text-white text-4xl font-space-grotesk hover:underline hover:underline-offset-4 transition-all duration-300 text-center px-3 py-2"
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;