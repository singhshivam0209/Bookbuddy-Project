// src/pages/Profile.tsx
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Profile: React.FC = () => {
  const { state } = useContext(StoreContext);
  if (!state.user) return null;
  return (
    <div style={{ padding: '20px' }}>
      <h2>My Profile</h2>
      <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd' }}>
        <p><strong>Name:</strong> {state.user.name}</p>
        <p><strong>Role:</strong> {state.user.role}</p>
      </div>
    </div>
  );
};
export default Profile;

