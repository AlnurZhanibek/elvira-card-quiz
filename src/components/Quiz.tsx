"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/types/quiz";

function verdictFor(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return "Керемет! Тақырып толық меңгерілген.";
  if (pct >= 0.8) return "Жақсы нәтиже — материал жақсы меңгерілген.";
  if (pct >= 0.5) return "Жаман емес, бірақ конспектіні қайта қарап шыққан жөн.";
  return "Келесі тексеруге дейін конспектіні қайта оқып шыққан дұрыс.";
}

export function Quiz({
  eyebrow,
  title,
  description,
  questions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  questions: Question[];
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<boolean | undefined>>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const finished = current >= questions.length;
  const score = useMemo(() => answers.filter(Boolean).length, [answers]);

  function selectAnswer(idx: number) {
    if (selected !== null) return;
    const item = questions[current];
    const isCorrect = idx === item.correct;
    setSelected(idx);
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = isCorrect;
      return next;
    });
  }

  function nextQuestion() {
    setSelected(null);
    setCurrent((c) => c + 1);
  }

  function restart() {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  }

  const verdict = useMemo(
    () => verdictFor(score, questions.length),
    [score, questions.length],
  );

  return (
    <div className="min-h-full flex-1 bg-[#f4ede0] px-4 py-8 pb-20 font-serif text-[#2b241c] sm:px-6">
      <div className="mx-auto max-w-[720px]">
        <header className="mb-7 text-center">
          <div className="mb-2 font-mono text-xs uppercase tracking-[3px] text-[#b5502e]">
            {eyebrow}
          </div>
          <h1 className="mb-2.5 text-3xl leading-tight text-[#38424a]">
            {title}
          </h1>
          <p className="mx-auto max-w-[520px] text-[15px] text-[#665c4d]">
            {description}
          </p>
        </header>

        <div className="mb-1.5 mt-6 flex h-4 overflow-hidden rounded-[3px] border border-[#cabd9f]">
          {questions.map((_, i) => {
            const answer = answers[i];
            return (
              <div
                key={i}
                className={[
                  "flex-1 border-r border-[#cabd9f] transition-colors duration-300 last:border-r-0",
                  answer === undefined
                    ? "bg-[#e7dcc4]"
                    : answer
                      ? "bg-[#4a7a4a]"
                      : "bg-[#b5502e]",
                ].join(" ")}
              />
            );
          })}
        </div>
        <div className="text-right font-mono text-xs text-[#7a6f5c]">
          {finished ? "Аяқталды" : `${current + 1}-сұрақ / ${questions.length}`}
        </div>

        {!finished ? (
          <QuestionCard
            index={current}
            item={questions[current]}
            selected={selected}
            isLast={current === questions.length - 1}
            onSelect={selectAnswer}
            onNext={nextQuestion}
          />
        ) : (
          <div className="px-5 py-10 text-center">
            <div className="text-[54px] font-bold leading-none text-[#b5502e]">
              {score}/{questions.length}
            </div>
            <div className="mb-5 text-base text-[#7a6f5c]">дұрыс жауап</div>
            <div className="mb-6 text-[17px] text-[#38424a]">{verdict}</div>
            <button
              onClick={restart}
              className="rounded font-mono text-sm uppercase tracking-wide text-[#f4ede0] bg-[#38424a] px-5 py-3 transition-colors hover:bg-[#242c32]"
            >
              Қайта тапсыру
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionCard({
  index,
  item,
  selected,
  isLast,
  onSelect,
  onNext,
}: {
  index: number;
  item: Question;
  selected: number | null;
  isLast: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-5 rounded-md border border-[#ddd0b3] border-l-[5px] border-l-[#b5502e] bg-[#fffdf8] p-6 shadow-[0_2px_6px_rgba(43,36,28,0.05)]">
      <div className="mb-1.5 font-mono text-[13px] text-[#c98a2c]">
        {index + 1}-СҰРАҚ
      </div>
      <p className="mb-4.5 text-[19px] leading-snug text-[#38424a]">{item.q}</p>

      <div className="flex flex-col gap-2.5">
        {item.options.map((opt, idx) => {
          const isAnswered = selected !== null;
          const isCorrectOption = idx === item.correct;
          const isChosenWrong = isAnswered && idx === selected && !isCorrectOption;

          let stateClasses = "border-[#d8cba9] bg-[#fbf6ea] hover:border-[#c98a2c] hover:bg-[#f5ecd6]";
          if (isAnswered && isCorrectOption) {
            stateClasses = "border-[#4a7a4a] bg-[#e4efe0] font-bold text-[#2e4a2e]";
          } else if (isChosenWrong) {
            stateClasses = "border-[#a83c3c] bg-[#f4e0dc] text-[#6b2222]";
          } else if (isAnswered) {
            stateClasses = "border-[#d8cba9] bg-[#fbf6ea] opacity-55";
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => onSelect(idx)}
              className={`rounded border px-3.5 py-3 text-left text-[15.5px] text-[#2b241c] transition-all duration-150 disabled:cursor-default ${stateClasses}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          <div className="mt-3.5 rounded bg-[#e7dcc4] px-3.5 py-2.5 text-[14.5px] text-[#4a4335]">
            {item.explain}
          </div>
          <button
            onClick={onNext}
            className="mt-4 rounded border border-[#38424a] px-3.5 py-3 text-left text-[15.5px] font-bold text-[#38424a] transition-colors hover:bg-[#f5ecd6]"
          >
            {isLast ? "Нәтижені көрсету →" : "Келесі сұрақ →"}
          </button>
        </>
      )}
    </div>
  );
}
