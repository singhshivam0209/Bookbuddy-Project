import React, { useState, useContext, FormEvent } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Book } from '../types';

const AdminDashboard: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [newBook, setNewBook] = useState<Partial<Book>>({ title: '', author: '', subject: 'Computer Science', price: 0 });

  const handleAddBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price) return alert("Fill all fields.");
    
    dispatch({ 
      type: 'ADD_BOOK', 
      payload: { id: Date.now(), title: newBook.title, author: newBook.author, subject: newBook.subject || 'Computer Science', price: Number(newBook.price), cover: 'https://placehold.co/150x200?text=New+Book' } 
    });
    setNewBook({ title: '', author: '', subject: 'Computer Science', price: 0 });
    alert("Book added!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Staff Dashboard - Add Book</h2>
      <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', background: '#fff', padding: '20px', border: '1px solid #ddd' }}>
        <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} style={{ padding: '8px' }}/>
        <input type="text" placeholder="Author" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} style={{ padding: '8px' }}/>
        <input type="number" placeholder="Price" value={newBook.price || ''} onChange={e => setNewBook({...newBook, price: Number(e.target.value)})} style={{ padding: '8px' }}/>
        <button type="submit" style={{ padding: '10px', background: '#2ecc71', color: 'white', border: 'none' }}>Add Book</button>
      </form>
    </div>
  );
};

export default AdminDashboard;