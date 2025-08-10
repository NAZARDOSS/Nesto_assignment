export type NodeKind = "headquarter" | "area" | "store";

export interface BaseNode {
  readonly id: string;
  readonly name: string;
  readonly kind: NodeKind;
}

export interface Store extends BaseNode {
  readonly kind: "store";
  readonly employees: readonly string[];
}

export interface Area extends BaseNode {
  readonly kind: "area";
  readonly manager: string;
  readonly children: readonly OrgNode[];
}

export interface Headquarter extends BaseNode {
  readonly kind: "headquarter";
  readonly children: readonly OrgNode[];
}

export type OrgNode = Headquarter | Area | Store;
