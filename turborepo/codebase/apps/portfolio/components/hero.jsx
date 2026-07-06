"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef(null);
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const buttonVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.4 } },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = Math.random() * 30 + 20;
        this.opacity = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.opacity = this.life / 50;
      }

      draw() {
        ctx.fillStyle = `rgba(121,134,156 ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.1) {
        particles.push(new Particle(mouseX + (Math.random() * 50 - 25), 
                                  mouseY + (Math.random() * 50 - 25)));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative font-space-grotesk max-w-6xl mx-auto px-4 pt-20 py-10 md:pt-28 md:py-12 lg:pt-32 lg:py-14 overflow-hidden before:absolute before:inset-0 before:bg-[linear_gradient(to_right,#00000010_1px,transparent_1px)] before:bg-[size:100px_100%] before:pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto z-0"
      />
      <div className="relative flex flex-col md:flex-row lg:flex-row items-center justify-between gap-8 z-10 w-full">
        <div className="md:flex hidden md:w-1/2 lg:w-1/2 justify-center items-center">
          <Link href="/">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="w-[min(350px,100%)] h-[min(340px,100%)] rounded-full object-cover mx-auto"
            >
              <Image
                src="/svg/absurd.png"
                alt="Mouniesh's profile"
                width={350}
                height={350}
                className="w-full h-full rounded-full object-cover hover:opacity-80 transition-opacity"
              />
            </motion.div>
          </Link>
        </div>

        <div className="w-full md:hidden flex justify-center">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="w-[250px] h-[250px] rounded-full mx-auto"
          >
            <Image
              src="/project/port-new.jpg"
              alt="Portfolio Image"
              width={260}
              height={260}
              className="w-full h-full rounded-full object-cover hover:opacity-80 transition-opacity"
            />
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/2 text-center md:text-left lg:text-left relative">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 relative"
          >
            I"M 
            <br />
            MOUNIESH
          </motion.h1>
          <motion.h2
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-4"
          >
            Student and Developer
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed"
          >
            I’m a passionate developer crafting innovative solutions with code.
            I thrive on turning ideas into functional, beautiful designs that
            make an impact.
          </motion.p>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="visible"
            className="flex flex-row gap-4 md:gap-6 lg:gap-8 justify-center md:justify-start lg:justify-start"
          >
            <Link href="/contact">
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-300 text-base sm:text-lg md:text-lg lg:text-lg">
                Contact
              </button>
            </Link>
            <Link href="/resume.pdf" target="_blank">
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-300 hover:text-black transition-colors duration-300 text-base sm:text-lg md:text-lg lg:text-lg">
                Resume
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="text-center mt-6 md:pt-10 lg:pt-12">
        <motion.h2
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gray-800 tracking-tight italic"
        >
          "Dreams don’t work unless you do."
        </motion.h2>
      </div>
    </section>
  );
};

export default Hero;