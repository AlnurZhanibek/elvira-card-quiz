import { useState, useCallback } from "react";
import { questions } from "./data/questions";
import StartScreen from "./components/StartScreen";
import QuizCard from "./components/QuizCard";
import ProgressBar from "./components/ProgressBar";
import Results from "./components/Results";
import "./App.css";

type Screen = "start" | "quiz" | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  const handleStart = useCallback(() => {
    setScreen("quiz");
    setCurrentIndex(0);
    setScore(0);
    setCardKey(0);
  }, []);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isCorrect) setScore((s) => s + 1);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setCardKey((k) => k + 1);
      } else {
        setScreen("results");
      }
    },
    [currentIndex],
  );

  const handleRestart = useCallback(() => {
    setScreen("start");
    setCurrentIndex(0);
    setScore(0);
    setCardKey(0);
  }, []);

  return (
    <div className="app">
      <div className="bg-gradient" />
      <div className="bg-dots" />

      <main className="app-content">
        {screen === "start" && <StartScreen onStart={handleStart} totalQuestions={questions.length} />}

        {screen === "quiz" && (
          <>
            <ProgressBar current={currentIndex} total={questions.length} score={score} />
            <QuizCard
              key={cardKey}
              question={questions[currentIndex]}
              onAnswer={handleAnswer}
              index={currentIndex}
              total={questions.length}
            />
          </>
        )}

        {screen === "results" && <Results score={score} total={questions.length} onRestart={handleRestart} />}
      </main>
    </div>
  );
}

export default App;
