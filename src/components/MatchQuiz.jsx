import React, { useState } from "react";
import "./MatchQuiz.css";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const questions = [
  {
    question: "How is your office coffee culture?",
    options: [
      { text: "We drink liters of filtered coffee", score: 10 },
      { text: "We are fancy latte enthusiasts", score: 7 },
      { text: "We run entirely on energy drinks", score: 5 },
    ],
  },
  {
    question: "What is your preferred tech stack?",
    options: [
      { text: "React & Node.js (Fullstack)", score: 10 },
      { text: "Legacy systems from the 90s", score: 2 },
      { text: "We are open to all modern tech!", score: 9 },
    ],
  },
  {
    question: "How do you prefer to work?",
    options: [
      { text: "Agile with lots of Post-its", score: 10 },
      { text: "We have meetings about meetings", score: 3 },
      { text: "Remote-first and flexibility", score: 9 },
    ],
  },
];
const MatchQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = async (score) => {
    const nextScore = totalScore + score;
    setTotalScore(nextScore);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);

      // SPARA TILL FIREBASE
      try {
        await addDoc(collection(db, "quiz_results"), {
          score: nextScore,
          percentage: Math.round((nextScore / (questions.length * 10)) * 100),
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Kunde inte spara quiz-resultat:", error);
      }
    }
  };

  const calculateMatch = () => {
    const maxScore = questions.length * 10;
    return Math.round((totalScore / maxScore) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setTotalScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <h3>Match-O-Meter 🚀</h3>
          <p>
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h4>{questions[currentQuestion].question}</h4>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="btn btn-outline-warning"
                onClick={() => handleAnswer(option.score)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h3>Your Result:</h3>
          <div className="result-percent">{calculateMatch()}%</div>
          <p className="result-text">
            It looks like we{" "}
            {calculateMatch() > 80
              ? "are a perfect match! 🏆 When can I start?"
              : "should grab a coffee and talk some more. ☕️"}
          </p>
          <button className="btn btn-warning" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchQuiz;
