// src/types/index.ts

// 1. Define the possible roles for our users
export type Role = 'student' | 'staff';

// 2. Define what a User object looks like
export interface User {
  name: string;
  role: Role;
}

// 3. Define the exact structure of a Book object
export interface Book {
  id: number;
  title: string;
  author: string;
  subject: string;
  price: number;
  cover: string; // URL for the cover image
}

// 4. Define the entire Global State of our application
export interface AppState {
  user: User | null;         // null means no one is logged in
  books: Book[];             // Array of Book objects
  wishlist: Book[];          // Array of Book objects saved by the student
  searchQuery: string;       // The text typed into the search bar
  filterSubject: string;     // The category selected in the dropdown
}

// 5. Define every possible Action that can change our state
export type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_WISHLIST'; payload: Book }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: Book }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'ADD_BOOK'; payload: Book };