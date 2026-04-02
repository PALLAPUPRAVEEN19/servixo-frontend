import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import Layout from '../components/Layout';
import '../styles/Profile.css';

const categories = ['Payment Issue', 'Technical Problem', 'Account Issue', 'Service Complaint', 'Booking Problem', 'Other'];

const RaiseTicketContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createTicket } = useTickets();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.category || !formData.description) {
      return;
    }
    createTicket({
      userId: user?.id,
      userName: user?.name || 'User',
      userEmail: user?.email || '',
      subject: formData.subject,
      category: formData.category,
      description: formData.description
    });
    setSubmitted(true);
  };

  return (
    <div className="profile-page-container">
      <div className="profile-section-header" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎫</div>
        <h2>Raise a Support Ticket</h2>
        <p>Having an issue? Let us know and our support team will get back to you shortly.</p>
      </div>

      <div className="profile-card" style={{ maxWidth: '650px', margin: '0 auto', borderTop: '4px solid var(--primary)' }}>
        {!submitted ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Issue Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="" disabled>Select a category...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Brief summary of your issue"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Describe Your Issue</label>
              <textarea
                name="description"
                placeholder="Please provide as much detail as possible so we can help you quickly..."
                value={formData.description}
                onChange={handleChange}
                style={{ minHeight: '180px' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Submit Ticket</button>
              <button type="button" className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)' }} onClick={() => navigate('/dashboard')}>Cancel</button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'fadeIn 0.5s ease-out' }}>✅</div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Ticket Submitted!</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.6', marginBottom: '30px' }}>
              Our support team has been notified and will respond shortly.<br />
              You can track the status from <strong>My Tickets</strong>.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/my-tickets')}>View My Tickets</button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.05)' }} onClick={() => { setSubmitted(false); setFormData({ subject: '', category: '', description: '' }); }}>Raise Another</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RaiseTicket = () => (
  <Layout>
    <RaiseTicketContent />
  </Layout>
);

export default RaiseTicket;
