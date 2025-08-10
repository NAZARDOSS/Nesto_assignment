import type { Headquarter } from "../types/task2";

export const org: Headquarter = {
    id: "hq",
    name: "BestFood Company",
    kind: "headquarter",
    children: [
        {
            id: "store-hamburg",
            name: "Hamburg",
            kind: "store",
            employees: ["Claus", "Claire"],
        },
        {
            id: "area-de",
            name: "Deutschland",
            kind: "area",
            manager: "Alice",
            children: [
                {
                    id: "area-south",
                    name: "Süd",
                    kind: "area",
                    manager: "Bob",
                    children: [
                        {
                            id: "store-karlsruhe",
                            name: "Karlsruhe",
                            kind: "store",
                            employees: ["Daisy", "Daniel"],
                        },
                        {
                            id: "store-stuttgart",
                            name: "Stuttgart",
                            kind: "store",
                            employees: ["Emil"],
                        },
                        {
                            id: "store-muenchen",
                            name: "München",
                            kind: "store",
                            employees: ["Fred"],
                        },
                    ],
                },
            ],
        },
    ],
};
