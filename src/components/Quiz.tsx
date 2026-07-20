"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Question } from "@/types/quiz";

// Shuffle each question's options so the correct answer isn't always in the
// same slot. Returns questions with reordered options and a remapped `correct`.
function shuffleQuestions(questions: Question[]): Question[] {
  return questions.map((item) => {
    const order = item.options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return {
      ...item,
      options: order.map((i) => item.options[i]),
      correct: order.indexOf(item.correct),
    };
  });
}

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
  // Shuffle option order client-side after mount to avoid a hydration mismatch;
  // the first paint uses the original order, then options reshuffle in place.
  const [shuffled, setShuffled] = useState(questions);
  const [current, setCurrent] = useState(0);
  // Chosen option index per question (null = not yet answered). Kept per
  // question so going back restores the earlier answer.
  const [choices, setChoices] = useState<Array<number | null>>([]);

  useEffect(() => {
    // Intentional mount-time shuffle: the first paint must match the SSR
    // (original) order to avoid a hydration mismatch, then we randomize.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShuffled(shuffleQuestions(questions));
  }, [questions]);

  const finished = current >= shuffled.length;
  const selected = choices[current] ?? null;
  const score = useMemo(
    () =>
      choices.reduce<number>(
        (acc, choice, i) =>
          choice !== null && choice === shuffled[i]?.correct ? acc + 1 : acc,
        0,
      ),
    [choices, shuffled],
  );

  function selectAnswer(idx: number) {
    if (selected !== null) return;
    setChoices((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  }

  function nextQuestion() {
    setCurrent((c) => c + 1);
  }

  function prevQuestion() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  function restart() {
    setShuffled(shuffleQuestions(questions));
    setCurrent(0);
    setChoices([]);
  }

  const verdict = useMemo(
    () => verdictFor(score, shuffled.length),
    [score, shuffled.length],
  );

  return (
    <div className="min-h-full flex-1 bg-[#f4ede0] px-4 py-8 pb-20 font-serif text-[#2b241c] sm:px-6">
      <div className="mx-auto max-w-[720px]">
        <Link
          href="/"
          className="mb-5 inline-block font-mono text-xs uppercase tracking-[2px] text-[#b5502e] transition-colors hover:text-[#8f3d22]"
        >
          ← Квиздер
        </Link>
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
          {shuffled.map((item, i) => {
            const choice = choices[i] ?? null;
            const answered = choice !== null;
            return (
              <div
                key={i}
                className={[
                  "flex-1 border-r border-[#cabd9f] transition-colors duration-300 last:border-r-0",
                  !answered
                    ? "bg-[#e7dcc4]"
                    : choice === item.correct
                      ? "bg-[#4a7a4a]"
                      : "bg-[#b5502e]",
                ].join(" ")}
              />
            );
          })}
        </div>
        <div className="text-right font-mono text-xs text-[#7a6f5c]">
          {finished ? "Аяқталды" : `${current + 1}-сұрақ / ${shuffled.length}`}
        </div>

        {!finished ? (
          <QuestionCard
            index={current}
            item={shuffled[current]}
            selected={selected}
            isLast={current === shuffled.length - 1}
            canGoBack={current > 0}
            onSelect={selectAnswer}
            onNext={nextQuestion}
            onPrev={prevQuestion}
          />
        ) : (
          <div className="px-5 py-10 text-center">
            <div className="text-[54px] font-bold leading-none text-[#b5502e]">
              {score}/{shuffled.length}
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
  canGoBack,
  onSelect,
  onNext,
  onPrev,
}: {
  index: number;
  item: Question;
  selected: number | null;
  isLast: boolean;
  canGoBack: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
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
            stateClasses = "border-[#4a7a4a] bg-[#e4efe0] text-[#2e4a2e]";
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
        <div className="mt-3.5 rounded bg-[#e7dcc4] px-3.5 py-2.5 text-[14.5px] text-[#4a4335]">
          {item.explain}
        </div>
      )}

      {(canGoBack || selected !== null) && (
        <div className="mt-4 flex items-center justify-between gap-3">
          {canGoBack ? (
            <button
              onClick={onPrev}
              className="rounded border border-[#38424a] px-3.5 py-3 text-[15.5px] text-[#38424a] transition-colors hover:bg-[#f5ecd6]"
            >
              ← Артқа
            </button>
          ) : (
            <span />
          )}
          {selected !== null && (
            <button
              onClick={onNext}
              className="rounded border border-[#38424a] px-3.5 py-3 text-[15.5px] font-bold text-[#38424a] transition-colors hover:bg-[#f5ecd6]"
            >
              {isLast ? "Нәтижені көрсету →" : "Келесі сұрақ →"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
