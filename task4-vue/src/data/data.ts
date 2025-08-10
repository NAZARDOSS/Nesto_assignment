import type { Headquarter, Shift } from "../types/task4";

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

export const shifts: readonly Shift[] = [
    { id: "1", employee: "Claus", start: "08:00", end: "16:00" },
    { id: "2", employee: "Claire", start: "10:00", end: "14:00" },
    { id: "3", employee: "Daisy", start: "12:00", end: "20:00" },
    { id: "4", employee: "Daniel", start: "11:00", end: "13:00" },
    { id: "5", employee: "Daniel", start: "15:00", end: "21:00" },
    { id: "6", employee: "Emil", start: "13:00", end: "23:00" },
    { id: "7", employee: "Fred", start: "12:00", end: "18:00" },
    // { id: "8", employee: "Fred", start: "18:00", end: "02:00" } // midnight crossing test
];
