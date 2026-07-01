import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import BookCard from '../components/BookCard';

const Catalog: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  const filteredBooks = state.books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesSubject = state.filterSubject === 'All' || book.subject === state.filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Catalog</h2>
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Search by title or author..." value={state.searchQuery} onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })} style={{ padding: '8px', width: '300px' }} />
        <select value={state.filterSubject} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })} style={{ padding: '8px' }}>
          <option value="All">All Subjects</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredBooks.length > 0 ? filteredBooks.map(book => <BookCard key={book.id} book={book} />) : <p>No books found.</p>}
      </div>
    </div>
  );
};

export default Catalog;