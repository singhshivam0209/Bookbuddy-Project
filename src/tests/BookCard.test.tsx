import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreContext } from '../context/StoreContext';
import BookCard from '../components/BookCard';
import { AppState, AppAction, Book } from '../types/index';

// Helper function to render with mock typed context
const renderWithContext = (
  component: React.ReactElement, 
  mockState: Partial<AppState>, 
  mockDispatch: React.Dispatch<AppAction>
) => {
  return render(
    <StoreContext.Provider value={{ state: mockState as AppState, dispatch: mockDispatch }}>
      {component}
    </StoreContext.Provider>
  );
};

describe('BookCard Component', () => {
  const mockBook: Book = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    subject: 'Science',
    price: 50,
    cover: 'test-cover.jpg'
  };

  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  test('renders book details correctly', () => {
    const mockState: Partial<AppState> = { 
      user: { name: 'Student', role: 'student' }, 
      wishlist: [] 
    };
    
    renderWithContext(<BookCard book={mockBook} />, mockState, mockDispatch);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
  });

  test('does not show wishlist button for staff', () => {
    const mockState: Partial<AppState> = { 
      user: { name: 'Staff', role: 'staff' }, 
      wishlist: [] 
    };
    
    renderWithContext(<BookCard book={mockBook} />, mockState, mockDispatch);
    
    expect(screen.queryByText(/Add to Wishlist/i)).not.toBeInTheDocument();
  });

  test('dispatches ADD_TO_WISHLIST when clicked by a student', () => {
    const mockState: Partial<AppState> = { 
      user: { name: 'Student', role: 'student' }, 
      wishlist: [] 
    };
    
    renderWithContext(<BookCard book={mockBook} />, mockState, mockDispatch);
    
    const button = screen.getByText(/Add to Wishlist/i);
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_WISHLIST',
      payload: mockBook
    });
  });
});