import { useState } from "react";
import type { Question } from "../data/questions";
import "./QuizCard.css";

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  index: number;
  total: number;
}

export default function QuizCard({ question, onAnswer, index, total }: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleSelect = (optIndex: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(optIndex);

    setTimeout(() => setIsFlipped(true), 400);
  };

  const handleNext = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onAnswer(selectedIndex === question.correctIndex);
    }, 400);
  };

  return (
    <div className={`quiz-card-wrapper ${isLeaving ? "leaving" : "entering"}`}>
      <div className="card-counter">
        <span className="current">{index + 1}</span>
        <span className="separator">/</span>
        <span className="total">{total}</span>
      </div>

      <div className={`quiz-card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-inner">
          {/* Front */}
          <div className="card-face card-front">
            <div className="question-badge">Question {index + 1}</div>
            <h2 className="question-text">{question.question}</h2>
            <div className="options-grid">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  className={`option-btn ${
                    selectedIndex === i
                      ? i === question.correctIndex
                        ? "correct"
                        : "wrong"
                      : selectedIndex !== null && i === question.correctIndex
                        ? "correct"
                        : ""
                  } ${selectedIndex !== null ? "revealed" : ""}`}
                  onClick={() => handleSelect(i)}
                  disabled={selectedIndex !== null}
                >
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Back */}
          <div className="card-face card-back">
            <div className={`result-icon ${selectedIndex === question.correctIndex ? "correct" : "wrong"}`}>
              {selectedIndex === question.correctIndex ? "✓" : "✗"}
            </div>
            <h3 className="result-title">
              {selectedIndex === question.correctIndex ? "Correct!" : "Not quite!"}
            </h3>
            <p className="explanation">{question.explanation}</p>
            <button className="next-btn" onClick={handleNext}>
              {index < total - 1 ? "Next Question →" : "See Results →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
