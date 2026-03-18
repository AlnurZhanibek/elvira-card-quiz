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
        <h1 className="start-title">📘 Педагогика бойынша тест</h1>
        <p className="start-description">
          Педагогикалық зерттеу әдістері мен ұғымдары бойынша {totalQuestions} сұраққа жауап беріп, біліміңізді тексеріңіз!
          Түсіндірмені көру үшін карточканы аударыңыз!
        </p>
        <div className="start-features">
          <div className="feature">
            <span className="feature-icon">🧠</span>
            <span>{totalQuestions} сұрақ</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <span>Карточканы аудару</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <span>Ұпай есебі</span>
          </div>
        </div>
        <button className="start-btn" onClick={onStart}>
          Бастау
        </button>
      </div>
    </div>
  );
}
