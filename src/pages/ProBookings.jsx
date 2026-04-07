import { useState, useEffect } from 'react';
import '../styles/Services.css';
import { useAuth } from '../context/AuthContext';
import { proAPI, bookingAPI } from '../services/api';

const ProBookings = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const userData = user || storedUser;
  const professionalId = userData?.id;

  if (!professionalId && !storedUser) {
    alert("Session expired. Please login again");
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await proAPI.getBookings(professionalId);
        setRequests(data || []);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    if (professionalId) {
      fetchBookings();
    }
  }, [professionalId]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingAPI.updateStatus(bookingId, newStatus);
      setRequests(requests.map(r => r.id === bookingId ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
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
            {loading ? (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>Loading bookings...</td>
              </tr>
            ) : requests.length > 0 ? requests.map((request) => (
              <tr key={request.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: '600' }}>{request.user?.name || request.user}</td>
                <td style={{ padding: '20px' }}>{request.service?.title || request.service}</td>
                <td style={{ padding: '20px' }}>{request.serviceDate || request.date} at {request.arrivalTime || request.time}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    background: request.status === 'COMPLETED' ? '#3b82f6' : request.status === 'CONFIRMED' || request.status === 'APPROVED' ? '#22c55e' : request.status === 'REJECTED' || request.status === 'CANCELLED' ? '#ef4444' : '#eab308',
                    color: 'white'
                  }}>
                    {(request.status || 'PENDING').toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px', display: 'flex', gap: '8px' }}>
                  {(request.status?.toUpperCase() === 'PENDING' || !request.status) && (
                    <>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleStatusUpdate(request.id, 'CONFIRMED')}>Accept</button>
                      <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }} onClick={() => handleStatusUpdate(request.id, 'REJECTED')}>Reject</button>
                    </>
                  )}
                  {(request.status?.toUpperCase() === 'CONFIRMED' || request.status?.toUpperCase() === 'APPROVED') && (
                    <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#3b82f6', color: 'white' }} onClick={() => handleStatusUpdate(request.id, 'COMPLETED')}>Mark Completed</button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>No job requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProBookings;
