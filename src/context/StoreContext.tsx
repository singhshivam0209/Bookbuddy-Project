import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, Book } from '../types/index';

// Expanded Catalog with 15 Books
const initialBooks: Book[] = [
  { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', subject: 'Computer Science', price: 85, cover: 'https://placehold.co/150x200/2c3e50/FFF?text=Algorithms' },
  { id: 2, title: 'Principles of Physics', author: 'David Halliday', subject: 'Physics', price: 60, cover: 'https://placehold.co/150x200/2980b9/FFF?text=Physics' },
  { id: 3, title: 'Organic Chemistry', author: 'Paula Yurkanis', subject: 'Chemistry', price: 95, cover: 'https://placehold.co/150x200/27ae60/FFF?text=Chemistry' },
  { id: 4, title: 'Calculus: Early Transcendentals', author: 'James Stewart', subject: 'Mathematics', price: 70, cover: 'https://placehold.co/150x200/8e44ad/FFF?text=Calculus' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', subject: 'Computer Science', price: 45, cover: 'https://placehold.co/150x200/2c3e50/FFF?text=Clean+Code' },
  { id: 6, title: 'University Physics', author: 'Hugh D. Young', subject: 'Physics', price: 110, cover: 'https://placehold.co/150x200/2980b9/FFF?text=Uni+Physics' },
  { id: 7, title: 'Physical Chemistry', author: 'Peter Atkins', subject: 'Chemistry', price: 88, cover: 'https://placehold.co/150x200/27ae60/FFF?text=Phys+Chem' },
  { id: 8, title: 'Linear Algebra Done Right', author: 'Sheldon Axler', subject: 'Mathematics', price: 55, cover: 'https://placehold.co/150x200/8e44ad/FFF?text=Linear+Algebra' },
  { id: 9, title: 'Design Patterns', author: 'Erich Gamma', subject: 'Computer Science', price: 65, cover: 'https://placehold.co/150x200/2c3e50/FFF?text=Design+Patterns' },
  { id: 10, title: 'Concepts of Modern Physics', author: 'Arthur Beiser', subject: 'Physics', price: 50, cover: 'https://placehold.co/150x200/2980b9/FFF?text=Modern+Physics' },
  { id: 11, title: 'Inorganic Chemistry', author: 'Gary L. Miessler', subject: 'Chemistry', price: 75, cover: 'https://placehold.co/150x200/27ae60/FFF?text=Inorganic' },
  { id: 12, title: 'Discrete Mathematics', author: 'Kenneth H. Rosen', subject: 'Mathematics', price: 80, cover: 'https://placehold.co/150x200/8e44ad/FFF?text=Discrete+Math' },
  { id: 13, title: 'Operating System Concepts', author: 'Abraham Silberschatz', subject: 'Computer Science', price: 90, cover: 'https://placehold.co/150x200/2c3e50/FFF?text=OS+Concepts' },
  { id: 14, title: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', subject: 'Physics', price: 20, cover: 'https://placehold.co/150x200/2980b9/FFF?text=Astrophysics' },
  { id: 15, title: 'The Joy of x', author: 'Steven Strogatz', subject: 'Mathematics', price: 25, cover: 'https://placehold.co/150x200/8e44ad/FFF?text=Joy+of+x' }
];

const savedWishlist = localStorage.getItem('bookBuddyWishlist');

const initialState: AppState = {
  user: null,
  books: initialBooks,
  wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
  searchQuery: '',
  filterSubject: 'All'
};

const storeReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload };
    case 'LOGOUT': return { ...state, user: null };
    case 'ADD_TO_WISHLIST': {
      const addedWishlist = [...state.wishlist, action.payload];
      localStorage.setItem('bookBuddyWishlist', JSON.stringify(addedWishlist));
      return { ...state, wishlist: addedWishlist };
    }
    case 'REMOVE_FROM_WISHLIST': {
      const filteredWishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      localStorage.setItem('bookBuddyWishlist', JSON.stringify(filteredWishlist));
      return { ...state, wishlist: filteredWishlist };
    }
    case 'SET_SEARCH': return { ...state, searchQuery: action.payload };
    case 'SET_FILTER': return { ...state, filterSubject: action.payload };
    case 'ADD_BOOK': return { ...state, books: [...state.books, action.payload] };
    default: return state;
  }
};

export const StoreContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction>; }>({
  state: initialState,
  dispatch: () => null,
});

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};