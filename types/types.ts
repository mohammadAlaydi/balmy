// navigation types

export type NavLeaf = { title: string; path: string };
export type NavEntry =
  | { title: string; path: string; links?: never } // single link
  | { title: string; links: NavLeaf[]; path?: never }; // group with children
export type NavConfig = NavEntry[];



export interface TSectionTitle {
  title: string;
  titleStyle? : string
}
