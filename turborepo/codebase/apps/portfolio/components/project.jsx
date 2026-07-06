"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGlobe, FaGithub, FaArrowAltCircleRight } from 'react-icons/fa';

const ProjectPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const projects = [
    {
      title: 'SPARKHUB',
      description: [
        'Built a Learning Management Platform with Next.js, Firebase, and Spline 3D.',
        'Features blog management and interactive 3D models.',
      ],
      image: '/project/Spark.jpg',
      hostedLink: 'https://spark-hub-one.vercel.app/',
      githubLink: 'https://github.com/Mounieshh?tab=repositories',
      tagline: 'Learning Platform',
    },
    {
      title: 'BOOK IT',
      description: [
        'Developed a Hall Booking System with MERN Stack and JWT.',
        'Includes role-based authentication and real-time notifications.',
      ],
      image: '/project/Book.jpg',
      hostedLink: 'https://book-it-mern-app-mk.vercel.app/',
      githubLink: 'https://github.com/Mounieshh?tab=repositories',
      tagline: 'Hall Booking System',
    },
    {
      title: 'GOALS SETTER APP',
      description: [
        'Created a Task Management App with MERN Stack and Redux Toolkit.',
        'Secured with JWT and features real-time notifications.',
      ],
      image: '/project/Goal.jpg',
      hostedLink: 'https://github.com/Mounieshh/Goal_Setter_App',
      githubLink: 'https://github.com/Mounieshh/Goal_Setter_App',
      tagline: 'Task Management Tool',
    },
    {
      title: 'PROMPTOPIA',
      description: [
        ' Created an AI prompt-sharing platform allowing users to create, edit, and manage prompts seamlessly.',
        'Features smooth animations and responsive design.',
      ],
      image: '/project/promptopia.png',
      hostedLink: 'https://github.com/Mounieshh/promptopia_nextjs',
      githubLink: 'https://github.com/Mounieshh/promptopia_nextjs',
      tagline: 'User AI Prompt Sharing Tool',
    },
  ];

  return (
    <section id="project" className="pt-4 max-w-6xl mx-auto px-4 overflow-hidden">
      <motion.div
        ref={ref}
        style={{ scale, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen py-12 px-4 font-space-grotesk w-full"
      >
        <motion.div
          className="border-b-2 border-black text-3xl font-semibold pb-4"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>Featured Projects</h2>
        </motion.div>

        <div className="mt-4 w-full">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} justify-between items-center gap-6 p-6 rounded-lg shadow-xl mb-8 w-full`}
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex-1 w-full md:w-1/2">
                <h3 className="text-3xl font-semibold text-black mb-4">{project.title}</h3>
                <p className="text-lg text-black leading-relaxed mb-2">{project.tagline}</p>
                <ul className="list-disc pl-5 space-y-2 text-black">
                  {project.description.map((point, i) => (
                    <li key={i} className="text-base leading-relaxed">{point}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap space-x-4 mt-4">
                  <Link href={project.hostedLink} target='_blank'>
                    <button className="hover:bg-slate-400 p-2 transition-colors duration-300 flex items-center">
                      <FaGlobe className="mr-2" size={24} />
                      <span>Visit Page</span>
                    </button>
                  </Link>
                  <Link href={project.githubLink} target='_blank'>
                    <button className="hover:bg-slate-400 p-2 transition-colors duration-300 flex items-center">
                      <FaGithub className="mr-2" size={24} />
                      <span>Github</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center w-full md:w-1/2">
                <Link href={project.hostedLink} target="_blank" className="w-full max-w-[500px]">
                  <motion.div
                    className="relative flex items-center justify-center overflow-hidden shadow-lg rounded-lg p-4 border border-gray-300 h-64"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  > 
                    <Image
                      src={project.image}
                      alt={`${project.title} image`}
                      width={500}
                      height={300}
                      className="rounded-lg object-cover transition-opacity duration-300 md:w-full w-72 h-64"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
                    >
                      <FaArrowAltCircleRight className="text-white text-4xl" />
                    </motion.div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
          {/* View More Creations Button */}
          <motion.div
            className="flex justify-center mt-8"
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link href="https://github.com/Mounieshh?tab=repositories" target="_blank">
              <button className="hover:bg-slate-400 p-3 transition-colors duration-300 flex items-center text-lg font-semibold border border-black rounded-lg">
                <FaGithub className="mr-2" size={24} />
                <span>View More Creations</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectPage;