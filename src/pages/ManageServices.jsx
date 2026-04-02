import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/Services.css';
import { mockStorage } from '../services/mockStorage';

const ManageServicesContent = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(mockStorage.getAll('services'));
  }, []);

  const updateStatus = (id, status) => {
    mockStorage.updateItem('services', id, { status });
    setServices(mockStorage.getAll('services'));
  };


  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Service Moderation</h2>
        <p>Approve or reject professional service offerings across the platform.</p>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '20px' }}>Service Name</th>
              <th style={{ padding: '20px' }}>Category</th>
              <th style={{ padding: '20px' }}>Professional</th>
              <th style={{ padding: '20px' }}>Status</th>
              <th style={{ padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: '600' }}>{service.name}</td>
                <td style={{ padding: '20px' }}>{service.category}</td>
                <td style={{ padding: '20px' }}>{service.proName}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '800',
                    background: service.status === 'approved' ? 'var(--success)' : service.status === 'rejected' ? 'var(--error)' : 'rgba(255, 255, 255, 0.05)',
                    color: service.status === 'pending' ? 'var(--text-dim)' : 'white'
                  }}>
                    {service.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px', display: 'flex', gap: '8px' }}>
                  <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)' }}>Preview</button>
                  {service.status === 'pending' ? (
                    <>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => updateStatus(service.id, 'approved')}>Approve</button>
                      <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 0, 0, 0.1)', color: 'var(--error)' }} onClick={() => updateStatus(service.id, 'rejected')}>Reject</button>
                    </>
                  ) : (
                    <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)' }} onClick={() => updateStatus(service.id, 'pending')}>Reset to Pending</button>
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

const ManageServices = () => (
  <Layout>
    <ManageServicesContent />
  </Layout>
);

export default ManageServices;
