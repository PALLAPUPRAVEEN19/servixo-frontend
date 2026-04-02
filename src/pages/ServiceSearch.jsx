import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockStorage } from '../services/mockStorage';

const categories = ['All', 'Plumbing', 'Cleaning', 'Electrician', 'Painting', 'Outdoor', 'Education', 'Logistics'];

const ServiceSearchContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const allServices = mockStorage.getAll('services');
    const approved = allServices.filter(s => s.status === 'approved');
    setServices(approved);
  }, []);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleHire = (service) => {
    navigate('/booking', { state: { service } });
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Find Professional Services</h2>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for skills or names..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          {categories.map(cat => (
            <div 
              key={cat} 
              className={`filter-tag ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="professionals-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="pro-card glass">
            <div className="pro-info">
              <div className="pro-name">{service.name}</div>
              <div className="pro-skills">
                <span className="skill-tag">{service.category}</span>
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                Provider: <strong>{service.proName}</strong>
              </div>
            </div>
            <div className="pro-meta">
              <span>Verified 🛡️</span>
              <span style={{ color: 'var(--success)' }}>Active</span>
            </div>
            <div className="pro-price">{service.price}</div>
            <button className="btn btn-primary hire-btn" onClick={() => handleHire(service)}>Hire Now</button>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div style={{ color: 'var(--text-dim)', textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '40px' }}>
            No services found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceSearch = () => (
  <Layout>
    <ServiceSearchContent />
  </Layout>
);

export default ServiceSearch;
