import { useMemo } from "react";
import { org } from "../../data/task1_data";
import type { OrgNode, Store } from "../../types/task1";

function collectStores(node: OrgNode): Store[] {
  if (node.kind === "store") {
    return [node];
  }
  if ("children" in node) {
    return node.children.flatMap(collectStores);
  }
  return [];
}

export default function Task1() {
  const stores = useMemo(() => collectStores(org), []);

  return (
    <div className="space-y-4 font-sans text-gray-800">
      <header>
        <h2 className="text-lg font-semibold">Task 1</h2>
        <p className="text-sm text-gray-500">Organisations-Baum</p>
      </header>

      <section className="rounded-lg border border-gray-300 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-300 font-semibold text-gray-700">
          Stores of {org.name}:
        </div>
        <ul className="divide-y divide-gray-200">
          {stores.map((store) => (
            <li
              key={store.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-default select-none"
            >
              • {store.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
