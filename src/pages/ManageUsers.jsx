import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Services.css';

const ManageUsersContent = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@pro.com', role: 'professional', status: 'active' },
    { id: 3, name: 'Mike Ross', email: 'mike@admin.com', role: 'admin', status: 'active' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'blocked' },
    { id: 5, name: 'Alex Johnson', email: 'alex@pro.com', role: 'professional', status: 'active' }
  ]);

  const toggleBlock = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>User Management</h2>
        <p>Monitor and govern all registered users and professionals.</p>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '20px' }}>Name</th>
              <th style={{ padding: '20px' }}>Email</th>
              <th style={{ padding: '20px' }}>Role</th>
              <th style={{ padding: '20px' }}>Status</th>
              <th style={{ padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: '600' }}>{user.name}</td>
                <td style={{ padding: '20px' }}>{user.email}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '800',
                    background: user.role === 'admin' ? 'var(--accent)' : user.role === 'professional' ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.05)',
                    color: user.role === 'admin' ? 'white' : user.role === 'professional' ? 'var(--primary)' : 'var(--text-dim)'
                  }}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    color: user.status === 'blocked' ? 'var(--error)' : 'var(--success)', 
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: user.status === 'blocked' ? 'var(--error)' : 'var(--success)' }}></span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '20px', display: 'flex', gap: '8px' }}>
                  <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)' }}>Edit</button>
                  <button 
                    className="btn" 
                    style={{ 
                      padding: '6px 12px', 
                      fontSize: '0.8rem', 
                      background: user.status === 'blocked' ? 'var(--success)' : 'rgba(255, 255, 255, 0.05)',
                      color: user.status === 'blocked' ? 'white' : 'inherit'
                    }}
                    onClick={() => toggleBlock(user.id)}
                  >
                    {user.status === 'blocked' ? 'Unblock' : 'Block'}
                  </button>
                  <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 0, 0, 0.1)', color: 'var(--error)' }} onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageUsers = () => (
  <Layout>
    <ManageUsersContent />
  </Layout>
);

export default ManageUsers;
