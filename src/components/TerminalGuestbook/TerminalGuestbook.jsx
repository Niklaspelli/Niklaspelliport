import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../context/Usercontext";

const TerminalGuestbook = () => {
  const { userName } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // 1. Lyssna på realtidsuppdateringar
  useEffect(() => {
    const q = query(
      collection(db, "guestbook"),
      orderBy("timestamp", "desc"),
      limit(50),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgData.reverse()); // Visa äldst överst för terminal-känsla
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll till botten vid nya meddelanden
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "guestbook"), {
      name: userName || "Anonymous_Hacker",
      text: input,
      timestamp: serverTimestamp(),
      origin: "Infiltrator_Node",
    });

    setInput("");
  };

  return (
    <div className="terminal-feed-container" style={styles.container}>
      <h2>Leave a comment in the Terminal:</h2>
      <div className="terminal-header" style={styles.header}>
        <span style={styles.dot}></span> [LIVE_NETWORK_TRAFFIC]
      </div>

      <div className="terminal-body" style={styles.body} ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={styles.logLine}
            >
              <span style={styles.timestamp}>
                [{new Date(msg.timestamp?.toDate()).toLocaleTimeString()}]
              </span>
              <span style={styles.user}> {msg.name}@root:</span>
              <span style={styles.text}> {msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <span style={styles.prompt}></span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter log message..."
          style={styles.input}
        />
      </form>
    </div>
  );
};

// --- STYLING (In-component för enkelhet) ---
const styles = {
  container: {
    background: "#0a0a0a",
    border: "1px solid #333",
    borderRadius: "8px",
    fontFamily: "'Courier New', monospace",
    maxWidth: "800px",
    margin: "2rem auto",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  header: {
    background: "#1a1a1a",
    padding: "10px",
    color: "#666",
    fontSize: "0.8rem",
    borderBottom: "1px solid #333",
  },
  dot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    background: "#27c93f",
    borderRadius: "50%",
    marginRight: "10px",
    boxShadow: "0 0 5px #27c93f",
  },
  body: {
    height: "300px",
    overflowY: "auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  logLine: {
    fontSize: "0.9rem",
    lineHeight: "1.4",
    borderLeft: "2px solid transparent",
  },
  timestamp: { color: "#555" },
  user: { color: "#ffa500", fontWeight: "bold" },
  text: { color: "#ddd" },
  form: {
    display: "flex",
    padding: "15px",
    background: "#111",
    borderTop: "1px solid #333",
  },
  prompt: { color: "#ffa500", marginRight: "10px", fontWeight: "bold" },
  input: {
    background: "transparent",
    border: "none",
    color: "#ffa500",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
  },
};

export default TerminalGuestbook;
