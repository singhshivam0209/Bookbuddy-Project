import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Book } from '../types';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { state, dispatch } = useContext(StoreContext);
  const isStudent = state.user?.role === 'student';
  const inWishlist = state.wishlist.some(item => item.id === book.id);

  const toggleWishlist = () => {
    inWishlist 
      ? dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: book })
      : dispatch({ type: 'ADD_TO_WISHLIST', payload: book });
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '200px', borderRadius: '8px', background: '#fff' }}>
      <img src={book.cover} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/150x200?text=No+Cover' }} />
      <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{book.title}</h3>
      <p style={{ fontSize: '0.9rem' }}><strong>Author:</strong> {book.author}</p>
      <p style={{ fontSize: '0.9rem' }}><strong>Subject:</strong> {book.subject}</p>
      <p style={{ fontSize: '0.9rem', color: '#27ae60' }}><strong>${book.price}</strong></p>
      {isStudent && (
        <button onClick={toggleWishlist} style={{ width: '100%', padding: '8px', marginTop: '10px', background: inWishlist ? '#e74c3c' : '#f39c12', color: 'white', border: 'none', borderRadius: '4px' }}>
          {inWishlist ? '❌ Remove' : '⭐ Wishlist'}
        </button>
      )}
    </div>
  );
};

export default BookCard;