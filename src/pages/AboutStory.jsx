import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  faReact,
  faJs,
  faNodeJs,
  faHtml5,
  faCss3Alt,
  faGit,
  faBootstrap,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./AboutStory.css";
import niklasImg from "/Niklas.jpg"; // Importera din bild
import { useUser } from "../context/Usercontext";
const PDF_FILE_URL = "./Niklas_Pelli_CV_SV.pdf";

const AboutStory = () => {
  const { userName } = useUser();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const scenes = [
    {
      id: 0,
      title: "The Journey Begins",
      text: `So, ${userName}, I was born and raised in the far north of Sweden, in a small town called Haparanda. It's a place where the air is cold but the ideas are always fresh.`,
      buttonText: "Where did life take you next? →",
      image: "❄️",
      imageSrc: niklasImg, // Visa den igen som ett "avslut"
    },
    {
      id: 1,
      title: "The Big Move",
      text: "I traded the quiet north for the pulse of Stockholm to study 'Front-end Cyber Security' at Jensen Yrkeshögskola. A perfect blend of creativity and digital safety.",
      options: [
        { text: "Show me your tech stack", next: 2 }, // Ny väg till tech stack
        { text: "Tell me about your creativity", next: 3 }, // Justerat id
      ],
      image: "📍",
    },
    {
      id: 2,
      title: "My Digital Toolbox", // Denna rubrik ändras vid hovring
      text: `Hey ${userName}, click an icon to see what I think about these tools.`,
      isTechStack: true, // Flagga för att vi ska rendera gridet
      buttonText: "What else? →",
      next: 3,
      image: "🛠️",
    },
    {
      id: 3,
      title: "A Creative Soul",
      text: "Whether it's web design, composing music, or finding new outlets, my creativity is what drives me. I don't just build websites; I create digital art.",
      buttonText: "And as a teammate? →",
      next: 4,
      image: "🎸",
    },
    {
      id: 4,
      title: "Team Player at Heart",
      text: `I believe the best ideas come from collaboration. I'm a team player, ${userName}, and I'd love to bounce ideas with you!`,
      buttonText: "Let's connect! →",
      next: 5,
      image: "🤝",
    },
    {
      id: 5,
      title: "Let's Build Something",
      text: `Now that you know my story, ${userName}, I'd love to hear yours. You can download my CV below or hit the contact button to start a conversation!`,
      buttonText: "Restart Story ↺",
      isEnd: true,
      image: "✉️",
      imageSrc: niklasImg, // Visa den igen som ett "avslut"
    },
  ];

  const scene = scenes[currentIdx];

  // Lista över dina skills med färg och roliga beskrivningar
  const skills = [
    {
      icon: faReact,
      color: "#61DAFB",
      name: "React",
      desc: "My favorite library! 💙",
    },
    {
      icon: faJs,
      color: "#F7DF1E",
      name: "JavaScript",
      desc: "Where logic meets magic. ✨",
    },
    {
      icon: faNodeJs,
      color: "#339933",
      name: "Node.js",
      desc: "Back-end power! 🚀",
    },
    {
      icon: faHtml5,
      color: "#E34F26",
      name: "HTML5",
      desc: "The skeleton of every project.",
    },
    {
      icon: faCss3Alt,
      color: "#1572B6",
      name: "CSS3",
      desc: "Making things look good. 💅",
    },
    {
      icon: faGit,
      color: "#F05032",
      name: "Git",
      desc: "Version control is life saver. 💾",
    },
    {
      icon: faBootstrap,
      color: "#7952B3",
      name: "Bootstrap",
      desc: "Fast responsive design. ⚡️",
    },
    {
      type: "img",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      name: "TypeScript",
      desc: "Static typing for the win! 🛡️",
    },
  ];

  // Framer Motion varianter för staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Tid mellan varje ikons animation
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <div className="story-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          // ... dina befintliga animation-props ...
          className="story-card"
        >
          {/* RENDERA BILDEN OM DEN FINNS */}
          {scene.imageSrc ? (
            <motion.img
              src={scene.imageSrc}
              alt="Niklas Pelli"
              className="story-profile-img"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            />
          ) : (
            <div className="story-icon">{scene.image}</div>
          )}
          <motion.h2 layout>
            {hoveredSkill ? hoveredSkill : scene.title}
          </motion.h2>{" "}
          <p>{scene.text}</p>
          {/* RENDERA TECH STACK GRID OM DET ÄR AKTIVT */}
          {scene.isTechStack && (
            <motion.div
              className="skills-bento-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="bento-item"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    borderColor: skill.color || "#ffa500",
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.desc)} // Sätt beskrivning vid hover
                  onMouseLeave={() => setHoveredSkill(null)} // Återställ vid mouseleave
                >
                  {skill.type === "img" ? (
                    <img
                      src={skill.src}
                      alt={skill.name}
                      className="bento-icon-img"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={skill.icon}
                      style={{ color: skill.color }}
                      className="bento-icon"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
          <div className="story-buttons">
            {/* Om scenen har flera val (options) */}
            {scene.options ? (
              scene.options.map((opt, i) => (
                <button
                  key={i}
                  className="story-button"
                  onClick={() => setCurrentIdx(opt.next)}
                >
                  {opt.text}
                </button>
              ))
            ) : (
              /* Annars visa vanlig knapp (Next, Connect eller Restart) */
              <button
                className={`story-button ${scene.isEnd ? "restart" : ""}`}
                onClick={() =>
                  scene.isEnd
                    ? setCurrentIdx(0)
                    : setCurrentIdx(scene.next || currentIdx + 1)
                }
              >
                {scene.buttonText}
              </button>
            )}

            {/* DOWNLOAD CV - Visas endast på sista sliden */}
            {scene.isEnd && (
              <button
                onClick={() => downloadFileAtURL(PDF_FILE_URL)}
                className="story-button download-btn"
                style={{ marginTop: "10px", backgroundColor: "#28a745" }} // Grön färg för att skilja den från orange
              >
                Download CV
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="progress-bar-bg">
        <motion.div
          className="progress-bar-fill"
          animate={{ width: `${((currentIdx + 1) / scenes.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AboutStory;

/* 
3. Hur du använder namnet interaktivt
Här är några ställen där det ger mest effekt:

I din Story: Istället för att bara skriva "I'm a team player", skriv: "I'm a team player, {userName}, and I'd love to bounce ideas with you!"

I ditt Quiz: "Let's see, {userName}, how well do we actually match?"

I Kontaktformuläret: Förifyll namnfältet! Om de redan angett sitt namn i början, visa att du är smart: "I've already filled in your name, {userName}. Just type your message below!"

I din Tech-stack: "Hey {userName}, click an icon to see what I think about these tools." */
