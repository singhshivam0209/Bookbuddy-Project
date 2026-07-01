export type Role = 'student' | 'staff';

export interface User {
  name: string;
  role: Role;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  subject: string;
  price: number;
  cover: string;
}

export interface AppState {
  user: User | null;
  books: Book[];
  wishlist: Book[];
  searchQuery: string;
  filterSubject: string;
}

export type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_WISHLIST'; payload: Book }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: Book }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'ADD_BOOK'; payload: Book };