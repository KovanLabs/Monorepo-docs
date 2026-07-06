"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ExperiencePage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id='internships' className="max-w-6xl mx-auto px-4 overflow-hidden">
      <motion.div
        ref={ref}
        style={{ scale, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen py-8 px-4 font-space-grotesk w-full"
      >
        <motion.div
          className="border-b-2 border-black text-3xl font-semibold pb-3 mb-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1>Internships</h1>
        </motion.div>

        <motion.p
          className="text-black mb-8 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          I’ve gained valuable experience through internships, working in dynamic environments where I’ve honed my skills and collaborated on impactful projects.
        </motion.p>

        <div className="relative max-w-4xl mx-auto w-full">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black hidden md:block"></div>

          <motion.div
            className="mb-8 w-full"
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="hidden md:flex justify-start w-full">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md w-5/12 ml-auto relative"
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-black mb-2">Vantage Flow</h3>
                <p className="text-black">Web Development Intern</p>
                <p className="text-black mt-2">Jan 2024 - Feb 2024</p>
              </motion.div>
            </div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md w-full md:hidden"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-black mb-2">Vantage Flow</h3>
              <p className="text-black">Web Development Intern</p>
              <p className="text-black mt-2">Jan 2024 - Feb 2024</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-8 w-full"
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="hidden md:flex justify-end w-full">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md w-5/12 mr-auto relative"
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-black mb-2">The Foundax Company</h3>
                <p className="text-black">Web Development Intern</p>
                <p className="text-black mt-2">Apr 2024 - Sep 2024</p>
              </motion.div>
            </div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md w-full md:hidden"
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-black mb-2">The Foundax Company</h3>
              <p className="text-black">Web Development Intern</p>
              <p className="text-black mt-2">Apr 2024 - Sep 2024</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperiencePage;