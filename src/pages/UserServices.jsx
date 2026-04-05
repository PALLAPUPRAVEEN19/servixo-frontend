import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const UserServicesContent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  const fetchServices = async (searchKeyword = '') => {
    try {
      setLoading(true);
      setError(null);
      const url = searchKeyword.trim() 
        ? `http://localhost:8080/api/services/search?keyword=${encodeURIComponent(searchKeyword)}` 
        : 'http://localhost:8080/api/services';
        
      const res = await axios.get(url);
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchServices(keyword);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const getBadgeStyle = (status) => {
    const s = status?.toUpperCase() || 'APPROVED';
    if (s === 'PENDING') return { backgroundColor: '#eab308', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' };
    if (s === 'APPROVED') return { backgroundColor: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' };
    return { backgroundColor: '#6b7280', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>Available Services</h2>
          <p>Find the best professional services for your needs.</p>
        </div>
        <div style={{ flex: '0 1 300px' }}>
          <input 
            type="text" 
            placeholder="Search services..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #444', background: '#222', color: 'white' }}
          />
        </div>
      </div>
      
      {loading ? <p style={{ textAlign: 'center' }}>Loading services...</p> : error ? <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {services.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              No services found matching your criteria.
            </p>
          ) : services.map(service => (
            <div key={service.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>{service.title || service.name}</h3>
                <span style={getBadgeStyle(service.status)}>{service.status?.toUpperCase() || 'APPROVED'}</span>
              </div>
              <p style={{ color: '#aaa', fontSize: '0.9rem', flexGrow: 1, marginBottom: '20px' }}>{service.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '15px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#3b82f6' }}>${service.price}</span>
                <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Hire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UserServices = () => (
  <Layout>
    <UserServicesContent />
  </Layout>
);

export default UserServices;
