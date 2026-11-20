import { useEffect, useState } from "react";

const projects = [
  {
    category: "Business Intelligence",
    number: "01",
    title: "Executive Retail Sales Command Center",
    description:
      "Interactive Power BI reporting suite unifying store sales, inventory health, and margin performance for executive decision-making.",
    impact: "40%",
    impactLabel: "faster reporting efficiency",
    tools: ["Power BI", "SQL", "Excel"],
    color: "bg-[#dce7ff]",
  },
  {
    category: "Data Quality & Auditing",
    number: "02",
    title: "152K-Row Inventory Audit & Pipeline",
    description:
      "Automated SQL and Python validation framework that identified and resolved 380 missing records and 656 duplicate entries.",
    impact: "35%",
    impactLabel: "reduction in manual analysis",
    tools: ["Python", "Pandas", "SQL"],
    color: "bg-[#dff5ea]",
  },
  {
    category: "Marketing ROI & Modeling",
    number: "03",
    title: "Commercial Cost-Optimization & ROI Model",
    description:
      "Regression and Bayesian modeling analysis delivering actionable cost-optimization and spend efficiency insights for enterprise stakeholders.",
    impact: "3.5+ yrs",
    impactLabel: "enterprise analytics impact",
    tools: ["Python", "NumPy", "Bayesian Stats"],
    color: "bg-[#fae7d9]",
  },
];

