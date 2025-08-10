import { useMemo } from "react";
import { org } from "../../data/task2_data";
import type { OrgNode } from "../../types/task2";

function collectEmployees(node: OrgNode): string[] {
  if (node.kind === "store") {
    return [...node.employees];
  }
  if (node.kind === "area" || node.kind === "headquarter") {
    return node.children.flatMap(collectEmployees);
  }
  return [];
}

export default function Task2() {
  const employees = useMemo(() => collectEmployees(org), [org]);

  return (
    <div className="space-y-4 font-sans text-gray-800">
      <header>
        <h2 className="text-lg font-semibold">Task 2</h2>
        <p className="text-sm text-gray-500">Mitarbeiterliste</p>
      </header>

      <section className="rounded-lg border border-gray-300 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-300 font-semibold text-gray-700">
          Employees of {org.name}:
        </div>
        <ul className="divide-y divide-gray-200">
          {employees.map((name) => (
            <li
              key={name}
              className="px-4 py-3 hover:bg-gray-50 cursor-default select-none"
            >
              • {name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
