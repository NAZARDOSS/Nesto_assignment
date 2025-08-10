import type { Headquarter } from "../types/task1";

export const org: Headquarter = {
  id: "hq",
  name: "BestFood Company",
  kind: "headquarter",
  children: [
    {
      id: "store-hamburg",
      name: "Hamburg",
      kind: "store",
      employees: [],
    },
    {
      id: "area-de",
      name: "Deutschland",
      kind: "area",
      manager: "",
      children: [
        {
          id: "area-south",
          name: "Süd",
          kind: "area",
          manager: "",
          children: [
            {
              id: "store-karlsruhe",
              name: "Karlsruhe",
              kind: "store",
              employees: [],
            },
            {
              id: "store-stuttgart",
              name: "Stuttgart",
              kind: "store",
              employees: [],
            },
            {
              id: "store-muenchen",
              name: "München",
              kind: "store",
              employees: [],
            },
          ],
        },
      ],
    },
  ],
};