const skills = [
  ["SQL", "Advanced"],
  ["Python", "Advanced"],
  ["Power BI", "Advanced"],
  ["Pandas & NumPy", "Advanced"],
  ["Excel", "Advanced"],
  ["EDA & Validation", "Advanced"],
  ["Bayesian & Regression", "Proficient"],
  ["ETL & PostgreSQL", "Proficient"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const chartMetrics = {
  efficiency: {
    label: "Reporting efficiency gain",
    shortLabel: "Efficiency",
    values: [10, 14, 17, 20, 23, 26, 29, 32, 35, 37, 39, 40],
    format: (value: number) => `+${value}%`,
    change: "+40% faster",
    insight: "Automated SQL data procurement and Power BI modeling cut manual analysis by 35%.",
  },
  records: {
    label: "Inventory records audited (K)",
    shortLabel: "Data Audit",
    values: [18, 32, 45, 58, 71, 84, 96, 110, 122, 135, 144, 152],
    format: (value: number) => `${value}K`,
    change: "1,036 anomalies fixed",
    insight: "Cleaned 380 structurally missing records and 656 duplicates across inventory datasets.",
  },
  accuracy: {
    label: "Automated validation coverage",
    shortLabel: "Data Quality",
    values: [64, 68, 72, 75, 79, 83, 86, 90, 93, 96, 98, 99.8],
    format: (value: number) => `${value}%`,
    change: "+35.8 pts",
    insight: "End-to-end exploratory data analysis and schema checks eliminated recurring reporting errors.",
  },
};

type ChartMetric = keyof typeof chartMetrics;

function EditorialChart() {
  const [metric, setMetric] = useState<ChartMetric>("efficiency");
  const [activePoint, setActivePoint] = useState(11);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const width = 900;
  const height = 320;
  const paddingX = 42;
  const paddingY = 38;
  const data = chartMetrics[metric];
  const minimum = Math.min(...data.values) * 0.88;
  const maximum = Math.max(...data.values) * 1.08;
  const xFor = (index: number) =>
    paddingX + (index / (data.values.length - 1)) * (width - paddingX * 2);
  const yFor = (value: number) =>
    paddingY + ((maximum - value) / (maximum - minimum)) * (height - paddingY * 2);
  const points = data.values.map((value, index) => `${xFor(index)},${yFor(value)}`).join(" ");
  const areaPoints = `${paddingX},${height - paddingY} ${points} ${width - paddingX},${height - paddingY}`;
  const selectedX = xFor(activePoint);
  const selectedY = yFor(data.values[activePoint]);

  const selectMetric = (nextMetric: ChartMetric) => {
    setMetric(nextMetric);
    setActivePoint(11);
  };

  return (
    <section className="border-t border-black/10 bg-white px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-[#2457f5]">Interactive snapshot</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
              See the signal in the story.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose chart metric">
            {(Object.keys(chartMetrics) as ChartMetric[]).map((key) => (
              <button
                key={key}
                onClick={() => selectMetric(key)}
                aria-pressed={metric === key}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  metric === key
                    ? "border-[#2457f5] bg-[#2457f5] text-white shadow-[0_8px_20px_rgba(36,87,245,.2)]"
                    : "border-black/10 bg-[#f7f7f2] text-[#60605b] hover:border-black/30"
                }`}
              >
                {chartMetrics[key].shortLabel}
              </button>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f2] shadow-[0_24px_70px_rgba(20,20,20,.06)]"
        >
          <div className="grid border-b border-black/10 sm:grid-cols-[1fr_auto]">
            <div className="p-6 md:p-8">
              <p className="text-sm text-[#6b6b66]">{data.label}</p>
              <div className="mt-2 flex items-end gap-3">
                <strong className="text-4xl tracking-[-0.05em] md:text-5xl">
                  {data.format(data.values[activePoint])}
                </strong>
                <span className="mb-1 rounded-full bg-[#dff5ea] px-2.5 py-1 text-xs font-bold text-[#187544]">
                  {data.change}
                </span>
              </div>
            </div>
            <div className="max-w-md border-t border-black/10 p-6 sm:border-l sm:border-t-0 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#85857f]">
                Analyst note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4f4f4b]">{data.insight}</p>
            </div>
          </div>

          <div className="relative px-2 pb-5 pt-6 md:px-7 md:pb-7">
            <div className="pointer-events-none absolute left-7 top-5 text-[10px] uppercase tracking-widest text-[#85857f]">
              Hover to explore
            </div>
            <svg
              className="h-auto min-h-[260px] w-full overflow-visible"
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label={`${data.label} chart from January through December`}
            >
              <defs>
                <linearGradient id={`editorial-area-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2457f5" stopOpacity=".2" />
                  <stop offset="100%" stopColor="#2457f5" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((line) => {
                const y = paddingY + (line / 3) * (height - paddingY * 2);
                return (
                  <line
                    key={line}
                    x1={paddingX}
                    x2={width - paddingX}
                    y1={y}
                    y2={y}
                    stroke="#151515"
                    strokeOpacity=".09"
                    strokeDasharray="4 6"
                  />
                );
              })}
              <polygon
                key={`area-${metric}`}
                points={areaPoints}
                fill={`url(#editorial-area-${metric})`}
                className="editorial-chart-area"
              />
              <polyline
                key={`line-${metric}`}
                points={points}
                fill="none"
                stroke="#2457f5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="editorial-chart-line"
              />
              <line
                x1={selectedX}
                x2={selectedX}
                y1={selectedY}
                y2={height - paddingY}
                stroke="#2457f5"
                strokeOpacity=".25"
                strokeDasharray="4 5"
              />
              {data.values.map((value, index) => (
                <g key={`${metric}-${months[index]}`}>
                  <rect
                    x={xFor(index) - 24}
                    y={paddingY}
                    width="48"
                    height={height - paddingY * 2}
                    fill="transparent"
                    className="cursor-crosshair"
                    tabIndex={0}
                    role="button"
                    aria-label={`${months[index]}: ${data.format(value)}`}
                    onPointerEnter={() => setActivePoint(index)}
                    onFocus={() => setActivePoint(index)}
                  />
                  <circle
                    cx={xFor(index)}
                    cy={yFor(value)}
                    r={activePoint === index ? 7 : 3.5}
                    fill={activePoint === index ? "#2457f5" : "#f7f7f2"}
                    stroke="#2457f5"
                    strokeWidth="3"
                    className="pointer-events-none transition-all"
                  />
                  {(index % 2 === 0 || index === 11) && (
                    <text
                      x={xFor(index)}
                      y={height - 10}
                      textAnchor="middle"
                      fill="#767670"
                      fontSize="11"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {months[index]}
                    </text>
                  )}
                </g>
              ))}
              <g
                className="pointer-events-none"
                transform={`translate(${Math.min(Math.max(selectedX - 40, 4), width - 84)}, ${Math.max(selectedY - 48, 4)})`}
              >
                <rect width="80" height="32" rx="16" fill="#151515" />
                <text
                  x="40"
                  y="21"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="DM Sans, sans-serif"
                >
                  {data.format(data.values[activePoint])}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const downloadResume = () => {
    const resume = `ARYAN SINGH — DATA ANALYST

PROFILE
Data analyst with 3.5+ years of experience turning complex operational and commercial datasets into clear, actionable business decisions.

EXPERTISE
SQL, Python, Power BI, Pandas, NumPy, Excel, Exploratory Data Analysis, ETL Optimization, Regression & Bayesian Modeling

EXPERIENCE
Data Analyst — Rozana, 2026–Present
Data Analyst & Senior Developer — Tata Consultancy Services (TCS), 2023–2026

KEY HIGHLIGHTS
- Built an interactive Retail Sales Dashboard in Power BI improving reporting efficiency by 40% and reducing manual analysis by 35%.
- Audited and cleaned a 152,000-row inventory dataset, resolving 380 structurally missing records and 656 duplicates.
- Delivered cost-optimization and marketing ROI insights using SQL, Python, regression, and Bayesian modeling.

EDUCATION
B.Tech in Computer Science & Engineering — SRM Institute of Science and Technology (8.78 CGPA)

CONTACT
LinkedIn: https://www.linkedin.com/in/singharyan-`;
    const blob = new Blob([resume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Aryan-Singh-Data-Analyst-Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f7f7f2]/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#home" className="text-lg font-bold tracking-[-0.04em]" onClick={closeMenu}>
            AS<span className="text-[#2457f5]">.</span>
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl leading-none">{menuOpen ? "×" : "≡"}</span>
          </button>
          <div
            className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-18 flex-col gap-5 border-b border-black/10 bg-[#f7f7f2] px-5 py-7 text-sm font-medium md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
          >
            <a href="#work" onClick={closeMenu} className="transition-colors hover:text-[#2457f5]">
              Work
            </a>
            <a href="#about" onClick={closeMenu} className="transition-colors hover:text-[#2457f5]">
              About
            </a>
            <a
              href="#skills"
              onClick={closeMenu}
              className="transition-colors hover:text-[#2457f5]"
            >
              Skills
            </a>
            <a
              href="https://www.linkedin.com/in/singharyan-"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#151515] px-5 py-2.5 text-center text-white transition-transform hover:-translate-y-0.5"
            >
              Let’s talk
            </a>
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="mx-auto min-h-screen max-w-7xl px-5 pb-16 pt-36 md:px-10 md:pt-44"
      >
        <div className="grid gap-14 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
          <div>
            <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#32b66b] ring-4 ring-[#32b66b]/15"></span>
              Data Analyst · 3.5+ Years Experience
            </div>
            <h1
              data-reveal
              className="max-w-5xl text-[clamp(4rem,10vw,8.8rem)] font-semibold leading-[0.84] tracking-[-0.075em]"
            >
              Data into
              <br />
              <span className="text-[#2457f5]">direction.</span>
            </h1>
          </div>
          <div data-reveal data-reveal-delay="1" className="max-w-md pb-2 lg:justify-self-end">
            <p className="text-xl leading-relaxed text-[#4f4f4b]">
              I’m Aryan, a data analyst who turns messy operational datasets into clear
              answers and answers into measurable business performance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="button-primary">
                Explore my work <Arrow />
              </a>
              <button onClick={downloadResume} className="button-secondary">
                Download résumé
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid overflow-hidden rounded-2xl border border-black/10 bg-white md:grid-cols-3">
          {[
            ["3.5+", "Years turning data into decisions"],
            ["40%", "Faster reporting efficiency via Power BI"],
            ["152K+", "Inventory records audited & validated"],
          ].map(([value, label], i) => (
            <div
              key={value}
              data-reveal
              data-reveal-delay={i + 1}
              className={`p-7 md:p-8 ${i ? "border-t border-black/10 md:border-l md:border-t-0" : ""}`}
            >
              <div className="mb-2 text-4xl font-semibold tracking-[-0.05em]">{value}</div>
              <div className="text-sm text-[#696965]">{label}</div>
            </div>
          ))}
        </div>
        <div className="motion-ticker mt-8" aria-label="Areas of expertise">
          <div className="motion-ticker-track">
            {[...Array(2)].flatMap((_, group) =>
              ["SQL", "Python", "Power BI", "Data Validation", "ETL Pipelines", "Statistical Modeling"].map(
                (item) => (
                  <span key={`${group}-${item}`}>
                    {item} <b>+</b>
                  </span>
                ),
              ),
            )}
          </div>
        </div>
      </section>

      <EditorialChart />

      <section id="work" className="bg-[#151515] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#8ca7ff]">Selected work</p>
              <h2 className="section-title mt-3 max-w-2xl">Analysis with a business outcome.</h2>
            </div>
            <p className="max-w-sm text-[#a5a5a0]">
              A few examples of how I combine analytical rigor with practical, decision-ready
              reporting.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.number}
                data-reveal
                data-reveal-delay={Number(project.number)}
                className="group flex min-h-[480px] flex-col rounded-2xl bg-[#222220] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                <div
                  className={`${project.color} mb-8 flex h-38 items-end justify-between rounded-xl p-5 text-[#151515]`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.16em]">
                    {project.category}
                  </span>
                  <span className="text-5xl font-semibold tracking-[-0.07em]">
                    {project.number}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em]">
                  {project.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[#a5a5a0]">{project.description}</p>
                <div className="mt-auto pt-8">
                  <div className="mb-6 flex items-end gap-3 border-b border-white/10 pb-6">
                    <strong className="text-3xl tracking-[-0.04em]">{project.impact}</strong>
                    <span className="pb-1 text-sm text-[#a5a5a0]">{project.impactLabel}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#d4d4cf]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div data-reveal className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow text-[#2457f5]">About me</p>
            <h2 className="section-title mt-3">I ask better questions before building answers.</h2>
          </div>
          <div className="text-lg leading-relaxed text-[#555550]">
            <p>
              I work at the intersection of SQL data engineering, statistical modeling, and
              business intelligence. My approach is simple: validate the underlying data first, then
              build the cleanest analysis that makes the decision obvious.
            </p>
            <p className="mt-5">
              Over the past 3.5+ years across enterprise consulting at TCS and high-growth retail
              operations at Rozana, I’ve partnered with stakeholders to audit large-scale datasets,
              optimize ETL pipelines, and ship executive Power BI dashboards.
            </p>
            <div className="mt-10 border-l-2 border-[#2457f5] pl-6">
              <p className="font-semibold text-[#151515]">Currently</p>
              <p className="mt-1 text-base">Data Analyst at Rozana</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="border-y border-black/10 bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#2457f5]">Toolkit</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Built for the full data journey.
              </h2>
            </div>
            <p className="max-w-sm text-[#696965]">
              From raw warehouse tables to a story stakeholders remember.
            </p>
          </div>
          <div data-reveal className="grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map(([skill, level], i) => (
              <div
                key={skill}
                className={`flex items-center justify-between border-b border-black/10 py-5 sm:px-5 ${i % 2 === 0 ? "sm:border-r" : ""} lg:border-r lg:last:border-r-0 lg:[&:nth-child(4n)]:border-r-0`}
              >
                <span className="font-semibold">{skill}</span>
                <span className="text-xs uppercase tracking-wider text-[#85857f]">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#2457f5] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/65">Have a question worth answering?</p>
          <div className="mt-5 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              Let’s make the data useful.
            </h2>
            <a
              href="https://www.linkedin.com/in/singharyan-"
              target="_blank"
              rel="noreferrer"
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white text-center text-sm font-bold text-[#2457f5] transition-transform hover:scale-105"
            >
              Get in touch <Arrow />
            </a>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/25 pt-6 text-sm text-white/75 md:flex-row">
            <span>© {new Date().getFullYear()} Aryan Singh</span>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/singharyan-"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function AnalyticsConsole() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0d0c] text-[#eef1e8]">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <a
            href="#console-home"
            className="console-mono text-xs font-bold uppercase tracking-[0.18em]"
          >
            Aryan Singh / Data
          </a>
          <button
            className="console-mono text-xs uppercase md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <div
            className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-20 z-30 flex-col gap-6 border-b border-white/10 bg-[#0b0d0c] p-6 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
          >
            {[
              ["Cases", "#console-cases"],
              ["Profile", "#console-profile"],
              ["Contact", "https://www.linkedin.com/in/singharyan-"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="console-mono text-xs uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-[#c9ff4a]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="console-home" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <p className="console-mono text-xs uppercase tracking-[0.18em] text-[#c9ff4a]">
            Portfolio / 2026
          </p>
          <p className="console-mono flex items-center gap-2 text-xs uppercase text-white/50">
            <span className="inline-block h-2 w-2 rounded-full bg-[#c9ff4a]"></span>
            Data Analyst · Rozana
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.08fr] lg:items-end">
          <div data-reveal>
            <p className="mb-5 max-w-md text-lg leading-relaxed text-white/60">
              Data analyst translating complexity into confident business decisions.
            </p>
            <h1 className="text-[clamp(4rem,9vw,8rem)] font-semibold leading-[0.83] tracking-[-0.075em]">
              Signal
              <br />
              over <span className="text-[#c9ff4a]">noise.</span>
            </h1>
          </div>

          <div
            data-reveal
            data-reveal-delay="1"
            className="console-chart-card rounded-sm border border-white/15 bg-[#121512] p-5 md:p-7"
          >
            <div className="mb-9 flex items-center justify-between">
              <div>
                <p className="console-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Reporting efficiency
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">+40%</p>
              </div>
              <span className="console-mono rounded-sm bg-[#c9ff4a] px-2 py-1 text-[10px] font-bold text-[#0b0d0c]">
                -35% MANUAL WORK
              </span>
            </div>
            <div className="flex h-40 items-end gap-2 border-b border-l border-white/10 pl-3">
              {[31, 44, 38, 55, 48, 68, 59, 79, 73, 91, 84, 100].map((height, index) => (
                <div
                  key={index}
                  className={`console-bar flex-1 ${index > 8 ? "bg-[#c9ff4a]" : "bg-white/20"}`}
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="console-mono mt-3 flex justify-between text-[9px] uppercase text-white/30">
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["3.5+", "Years experience"],
            ["152K", "Records audited"],
            ["40%", "Faster BI reporting"],
            ["35%", "Less manual analysis"],
          ].map(([value, label], index) => (
            <div
              key={label}
              data-reveal
              data-reveal-delay={index + 1}
              className={`py-6 sm:px-6 ${index ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="text-3xl font-semibold tracking-[-0.04em]">{value}</p>
              <p className="console-mono mt-2 text-[10px] uppercase tracking-wider text-white/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="console-cases" className="border-t border-white/10 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-5 md:grid-cols-2">
            <p className="console-mono text-xs uppercase tracking-[0.18em] text-[#c9ff4a]">
              02 / Case files
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Work that moved
              <br />
              the metric.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article
              data-reveal
              className="console-interactive-card group rounded-sm border border-white/15 bg-[#121512] p-6 md:p-8"
            >
              <div className="mb-16 flex items-start justify-between">
                <span className="console-mono text-[10px] uppercase tracking-wider text-white/40">
                  BI / Retail Analytics
                </span>
                <span className="console-mono text-xs text-[#c9ff4a]">CASE_01</span>
              </div>
              <h3 className="max-w-md text-3xl font-semibold tracking-[-0.045em]">
                Interactive Retail Sales Dashboard for executive reporting.
              </h3>
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-3xl font-semibold">40%</p>
                  <p className="mt-1 text-xs text-white/40">Faster reporting efficiency</p>
                </div>
                <div className="console-mono flex items-end justify-end text-[10px] uppercase text-white/40">
                  SQL / Power BI / Excel
                </div>
              </div>
            </article>

            <article
              data-reveal
              data-reveal-delay="1"
              className="console-interactive-card group rounded-sm border border-white/15 bg-[#c9ff4a] p-6 text-[#0b0d0c] md:p-8"
            >
              <div className="mb-10 flex items-start justify-between">
                <span className="console-mono text-[10px] uppercase tracking-wider text-black/45">
                  Data Quality / Auditing
                </span>
                <span className="console-mono text-xs">CASE_02</span>
              </div>
              <div className="mb-10 grid h-28 grid-cols-8 items-end gap-1">
                {[30, 45, 39, 60, 55, 75, 82, 96].map((height, index) => (
                  <div
                    key={index}
                    className="console-bar bg-[#0b0d0c]"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <h3 className="max-w-md text-3xl font-semibold tracking-[-0.045em]">
                Auditing 152,000 inventory records to eliminate reporting drift.
              </h3>
              <div className="mt-10 flex justify-between border-t border-black/15 pt-6">
                <div>
                  <p className="text-3xl font-semibold">1,036</p>
                  <p className="mt-1 text-xs text-black/50">Missing & duplicate rows resolved</p>
                </div>
                <p className="console-mono self-end text-[10px] uppercase text-black/50">
                  Python / Pandas / SQL
                </p>
              </div>
            </article>

            <article
              data-reveal
              className="console-interactive-card rounded-sm border border-white/15 bg-[#121512] p-6 md:col-span-2 md:p-8"
            >
              <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end">
                <div>
                  <span className="console-mono text-[10px] uppercase tracking-wider text-white/40">
                    Commercial Modeling / CASE_03
                  </span>
                  <p className="mt-8 text-6xl font-semibold tracking-[-0.06em] text-[#ff835c]">
                    ROI
                  </p>
                  <p className="mt-2 text-sm text-white/45">Cost-optimization & marketing analytics</p>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                    Regression & Bayesian modeling pipeline for enterprise product decisions.
                  </h3>
                  <div className="console-mono mt-8 flex flex-wrap gap-2 text-[9px] uppercase text-white/50">
                    {["SQL", "Python", "Bayesian Modeling", "ETL", "Power BI"].map((tool) => (
                      <span key={tool} className="border border-white/15 px-2 py-1.5">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="console-profile"
        className="bg-[#eef1e8] px-5 py-20 text-[#0b0d0c] md:px-10 md:py-28"
      >
        <div data-reveal className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="console-mono text-xs uppercase tracking-[0.18em]">
              03 / Operating system
            </p>
            <h2 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Curious mind.
              <br />
              Commercial lens.
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-black/60">
              I connect the technical details to the decisions that matter—building trusted data
              models, clean narratives, and dashboards teams actually use.
            </p>
            <div className="mt-12">
              {[
                ["01", "Define the business question"],
                ["02", "Audit & model the evidence"],
                ["03", "Deliver decision-ready dashboards"],
              ].map(([number, text]) => (
                <div key={number} className="flex gap-6 border-t border-black/15 py-5">
                  <span className="console-mono text-xs text-black/35">{number}</span>
                  <span className="font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="console-mono text-xs uppercase tracking-[0.18em] text-[#c9ff4a]">
            04 / Start a conversation
          </p>
          <a
            href="https://www.linkedin.com/in/singharyan-"
            target="_blank"
            rel="noreferrer"
            className="group mt-8 flex items-end justify-between border-b border-white/20 pb-8 text-5xl font-semibold tracking-[-0.06em] transition-colors hover:border-[#c9ff4a] hover:text-[#c9ff4a] md:text-8xl"
          >
            Say hello
            <span className="text-3xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:text-5xl">
              ↗
            </span>
          </a>
          <div className="console-mono mt-10 flex flex-col justify-between gap-4 text-[10px] uppercase tracking-wider text-white/35 sm:flex-row">
            <span>Aryan Singh / Data Analyst</span>
            <span>LinkedIn / GitHub</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function App() {
  const [concept, setConcept] = useState<"editorial" | "console">("editorial");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getRevealItems = () => document.querySelectorAll<HTMLElement>("[data-reveal]");
    const showAll = () => getRevealItems().forEach((item) => item.classList.add("is-visible"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    const observeRevealItems = (root: ParentNode = document) => {
      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((item) => observer.observe(item));
    };

    observeRevealItems();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]:not(.is-visible)")) observer.observe(node);
          observeRevealItems(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const revealFallback = window.setTimeout(showAll, 1600);

    const updatePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.clearTimeout(revealFallback);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [concept]);

  const chooseConcept = (next: "editorial" | "console") => {
    setConcept(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {concept === "editorial" ? <EditorialPortfolio /> : <AnalyticsConsole />}
      <div
        className={`pointer-glow ${concept === "console" ? "pointer-glow-console" : ""}`}
        aria-hidden="true"
      />
      <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center rounded-full border border-white/15 bg-[#101210]/95 p-1 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => chooseConcept("editorial")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            concept === "editorial" ? "bg-white text-black" : "text-white/55 hover:text-white"
          }`}
          aria-pressed={concept === "editorial"}
        >
          Editorial
        </button>
        <button
          onClick={() => chooseConcept("console")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            concept === "console" ? "bg-[#c9ff4a] text-black" : "text-white/55 hover:text-white"
          }`}
          aria-pressed={concept === "console"}
        >
          Data console
        </button>
      </div>
    </>
  );
}

export default App;