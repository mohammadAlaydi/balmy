// Navigation types
export type NavLeaf = {
  title: string;
  path: string;
};

export type NavEntry =
  | { title: string; path: string; links?: never } // Single link
  | { title: string; links: NavLeaf[]; path?: never }; // Group with children

export type NavConfig = NavEntry[];

// Component types
export interface TSectionTitle {
  title: string;
  titleStyle?: string;
}
