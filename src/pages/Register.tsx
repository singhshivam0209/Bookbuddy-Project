import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Role } from '../types/index';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<Role>('student');
  
  const { dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      return alert("Please fill in all the required fields.");
    }
    
    // Simulating user registration and auto-login
    alert(`Account created successfully for ${name}!`);
    dispatch({ type: 'LOGIN', payload: { name, role } });
    navigate('/catalog');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>Create an Account</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="name" style={{ fontWeight: 'bold', fontSize: '14px' }}>Full Name *</label>
          <input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address *</label>
          <input id="email" type="email" placeholder="john@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="password" style={{ fontWeight: 'bold', fontSize: '14px' }}>Password *</label>
          <input id="password" type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="role" style={{ fontWeight: 'bold', fontSize: '14px' }}>Account Type</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value as Role)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
            <option value="student">Student</option>
            <option value="staff">Staff Member</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '12px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>
          Register Now
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        Already have an account? <Link to="/login" style={{ color: '#2980b9', fontWeight: 'bold' }}>Login here</Link>.
      </p>
    </div>
  );
};

export default Register;