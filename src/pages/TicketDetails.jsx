import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Toast from '../components/Toast';
import '../styles/Services.css';
import { mockStorage } from '../services/mockStorage';

const TicketDetailsContent = () => {
  const location = useLocation();
  const [ticket, setTicket] = useState(location.state?.ticket || mockStorage.getAll('tickets')[0]);
  const [status, setStatus] = useState(ticket?.status || 'open');
  const [priority, setPriority] = useState(ticket?.priority || 'high');
  const [showToast, setShowToast] = useState(false);

  const handleUpdate = () => {
    mockStorage.updateItem('tickets', ticket.id, { status, priority });
    setShowToast(true);
  };


  return (
    <div className="search-container">
      <div className="search-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Ticket: {ticket?.id || 'TIC-LOAD'}</h2>
            <p style={{ color: 'var(--text-dim)' }}>User: {ticket?.user || 'Unknown'} | Category: {ticket?.category || 'None'}</p>
          </div>
          <button className="btn btn-primary" onClick={handleUpdate}>Update Ticket</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Conversation */}
        <div className="glass" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Message History</h3>
          <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '15px' }}>
            <div style={{ fontWeight: '700', marginBottom: '5px' }}>John Doe <span style={{ fontWeight: 'normal', color: 'var(--text-dim)', fontSize: '0.8rem' }}>• 2 hours ago</span></div>
            <p>I tried to pay for the plumbing service twice but both times it said "Payment failed". However, my bank account shows the amount was deducted twice. Please help!</p>
          </div>
          <div style={{ padding: '20px', background: 'var(--primary-glow)', borderRadius: '15px', alignSelf: 'flex-end', maxWidth: '80%' }}>
            <div style={{ fontWeight: '700', marginBottom: '5px' }}>System Bot <span style={{ fontWeight: 'normal', color: 'var(--text-dim)', fontSize: '0.8rem' }}>• 1 hour ago</span></div>
            <p>Ticket created and assigned to support team. We will review your transaction logs shortly.</p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <textarea 
              placeholder="Type your response to the user..."
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '15px', color: 'white', minHeight: '150px', width: '100%' }}
            />
            <button className="btn btn-primary" style={{ marginTop: '10px' }}>Send Response</button>
          </div>
        </div>

        {/* Controls */}
        <div className="glass" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px', height: 'fit-content' }}>
          <h3>Settings</h3>
          <div className="input-group">
            <label>Current Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="input-group">
            <label>Priority Level</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Created</span>
              <span>2026-04-01 15:30</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Last Updated</span>
              <span>2026-04-01 16:45</span>
            </div>
          </div>
        </div>
      </div>

      {showToast && <Toast message="Ticket updated successfully!" type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
};

const TicketDetails = () => (
  <Layout>
    <TicketDetailsContent />
  </Layout>
);

export default TicketDetails;
