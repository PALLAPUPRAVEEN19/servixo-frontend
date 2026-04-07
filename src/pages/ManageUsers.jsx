import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import '../styles/Services.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminAPI.getUsers();
        setUsers(data || []);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleBlock = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  if (loading) {
    return (
      <div className="search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading users...</p>
      </div>
    );
  }

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
            {users.length > 0 ? users.map((user) => {
              const roleName = user.role?.name || user.role || 'USER';
              const displayRole = roleName.toString().toUpperCase();
              const statusStr = user.status || 'active';
              
              return (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '20px', fontWeight: '600', color: 'var(--text-main)' }}>{user.name}</td>
                  <td style={{ padding: '20px', color: 'var(--text-dim)' }}>{user.email}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      fontSize: '0.75rem', 
                      fontWeight: '800',
                      background: displayRole === 'ADMIN' ? 'var(--accent)' : displayRole === 'PROFESSIONAL' ? 'var(--primary-glow)' : displayRole === 'SUPPORT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: displayRole === 'ADMIN' ? 'white' : displayRole === 'PROFESSIONAL' ? 'var(--primary)' : displayRole === 'SUPPORT' ? 'var(--success)' : 'var(--text-dim)'
                    }}>
                      {displayRole}
                    </span>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ 
                      color: statusStr === 'blocked' ? 'var(--error)' : 'var(--success)', 
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusStr === 'blocked' ? 'var(--error)' : 'var(--success)' }}></span>
                      {statusStr.charAt(0).toUpperCase() + statusStr.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '20px', display: 'flex', gap: '8px' }}>
                    <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)' }}>Edit</button>
                    <button 
                      className="btn" 
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.8rem', 
                        background: statusStr === 'blocked' ? 'var(--success)' : 'rgba(255, 255, 255, 0.05)',
                        color: statusStr === 'blocked' ? 'white' : 'inherit'
                      }}
                      onClick={() => toggleBlock(user.id)}
                    >
                      {statusStr === 'blocked' ? 'Unblock' : 'Block'}
                    </button>
                    <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 0, 0, 0.1)', color: 'var(--error)' }} onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No users found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
