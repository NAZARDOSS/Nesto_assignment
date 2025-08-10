import { org, shifts } from "@/data/data";
import type { OrgNode, Store, Shift, TimeHHMM } from "@/types/task4";

export type StoreLite = Pick<Store, "id" | "name" | "employees">;

function collectStores(node: OrgNode, acc: StoreLite[] = []): StoreLite[] {
  if (node.kind === "store") {
    const employees = node.employees.map((e) => e.trim());
    acc.push({ id: node.id, name: node.name, employees });
  } else if ("children" in node) {
    for (const child of node.children) collectStores(child as OrgNode, acc);
  }
  return acc;
}

export const stores = collectStores(org) as readonly StoreLite[];

const toHHMM = (t: string): TimeHHMM => {
  const [hRaw = "0", mRaw = "0"] = t.split(":");
  const h = Math.max(0, Math.min(23, parseInt(hRaw, 10) || 0));
  const m = Math.max(0, Math.min(59, parseInt(mRaw, 10) || 0));
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}` as TimeHHMM;
};

export const normalizedShifts: readonly Shift[] = shifts.map((s): Shift => ({
  id: s.id,
  employee: s.employee.trim(),
  start: toHHMM(s.start),
  end: toHHMM(s.end),
}));

export const shiftsByEmployee: Readonly<Record<string, readonly Shift[]>> =
  normalizedShifts.reduce((map, s) => {
    (map[s.employee] ||= []).push(s);
    return map;
  }, {} as Record<string, Shift[]>);
