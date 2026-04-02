import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/Services.css';
import { mockStorage } from '../services/mockStorage';
import { useAuth } from '../context/AuthContext';

const ProBookingsContent = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const allBookings = mockStorage.getAll('bookings');
    // Using ID if available, otherwise name for legacy/fallback
    const proRequests = allBookings.filter(b => b.proId === user?.id || b.proName === user?.name);
    setRequests(proRequests);
  }, [user]);

  const updateStatus = (id, status) => {
    mockStorage.updateItem('bookings', id, { status });
    const allBookings = mockStorage.getAll('bookings');
    const proRequests = allBookings.filter(b => b.proId === user?.id || b.proName === user?.name);
    setRequests(proRequests);
  };


  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Job Requests</h2>
        <p>Accept or manage incoming bookings from your clients.</p>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '20px' }}>User</th>
              <th style={{ padding: '20px' }}>Service</th>
              <th style={{ padding: '20px' }}>Date & Time</th>
              <th style={{ padding: '20px' }}>Status</th>
              <th style={{ padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: '600' }}>{request.user}</td>
                <td style={{ padding: '20px' }}>{request.service}</td>
                <td style={{ padding: '20px' }}>{request.date} at {request.time}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '800',
                    background: request.status === 'approved' ? 'var(--success)' : request.status === 'rejected' ? 'var(--error)' : 'rgba(255, 255, 255, 0.05)',
                    color: request.status === 'pending' ? 'var(--text-dim)' : 'white'
                  }}>
                    {request.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px', display: 'flex', gap: '8px' }}>
                  {request.status === 'pending' && (
                    <>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => updateStatus(request.id, 'approved')}>Accept</button>
                      <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 0, 0, 0.1)', color: 'var(--error)' }} onClick={() => updateStatus(request.id, 'rejected')}>Reject</button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--success)', color: 'white' }} onClick={() => updateStatus(request.id, 'completed')}>Mark Completed</button>
                  )}
                  {request.status === 'completed' && (
                    <span style={{ color: 'var(--success)', fontSize: '0.9rem', fontWeight: '700' }}>Completed ✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProBookings = () => (
  <Layout>
    <ProBookingsContent />
  </Layout>
);

export default ProBookings;
