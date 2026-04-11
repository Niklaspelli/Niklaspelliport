import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WelcomeOverlay.css";
import { useUser } from "../context/Usercontext";

const WelcomeOverlay = () => {
  const { updateUserName } = useUser();

  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 1) {
      updateUserName(inputValue);
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100vh",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="welcome-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">
                Niklas_Pelli_Portfolio_Access_v2.0
              </span>
            </div>

            <div className="terminal-body">
              <p className="typing-text">
                Initialize visitor identification...
              </p>
              <p className="typing-text">Please enter your name to proceed:</p>

              <form onSubmit={handleStart} className="name-form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Full name / Guest alias"
                  autoFocus
                />
                <button type="submit" className="access-btn">
                  GRANT ACCESS
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
