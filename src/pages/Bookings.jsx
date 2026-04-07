import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import '../styles/Services.css';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const userData = user || storedUser;
  const userId = userData?.id;

  if (!userId && !storedUser) {
    alert("Session expired. Please login again");
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingAPI.getByUser(userId);
        setBookings(data || []);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCancel = async (bookingId) => {
    try {
      await bookingAPI.updateStatus(bookingId, 'CANCELLED');
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert("Failed to cancel booking.");
    }
  };

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase() || 'PENDING';
    if (s === 'COMPLETED') return { background: '#3b82f6', color: 'white' };
    if (s === 'CONFIRMED' || s === 'APPROVED') return { background: '#22c55e', color: 'white' };
    if (s === 'REJECTED' || s === 'CANCELLED') return { background: '#ef4444', color: 'white' };
    return { background: '#eab308', color: 'white' };
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>My Bookings</h2>
        <p>Manage your upcoming and past service appointments.</p>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '20px' }}>Service</th>
              <th style={{ padding: '20px' }}>Professional</th>
              <th style={{ padding: '20px' }}>Date</th>
              <th style={{ padding: '20px' }}>Status</th>
              <th style={{ padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>Loading bookings...</td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '20px' }}>{booking.service?.title || 'Service'}</td>
                  <td style={{ padding: '20px' }}>{booking.professional?.user?.name || 'Professional'}</td>
                  <td style={{ padding: '20px' }}>{formatDate(booking.bookingTime)}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      ...getStatusStyle(booking.status)
                    }}>
                      {booking.status?.toUpperCase() || 'PENDING'}
                    </span>
                  </td>
                  <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                    <button className="btn" style={{ padding: '8px 12px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)' }}>View</button>
                    {(booking.status?.toUpperCase() === 'PENDING') && (
                      <button 
                        className="btn" 
                        style={{ padding: '8px 12px', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444' }}
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No bookings found. <Link to="/user/services" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Book a service?</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
