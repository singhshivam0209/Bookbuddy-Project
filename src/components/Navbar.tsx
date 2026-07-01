import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#2c3e50', color: 'white' }}>
      <h2>📚 BookBuddy</h2>
      <div>
        {state.user ? (
          <>
            <Link to="/catalog" style={{ margin: '0 10px', color: 'white' }}>Catalog</Link>
            {state.user.role === 'student' && <Link to="/wishlist" style={{ margin: '0 10px', color: 'white' }}>Wishlist</Link>}
            {state.user.role === 'staff' && <Link to="/admin" style={{ margin: '0 10px', color: 'white' }}>Admin</Link>}
            <Link to="/profile" style={{ margin: '0 10px', color: 'white' }}>Profile</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;