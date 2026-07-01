import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Role } from '../types/index';

const Login: React.FC = () => {
  const [role, setRole] = useState<Role>('student');
  const [name, setName] = useState<string>('');
  const { dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter your registered name.");
    dispatch({ type: 'LOGIN', payload: { name, role } });
    navigate('/catalog');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>Login to BookBuddy</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="login-name" style={{ fontWeight: 'bold', fontSize: '14px' }}>Full Name</label>
          <input id="login-name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="login-role" style={{ fontWeight: 'bold', fontSize: '14px' }}>Account Type</label>
          <select id="login-role" value={role} onChange={(e) => setRole(e.target.value as Role)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
            <option value="student">Student</option>
            <option value="staff">Staff Member</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '12px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        New to BookBuddy? <Link to="/register" style={{ color: '#27ae60', fontWeight: 'bold' }}>Register here</Link>.
      </p>
    </div>
  );
};

export default Login;