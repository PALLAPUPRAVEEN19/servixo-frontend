import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import '../styles/Services.css';
import '../styles/Profile.css';

const ProServicesContent = () => {
  const { user } = useAuth();
  // TODO: Fetch services from API
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ name: service.name, category: service.category, price: service.price.replace('$', '') });
    } else {
      setEditingService(null);
      setFormData({ name: '', category: '', price: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Replace with real API call
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData, price: `$${formData.price}` } : s));
    } else {
      const newService = {
        ...formData,
        id: `SVC-${Date.now()}`,
        price: `$${formData.price}`,
        proId: user?.id,
        proName: user?.name,
        status: 'pending'
      };
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
  };

  const deleteService = (id) => {
    // TODO: Replace with real API call
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="profile-page-container">
      <div className="profile-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2>My Service Listings</h2>
          <p>Manage your offerings and set your service prices.</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add New Service</button>
      </div>

      <div className="profile-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <tr>
              <th style={{ padding: '20px' }}>Service Name</th>
              <th style={{ padding: '20px' }}>Category</th>
              <th style={{ padding: '20px' }}>Price</th>
              <th style={{ padding: '20px' }}>Status</th>
              <th style={{ padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? services.map((service) => (
              <tr key={service.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: '600', color: 'var(--text-main)' }}>{service.name}</td>
                <td style={{ padding: '20px', color: 'var(--text-dim)' }}>{service.category}</td>
                <td style={{ padding: '20px', fontWeight: '800', color: 'var(--primary)' }}>{service.price}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem', 
                    fontWeight: '800',
                    background: service.status === 'approved' ? 'var(--success)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}>
                    {service.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px', display: 'flex', gap: '8px' }}>
                  <button className="btn" style={{ padding: '6px 15px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-main)' }} onClick={() => handleOpenModal(service)}>Edit</button>
                  <button className="btn" style={{ padding: '6px 15px', fontSize: '0.8rem', background: 'rgba(255, 71, 87, 0.1)', color: 'var(--error)' }} onClick={() => deleteService(service.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>No services listed yet. Click "+ Add New Service" to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="profile-card" style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
            <h3 style={{ marginBottom: '25px' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <form className="profile-form" onSubmit={handleSave}>
              <div className="form-group">
                <label>Service Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Standard House Cleaning"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input 
                  type="text" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                  placeholder="e.g. Cleaning"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Price ($ per hour)</label>
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  placeholder="e.g. 25"
                  required 
                />
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingService ? 'Save Changes' : 'Create Service'}</button>
                <button type="button" className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ProServices = () => (
  <Layout>
    <ProServicesContent />
  </Layout>
);

export default ProServices;
