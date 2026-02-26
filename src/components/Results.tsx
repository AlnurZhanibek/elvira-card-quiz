import "./Results.css";

interface ResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function Results({ score, total, onRestart }: ResultsProps) {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return { title: "Тамаша нәтиже!", subtitle: "Сіз данышпансыз!" };
    if (percentage >= 80) return { title: "Керемет!", subtitle: "Тамашаға жуық!" };
    if (percentage >= 60) return { title: "Жарайсыз!", subtitle: "Біліміңіз жақсы!" };
    if (percentage >= 40) return { title: "Жаман емес!", subtitle: "Оқуды жалғастырыңыз!" };
    return { title: "Тырысыңыз!", subtitle: "Жаттығу шеберлікке жеткізеді!" };
  };

  const { title, subtitle } = getMessage();

  return (
    <div className="results-wrapper">
      <div className="results-card">
        <div className="confetti-container">
          {percentage >= 60 &&
            Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  backgroundColor: ["#7c3aed", "#a78bfa", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4"][
                    Math.floor(Math.random() * 6)
                  ],
                }}
              />
            ))}
        </div>

        <div className="score-circle">
          <svg viewBox="0 0 120 120" className="score-ring">
            <circle cx="60" cy="60" r="52" className="ring-bg" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="ring-fill"
              style={{
                strokeDasharray: `${2 * Math.PI * 52}`,
                strokeDashoffset: `${2 * Math.PI * 52 * (1 - percentage / 100)}`,
              }}
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{percentage}</span>
            <span className="score-percent">%</span>
          </div>
        </div>

        <h2 className="results-title">{title}</h2>
        <p className="results-subtitle">{subtitle}</p>

        <div className="score-breakdown">
          <div className="breakdown-item correct">
            <span className="breakdown-icon">✓</span>
            <span className="breakdown-count">{score}</span>
            <span className="breakdown-label">Дұрыс</span>
          </div>
          <div className="breakdown-divider" />
          <div className="breakdown-item wrong">
            <span className="breakdown-icon">✗</span>
            <span className="breakdown-count">{total - score}</span>
            <span className="breakdown-label">Қате</span>
          </div>
        </div>

        <button className="restart-btn" onClick={onRestart}>
          Қайта ойнау
        </button>
      </div>
    </div>
  );
}
