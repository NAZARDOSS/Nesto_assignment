import React, { useEffect, useMemo, useState } from "react";
import Task1 from "./tasks/Task1";
import Task2 from "./tasks/Task2";
import Task3 from "./tasks/Task3";

type Tab = "1" | "2" | "3" | "4";

const TABS: { key: Tab; label: string; desc: string }[] = [
  { key: "1", label: "Task 1", desc: "Organization tree → Stores list" },
  { key: "2", label: "Task 2", desc: "Employees list (no managers)" },
  { key: "3", label: "Task 3", desc: "Shifts + timetable by store" },
  { key: "4", label: "Task 4", desc: "Timeline visualization" },
];

export default function App() {
  const initialTab = useMemo<Tab>(() => {
    const hash =
      typeof window !== "undefined"
        ? window.location.hash.replace("#", "")
        : "";
    return ["1", "2", "3", "4"].includes(hash) ? (hash as Tab) : "1";
  }, []);

  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    window.location.hash = tab;
  }, [tab]);

  return (
    <div className="min-h-screen bg-gray-50 font-sf-pro text-gray-900">
      <main className="mx-auto max-w-5xl px-6 py-8">
        <nav
          className="flex space-x-4 border-b border-gray-300 mb-8"
          role="tablist"
          aria-label="Tasks"
        >
          {TABS.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.key}`}
                onClick={() => setTab(t.key)}
                title={t.desc}
                className={[
                  "px-4 py-2 -mb-px text-sm font-semibold transition rounded-t-lg focus:outline-none focus-visible:ring",
                  isActive
                    ? "border-b-4 border-blue-600 text-blue-700 bg-white shadow-sm"
                    : "text-gray-500 hover:text-blue-600",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        <section
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={tab}
          className="bg-white rounded-xl shadow-md p-6 min-h-[300px]"
        >
          {tab === "1" && <Task1 />}
          {tab === "2" && <Task2 />}
          {tab === "3" && <Task3 />}
          {tab === "4" && <h3>To run Task 4, run this command in the terminal: <code>npm run task4</code>. (Be sure you are in the project root directory.)</h3>}
        </section>
      </main>
    </div>
  );
}
