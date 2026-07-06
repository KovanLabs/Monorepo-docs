"use client";

import { memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiRedux, SiExpress, SiFirebase, SiVercel, SiMongodb, SiPostman, SiFigma, SiMysql, SiJsonwebtokens } from "react-icons/si";
import { DiJavascript, DiPython, DiJava } from "react-icons/di";
import { useRef } from "react";

const techStacks = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: <DiPython /> },
      { name: "Java", icon: <DiJava /> },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <DiJavascript /> },
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Redux", icon: <SiRedux /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MySQL", icon: <SiMysql/> },
      { name: "JWT", icon: <SiJsonwebtokens/> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Firebase", icon: <SiFirebase /> },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "VS Code", icon: <DiJavascript /> },
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGitAlt /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "Vercel", icon: <SiVercel /> },
    ],
  },
];

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  hover: { 
    scale: 1.1,
    rotate: 5,
    y: -5, 
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", 
    transition: { type: "spring", stiffness: 300, damping: 10 }, 
  },
};

const SkillCard = memo(({ skill }) => (
  <motion.div
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover" 
    className="bg-white p-3 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-200 flex flex-col items-center cursor-pointer"
  >
    <div className="text-black text-xl mb-2">{skill.icon}</div>
    <h3 className="text-sm font-medium text-black">{skill.name}</h3>
  </motion.div>
));

const SkillsPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 pb-20">
      <motion.div
        ref={ref}
        style={{ scale, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-auto px-4 font-space-grotesk py-10 w-full"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="border-b-2 border-black text-3xl font-semibold pb-4 mb-8"
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1>Skills</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {techStacks.map((stack, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg shadow-2xl border border-gray-200"
                initial="hidden"
                whileInView="visible"
                variants={itemVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-xl font-bold text-black mb-4">{stack.category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {stack.skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsPage;