import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

const TicketPageContent = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', category: 'General' });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const userId = user?.id;

  const fetchTickets = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/api/tickets/user/${userId}`);
      setTickets(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) return;
      
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category
      };

      await axios.post(`http://localhost:8080/api/tickets/${userId}`, payload, {
        headers: { "Content-Type": "application/json" }
      });
      
      setToast({ message: 'Ticket created successfully!', type: 'success' });
      setFormData({ title: '', description: '', category: 'General' });
      fetchTickets();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to create ticket.', type: 'error' });
    }
  };

  const getBadgeStyle = (status) => {
    const s = status?.toUpperCase() || 'OPEN';
    if (s === 'OPEN') return { backgroundColor: '#3b82f6', color: 'white' };
    if (s === 'IN_PROGRESS' || s === 'IN-PROGRESS') return { backgroundColor: '#f97316', color: 'white' };
    if (s === 'RESOLVED') return { backgroundColor: '#22c55e', color: 'white' };
    if (s === 'CLOSED') return { backgroundColor: '#6b7280', color: 'white' };
    return { backgroundColor: '#6b7280', color: 'white' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', color: 'white' }}>
      <h2>Support Center</h2>
      <p>Submit a request or verify the status of your existing tickets.</p>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h3>Raise New Ticket</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
            <input 
              type="text" 
              required
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' }}
            >
              <option value="General">General</option>
              <option value="Billing">Billing</option>
              <option value="Technical">Technical</option>
              <option value="Account">Account</option>
            </select>
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
          <button type="submit" style={{ padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit Ticket
          </button>
        </form>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
        <h3>My Tickets</h3>
        {loading ? <p>Loading tickets...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            {tickets.length === 0 ? <p>No tickets found.</p> : tickets.map(ticket => (
              <div key={ticket.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '15px', borderLeft: `4px solid ${getBadgeStyle(ticket.status).backgroundColor}`, borderRadius: '0 8px 8px 0' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#3b82f6' }}>#{ticket.id}</span>
                    <span style={{ ...getBadgeStyle(ticket.status), padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {ticket.status?.toUpperCase() || 'OPEN'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#888', background: '#333', padding: '2px 6px', borderRadius: '4px' }}>{ticket.category}</span>
                  </div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{ticket.title || ticket.subject}</h4>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#aaa' }}>{ticket.description}</p>
                </div>
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{formatDate(ticket.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TicketPage = () => (
  <Layout>
    <TicketPageContent />
  </Layout>
);

export default TicketPage;
