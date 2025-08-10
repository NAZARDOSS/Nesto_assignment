import { useMemo } from "react";
import { org, shifts } from "../../data/task3_data";
import type { OrgNode, Store, Shift } from "../../types/task3";

function collectStores(node: OrgNode): Store[] {
  if (node.kind === "store") {
    return [node];
  }
  if (node.kind === "area" || node.kind === "headquarter") {
    return node.children.flatMap(collectStores);
  }
  return [];
}

type TimeTableEntry = { employee: string; periods: readonly string[] };
type TimeTable = {
  storeId: string;
  storeName: string;
  entries: readonly TimeTableEntry[];
};

function buildTimeTables(
  stores: readonly Store[],
  allShifts: readonly Shift[]
): TimeTable[] {
  return stores.map((store) => {
    const inStore = new Set(store.employees);
    const map = new Map<string, string[]>();
    store.employees.forEach((e) => map.set(e, []));
    allShifts.forEach((s) => {
      if (inStore.has(s.employee)) {
        const arr = map.get(s.employee);
        if (arr) arr.push(`${s.start} – ${s.end}`);
      }
    });
    const entries = store.employees
      .map((e) => ({ employee: e, periods: map.get(e) ?? [] }))
      .filter((e) => e.periods.length > 0);
    return { storeId: store.id, storeName: store.name, entries };
  });
}

export default function Task3() {
  const stores = useMemo(() => collectStores(org), []);
  const timetables = useMemo(() => buildTimeTables(stores, shifts), [stores]);

  return (
    <div className="space-y-6 font-sans text-gray-800">
      <header>
        <h2 className="text-lg font-semibold">Task 3</h2>
        <p className="text-sm text-gray-500">Geplante Schichten</p>
      </header>

      <section className="space-y-6">
        {timetables.map((t) => (
          <div
            key={t.storeId}
            className="rounded-lg border border-gray-300 shadow-sm overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-100 border-b border-gray-300 font-semibold text-gray-700">
              Time table {t.storeName}:
            </div>
            <ul className="divide-y divide-gray-200">
              {t.entries.map((e) => (
                <li
                  key={e.employee}
                  className="px-4 py-3 hover:bg-gray-50 cursor-default select-none"
                >
                  • {e.employee}: {e.periods.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
