"use client"

import { motion } from "framer-motion"
import { FaGithub, FaTwitter, FaLinkedin, FaUsers } from "react-icons/fa"
import { useState, useEffect } from "react"
import Link from "next/link"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 1000, 
    })
  }

  const marqueeVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: { repeat: Infinity, duration: 10, ease: "linear" },
      },
    },
  }

  // State to control Back to Top button visibility
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  // Effect to track scroll position and show/hide button
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer")
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const isVisible = footerRect.top <= window.innerHeight && footerRect.bottom >= 0
        setIsFooterVisible(isVisible)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer className="min-h-screen w-full bg-black text-white flex flex-col justify-between items-center relative py-16 font-space-grotesk"> 
      {/* Marquee Scrolling Text */}
      <div className="w-full overflow-hidden whitespace-nowrap border-b border-gray-700 pb-8">
        <motion.div
          variants={marqueeVariants}
          animate="animate"
          className="text-[12vw] md:text-[10vw] font-extrabold uppercase leading-none tracking-tight"
        >
          Let's Work Together   •   Let's Work Together   •   Let's Work Together
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl w-full px-6 flex flex-col md:flex-row justify-around items-start mt-12 gap-12">
        {/* Social Links */}
        <div className="space-y-6 text-left text-2xl">
          <Link href="https://github.com/Mounieshh" target="_blank" className="flex items-center gap-3 hover:underline transition-transform transform hover:translate-x-2">
            <FaGithub className="text-2xl" /> Github ↗
          </Link>
          <Link href="https://www.linkedin.com/in/mouniesh-vijayakumar-2447a2256/" target="_blank" className="flex items-center gap-3 hover:underline transition-transform transform hover:translate-x-2">
            <FaLinkedin className="text-2xl" /> LinkedIn ↗
          </Link>
          <Link href="https://x.com/Mounieshv" target="_blank" className="flex items-center gap-3 hover:underline transition-transform transform hover:translate-x-2">
            <FaTwitter className="text-2xl" /> Twitter ↗
          </Link>
          <Link href="https://dev.to/mounieshh" target="_blank" className="flex items-center gap-3 hover:underline transition-transform transform hover:translate-x-2">
            <FaUsers className="text-2xl" /> Dev.to ↗
          </Link>
        </div>

        {/* Contact Text */}
        <div className="flex flex-col sm:text-xl md:text-xl lg:text-2xl leading-snug">
          <p>I’m currently available for new work,</p>
          <p>Let’s talk about the next big thing!</p>
          <Link
            href="mailto:iammounieshv@gmail.com"
            className="font-semibold underline hover:underline transition-opacity hover:opacity-80"
          >
            iammounieshv@gmail.com
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-gray-400 text-lg">
        Mouniesh's Product © 2025 All Rights Reserved.
      </div>

      {/* Back to Top Button - Only visible when footer is in view */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-white text-black px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-110"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isFooterVisible ? 1 : 0, y: isFooterVisible ? 0 : 20 }} 
        transition={{ duration: 0.3, ease: "easeInOut" }} 
      >
        Back to Top ↑
      </motion.button>
    </footer>
  )
}

export default Footer