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

// Authentication types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  avatar?: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  priceEn: string;
  code: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  description?: string;
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
}

// Form types
export interface InputInterFace {
  containerStyle?: string;
  containerColSpan?: string;
  labelColSpan?: string;
  inputColSpan?: string;
  inputStyle?: string;
  inputPlaceholder?: string;
  fieldName: string;
  inputType?: string;
  labelText?: string;
  labelStyle?: string;
  inputId?: string;
  control?: any;
}

export interface SelectInterFace {
  selectOptions: Array<{ label: string; value: string }>;
  containerStyle?: string;
  containerColSpan?: string;
  labelColSpan?: string;
  selectColSpan?: string;
  selectStyle?: string;
  fieldName: string;
  labelText?: string;
  labelStyle?: string;
  control?: any;
}