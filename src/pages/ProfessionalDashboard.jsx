import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { serviceAPI } from '../services/api';
import Toast from '../components/Toast';

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userData = user || storedUser;
  const professionalId = userData?.id;

  const fetchServices = async () => {
    if (!professionalId) {
      alert("Please login again");
      window.location.href = '/login';
      return;
    }
    try {
      setLoading(true);
      const data = await serviceAPI.getByProfessional(professionalId);
      setServices(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [professionalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!professionalId) {
      alert("Please login again");
      window.location.href = '/login';
      return;
    }
    
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price)
      };

      await serviceAPI.createForPro(professionalId, payload);
      
      setToast({ message: 'Service created successfully!', type: 'success' });
      setFormData({ name: '', description: '', price: '' });
      fetchServices();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to create service.', type: 'error' });
    }
  };

  const getBadgeStyle = (status) => {
    const s = status?.toUpperCase() || 'PENDING';
    if (s === 'PENDING') return { backgroundColor: '#eab308', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' };
    if (s === 'APPROVED') return { backgroundColor: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' };
    return { backgroundColor: '#6b7280', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h2>Professional Dashboard</h2>
      <p>Create and manage your professional services.</p>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h3>Create New Service</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea 
              required
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white', minHeight: '80px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Price</label>
            <input 
              type="number" 
              required
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit Service
          </button>
        </form>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h3>My Services</h3>
        {loading ? <p>Loading services...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            {services.length === 0 ? <p>No services found.</p> : services.map(service => (
              <div key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '15px', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{service.title || service.name}</h4>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#aaa' }}>{service.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>${service.price}</div>
                  <span style={getBadgeStyle(service.status)}>{service.status?.toUpperCase() || 'PENDING'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
