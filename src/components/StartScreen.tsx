import "./StartScreen.css";

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export default function StartScreen({ onStart, totalQuestions }: StartScreenProps) {
  return (
    <div className="start-wrapper">
      <div className="start-card">
        <div className="start-icon">
          <span className="icon-inner">?</span>
          <div className="icon-ring" />
          <div className="icon-ring ring-2" />
        </div>
        <h1 className="start-title">Card Quiz</h1>
        <p className="start-description">
          Test your knowledge with {totalQuestions} questions across science, history, art, and more.
          Flip the cards to reveal explanations!
        </p>
        <div className="start-features">
          <div className="feature">
            <span className="feature-icon">🧠</span>
            <span>{totalQuestions} Questions</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <span>Flip Cards</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <span>Score Tracking</span>
          </div>
        </div>
        <button className="start-btn" onClick={onStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
