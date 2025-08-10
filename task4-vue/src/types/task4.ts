export type TimeHHMM =
  | `${0 | 1}${number}:${0 | 1 | 2 | 3 | 4 | 5}${number}`
  | `2${0 | 1 | 2 | 3}:${0 | 1 | 2 | 3 | 4 | 5}${number}`;

export type NodeKind = 'headquarter' | 'area' | 'store'

export interface OrgBase {
    readonly id: string
    readonly name: string
    readonly kind: NodeKind
}

export interface Store extends OrgBase {
    readonly kind: 'store'
    readonly employees: readonly string[]
}

export interface Area extends OrgBase {
    readonly kind: 'area'
    readonly manager?: string
    readonly children: readonly OrgNode[]
}

export interface Headquarter extends OrgBase {
    readonly kind: 'headquarter'
    readonly children: readonly OrgNode[]
}

export type OrgNode = Store | Area | Headquarter

export type StoreId = Store['id']
export type EmployeeName = Store['employees'][number]

export interface Shift {
    id: string
    readonly employee: EmployeeName
    readonly start: TimeHHMM
    readonly end: TimeHHMM
}

export type ShiftsByEmployee = Readonly<Record<EmployeeName, readonly Shift[]>>
