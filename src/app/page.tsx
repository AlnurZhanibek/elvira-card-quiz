import Link from "next/link";

const QUIZZES = [
  {
    href: "/mineral-resources",
    eyebrow: "§ 14–15 · Пайдалы қазбалар",
    title: "Қазақстанның минералды ресурстары",
    description:
      "Конспект бойынша 15 сұрақ: Қазақстанның минералды ресурстарын өндіру және өңдеу.",
  },
  {
    href: "/soviet-economy-reform",
    eyebrow: "Тоқырау дәуірі",
    title: "Кеңестік экономиканы реформалаудың сәтсіздік себептері",
    description:
      "Конспект бойынша 15 сұрақ: Хрущев саясатының дағдарысы, Косыгин реформасы және тоқырау кезеңі.",
  },
  {
    href: "/obligations",
    eyebrow: "§ 10 · Азаматтық құқық",
    title: "Азаматтық құқықтағы міндеттемелер мен жауапкершілік",
    description:
      "Конспект бойынша 15 сұрақ: міндеттемелер ұғымы, тараптары және оларды қамтамасыз ету әдістері.",
  },
  {
    href: "/kazakhstan-rivers",
    eyebrow: "§ 24–25 · Гидрография",
    title: "Қазақстанның ірі өзендерінің сипаттамасы",
    description:
      "Конспект бойынша 15 сұрақ: өзендерді алап бойынша топтастыру, олардың қоректенуі мен режимі және гидронимдер.",
  },
  {
    href: "/france-neoconservatism",
    eyebrow: "Дүниежүзі тарихы · Батыс елдері",
    title: "Францияда консерватизмнен неоконсерватизмге өту",
    description:
      "Конспект бойынша 15 сұрақ: соғыстан кейінгі Франция, Төртінші және Бесінші республика, голлизм және неоконсерватизм.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full flex-1 bg-[#f4ede0] px-4 py-8 pb-20 font-serif text-[#2b241c] sm:px-6">
      <div className="mx-auto max-w-180">
        <header className="mb-10 text-center">
          <div className="mb-2 font-mono text-xs uppercase tracking-[3px] text-[#b5502e]">
            Квиздер
          </div>
          <h1 className="text-3xl leading-tight text-[#38424a]">
            Конспект бойынша сынақтар
          </h1>
        </header>

        <div className="flex flex-col gap-4">
          {QUIZZES.map((quiz) => (
            <Link
              key={quiz.href}
              href={quiz.href}
              className="block rounded-md border border-[#ddd0b3] border-l-[5px] border-l-[#b5502e] bg-[#fffdf8] p-6 shadow-[0_2px_6px_rgba(43,36,28,0.05)] transition-colors hover:bg-[#fbf6ea]"
            >
              <div className="mb-1.5 font-mono text-xs uppercase tracking-[2px] text-[#c98a2c]">
                {quiz.eyebrow}
              </div>
              <h2 className="mb-2 text-xl text-[#38424a]">{quiz.title}</h2>
              <p className="text-[15px] text-[#665c4d]">{quiz.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
