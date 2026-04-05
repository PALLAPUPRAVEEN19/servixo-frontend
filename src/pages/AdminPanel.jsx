import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

const AdminPanelContent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/api/services/all');
        setServices(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/services/approve/${id}`);
      setToast({ message: 'Service successfully approved.', type: 'success' });
      setServices(prev => prev.map(s => s.id === id ? { ...s, status: 'APPROVED' } : s));
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to approve service.', type: 'error' });
    }
  };

  const getBadgeStyle = (status) => {
    const s = status?.toUpperCase() || 'PENDING';
    if (s === 'PENDING') return { backgroundColor: '#eab308', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' };
    if (s === 'APPROVED') return { backgroundColor: '#22c55e', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' };
    return { backgroundColor: '#6b7280', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
      <h2>Admin Panel - Service Approvals</h2>
      <p>Review and verify all services added by professionals.</p>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        {loading ? <p>Loading services...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #444' }}>
                <th style={{ padding: '12px' }}>Title</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{service.title || service.name}</td>
                  <td style={{ padding: '12px', color: '#aaa', fontSize: '0.9rem' }}>{service.description}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>${service.price}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={getBadgeStyle(service.status)}>
                      {service.status?.toUpperCase() || 'PENDING'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleApprove(service.id)}
                      disabled={service.status?.toUpperCase() === 'APPROVED'}
                      style={{ 
                        padding: '8px 16px', 
                        background: service.status?.toUpperCase() === 'APPROVED' ? '#555' : '#3b82f6', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: service.status?.toUpperCase() === 'APPROVED' ? 'not-allowed' : 'pointer', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {service.status?.toUpperCase() === 'APPROVED' ? 'Approved' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#aaa' }}>No services available in the system.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const AdminPanel = () => (
  <Layout>
    <AdminPanelContent />
  </Layout>
);

export default AdminPanel;
