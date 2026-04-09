import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import "./LikeButton.css";

// Importera db och Firebase-metoder
/* import { db } from "./firebaseConfig"; */ // Se till att sökvägen till din firebase.js stämmer

import { db } from "../firebaseConfig";
import { doc, setDoc, increment, onSnapshot } from "firebase/firestore";

const LikeButton = ({ id }) => {
  const [likes, setLikes] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  // 1. Lyssna på likes i realtid från Firebase
  useEffect(() => {
    const likesRef = doc(db, "stats", id);

    // onSnapshot gör att siffran uppdateras direkt om någon annan klickar
    const unsubscribe = onSnapshot(likesRef, (doc) => {
      if (doc.exists()) {
        setLikes(doc.data().count);
      }
    });

    return () => unsubscribe(); // Städa upp när komponenten stängs
  }, [id]);

  // 2. Hantera klick (skicka till Firebase)
  const handleLike = async () => {
    const likesRef = doc(db, "stats", id);

    try {
      // Trigger shake direkt för snabb respons i UI
      setIsShaking(true);

      // Uppdatera Firebase
      await setDoc(
        likesRef,
        {
          count: increment(1),
        },
        { merge: true },
      );

      // Ta bort shake efter 0.5s
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    } catch (error) {
      console.error("Error updating like count:", error);
      setIsShaking(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          margin: "20px",
          color: "green",
        }}
      >
        <FaThumbsUp size={42} className={isShaking ? "shake" : ""} />
      </button>
      <p style={{ marginBottom: "10px" }}>
        {likes} {likes === 1 ? "like" : "likes"}
      </p>
    </div>
  );
};

export default LikeButton;
