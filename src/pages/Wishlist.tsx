import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import BookCard from '../components/BookCard';

const Wishlist: React.FC = () => {
  const { state } = useContext(StoreContext);

  const calculateInsights = (): { avgPrice: string | number; topCategory: string } => {
    if (state.wishlist.length === 0) return { avgPrice: 0, topCategory: 'N/A' };
    const avgPrice = (state.wishlist.reduce((sum, book) => sum + book.price, 0) / state.wishlist.length).toFixed(2);
    const categories: Record<string, number> = {};
    state.wishlist.forEach(book => { categories[book.subject] = (categories[book.subject] || 0) + 1; });
    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);
    return { avgPrice, topCategory };
  };

  const insights = calculateInsights();

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Wishlist</h2>
      {state.wishlist.length > 0 && (
        <div style={{ background: '#e1f5fe', padding: '15px', borderRadius: '5px', marginBottom: '20px', color: '#0277bd' }}>
          <h4>💡 Wishlist Insights</h4>
          <p>Average Price: <strong>${insights.avgPrice}</strong> | Most Wished Category: <strong>{insights.topCategory}</strong></p>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {state.wishlist.length > 0 ? state.wishlist.map(book => <BookCard key={book.id} book={book} />) : <p>Your wishlist is empty!</p>}
      </div>
    </div>
  );
};

export default Wishlist;