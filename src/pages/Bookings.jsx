import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import Layout from '../components/Layout';
import '../styles/Services.css';

const BookingsContent = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;
      try {
        const data = await bookingAPI.getByUser(user.id);
        setBookings(data || []);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user?.id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      fontSize: '0.8rem', 
                      fontWeight: '700',
                      background: (booking.status === 'COMPLETED' || booking.status === 'APPROVED') ? 'var(--success)' : 
                                  booking.status === 'PENDING' ? 'var(--primary-glow)' : 
                                  'rgba(255, 0, 0, 0.1)',
                      color: (booking.status === 'COMPLETED' || booking.status === 'APPROVED') ? 'white' : 
                             booking.status === 'PENDING' ? 'var(--primary)' : 
                             'var(--error)'
                    }}>
                      {booking.status || 'PENDING'}
                    </span>
                  </td>
                  <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                    <button className="btn" style={{ padding: '8px 12px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)' }}>View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No bookings found. <a href="/services" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Book a service?</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Bookings = () => (
  <Layout>
    <BookingsContent />
  </Layout>
);

export default Bookings;
