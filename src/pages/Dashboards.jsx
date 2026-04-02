import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { mockStorage } from '../services/mockStorage';
import '../styles/Dashboard.css';

const UserDashboardContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const allBookings = mockStorage.getAll('bookings').filter(b => b.userId === user?.id);
    const active = allBookings.filter(b => b.status === 'upcoming' || b.status === 'pending').length;
    const completed = allBookings.filter(b => b.status === 'completed').length;

    setStats([
      { title: 'Total Bookings', value: allBookings.length, color: 'var(--primary)' },
      { title: 'Active Services', value: active, color: 'var(--accent)' },
      { title: 'Completed Jobs', value: completed, color: 'var(--success)' }
    ]);
    setRecentBookings(allBookings.slice(-3).reverse());
  }, [user]);

  const featuredServices = [
    { name: 'Plumbing', icon: '🔧', color: '#3b82f6' },
    { name: 'Cleaning', icon: '🧹', color: '#10b981' },
    { name: 'Electrician', icon: '⚡', color: '#f59e0b' },
    { name: 'Painting', icon: '🎨', color: '#8b5cf6' }
  ];

  return (
    <div className="main-content-flow">
      <div className="profile-section-header" style={{ marginBottom: '30px' }}>
        <h2>User Dashboard</h2>
        <p>Welcome back, {user?.name}! Here's what's happening with your services.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card" 
            style={{ borderLeft: `4px solid ${stat.color}`, background: 'var(--bg-card)' }}
          >
            <h3>{stat.title}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        <div className="profile-card">
          <h3><span className="icon">🚀</span> Quick Book Service</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            {featuredServices.map((service, i) => (
              <div 
                key={i} 
                className="quick-service-card"
                style={{ 
                  padding: '20px', 
                  borderRadius: '16px', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                onClick={() => navigate('/services', { state: { category: service.name } })}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{service.icon}</div>
                <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{service.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '5px' }}>Book Now →</div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-card" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(59, 130, 246, 0.1) 100%)' }}>
          <h3><span className="icon">🎁</span> Exclusive Offers</h3>
          <div style={{ marginTop: '20px', padding: '25px', borderRadius: '20px', background: 'var(--primary)', boxShadow: '0 10px 30px var(--primary-glow)' }}>
            <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.4rem' }}>20% OFF</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>On your next house cleaning service with code <strong>CLEAN20</strong>.</p>
            <button className="btn" style={{ background: 'white', color: 'var(--primary)', marginTop: '15px', width: '100%' }}>Claim Offer</button>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3>Recent Bookings</h3>
          <a href="/bookings" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' }}>View All History</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {recentBookings.length > 0 ? recentBookings.map((book, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  {book.service[0]}
                </div>
                <div>
                  <div style={{ fontWeight: '700' }}>{book.service}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{book.proName}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: (book.status === 'upcoming' || book.status === 'pending') ? 'var(--primary)' : 'var(--success)' }}>{book.status.toUpperCase()}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{book.date}</div>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-dim)' }}>No recent bookings.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const UserDashboard = () => (
  <Layout>
    <UserDashboardContent />
  </Layout>
);

const AdminDashboardContent = () => {
  const [stats, setStats] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const users = mockStorage.getAll('users');
    const pros = users.filter(u => u.role === 'professional');
    const bookings = mockStorage.getAll('bookings');
    const services = mockStorage.getAll('services');
    const revenue = bookings.reduce((acc, curr) => {
      const amount = curr.amount || curr.price || '$0';
      const val = parseFloat(amount.replace('$', '').replace(',', '')) || 0;
      return acc + val;
    }, 0);

    setStats([
      { title: 'Total Users', value: users.length, color: 'var(--primary)' },
      { title: 'Professionals', value: pros.length, color: 'var(--accent)' },
      { title: 'Services List', value: services.length, color: 'var(--success)' },
      { title: 'Total Bookings', value: bookings.length, color: 'var(--primary-glow)' },
      { title: 'Total Revenue', value: `$${revenue.toLocaleString()}`, color: '#00FA9A' }
    ]);
    setRecentUsers(users.slice(-3).reverse());
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Admin Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card glass" 
            style={{ borderBottom: `4px solid ${stat.color}` }}
          >
            <h3>{stat.title}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3>Recent Registrations</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {recentUsers.map((user, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {user?.name ? user.name[0] : '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>{user?.name || 'Unknown User'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{user?.role || 'user'}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Just now</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3>Revenue Stats</h3>
          <div className="chart-container" style={{ marginTop: '20px' }}>
             {[50, 70, 40, 90, 60].map((h, i) => (
               <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard = () => (
  <Layout>
    <AdminDashboardContent />
  </Layout>
);

const ProDashboardContent = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [realJobs, setRealJobs] = useState([]);

  useEffect(() => {
    const allBookings = mockStorage.getAll('bookings').filter(b => b.proId === user?.id || b.proName === user?.name);
    const services = mockStorage.getAll('services').filter(s => s.proId === user?.id || s.proName === user?.name);
    const completed = allBookings.filter(b => b.status === 'completed').length;
    const earnings = allBookings.filter(b => b.status === 'completed').reduce((acc, curr) => {
      const amount = curr.amount || curr.price || '$0';
      const val = parseFloat(amount.replace('$', '').replace(',', '')) || 0;
      return acc + val;
    }, 0);

    setStats([
      { title: 'My Services', value: services.length, color: 'var(--primary)' },
      { title: 'Active Bookings', value: allBookings.filter(b => (b.status === 'upcoming' || b.status === 'pending' || b.status === 'approved')).length, color: 'var(--accent)' },
      { title: 'Completed Jobs', value: completed, color: 'var(--success)' },
      { title: 'Total Earnings', value: `$${earnings.toLocaleString()}`, color: 'var(--success)' }
    ]);
    setRealJobs(allBookings);
  }, [user]);

  const handleStatusUpdate = (id, newStatus) => {
    mockStorage.updateItem('bookings', id, { status: newStatus });
    const allBookings = mockStorage.getAll('bookings').filter(b => b.proId === user?.id || b.proName === user?.name);
    setRealJobs(allBookings);
    
    // Update stats
    const completed = allBookings.filter(b => b.status === 'completed').length;
    const earnings = allBookings.filter(b => b.status === 'completed').reduce((acc, curr) => {
      const amount = curr.amount || curr.price || '$0';
      const val = parseFloat(amount.replace('$', '').replace(',', '')) || 0;
      return acc + val;
    }, 0);
    
    setStats(prev => prev.map(s => {
      if (s.title === 'Active Bookings') return { ...s, value: allBookings.filter(b => (b.status === 'upcoming' || b.status === 'pending' || b.status === 'approved')).length };
      if (s.title === 'Completed Jobs') return { ...s, value: completed };
      if (s.title === 'Total Earnings') return { ...s, value: `$${earnings.toLocaleString()}` };
      return s;
    }));
  };

  return (
    <div className="main-content-flow">
      <div className="profile-section-header" style={{ marginBottom: '30px' }}>
        <h2>Professional Dashboard</h2>
        <p>Welcome back, {user?.name}! Manage your daily appointments and track your service growth.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card" 
            style={{ borderLeft: `4px solid ${stat.color}`, background: 'var(--bg-card)' }}
          >
            <h3>{stat.title}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '30px' }}>
        <div className="profile-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>Upcoming Jobs & Appointments</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{realJobs.length} Active Requests</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {realJobs.length > 0 ? realJobs.map((job, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                   <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>Customer Booking</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{job.service} • {job.date}</div>
                  </div>
                </div>
                 <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--success)' }}>{job.price || job.amount}</div>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                      {(job.status === 'pending' || job.status === 'upcoming') && (
                        <>
                          <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => handleStatusUpdate(job.id, 'approved')}>Accept</button>
                          <button className="btn" style={{ padding: '4px 8px', fontSize: '0.7rem', background: 'rgba(255,0,0,0.1)', color: 'var(--error)' }} onClick={() => handleStatusUpdate(job.id, 'rejected')}>Reject</button>
                        </>
                      )}
                      {job.status === 'approved' && (
                        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.7rem', background: 'var(--success)' }} onClick={() => handleStatusUpdate(job.id, 'completed')}>Complete</button>
                      )}
                      {job.status === 'completed' && <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: '700' }}>COMPLETED ✓</span>}
                      {job.status === 'rejected' && <span style={{ fontSize: '0.7rem', color: 'var(--error)', fontWeight: '700' }}>REJECTED</span>}
                    </div>
                  </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                No upcoming bookings yet.
              </div>
            )}
          </div>
        </div>

        <div className="profile-card">
          <h3>Growth Insights</h3>
          <div style={{ marginTop: '20px', padding: '20px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <p style={{ color: 'hsl(155, 100%, 75%)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Your rating has increased by <strong>0.2</strong> this month. Providing great service pays off!
            </p>
          </div>
          <div style={{ marginTop: '25px' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '15px' }}>Weekly Performance</h4>
            <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
               {[40, 70, 30, 90, 60, 80, 50].map((h, i) => (
                 <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0', opacity: 0.3 + (h/100) }}></div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProDashboard = () => (
  <Layout>
    <ProDashboardContent />
  </Layout>
);

const SupportDashboardContent = () => {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const tickets = mockStorage.getAll('tickets');
    const open = tickets.filter(t => t.status === 'open').length;
    const inProgress = tickets.filter(t => t.status === 'in-progress').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;

    setStats([
      { title: 'Total Tickets', value: tickets.length, color: 'var(--primary)' },
      { title: 'Open', value: open, color: 'var(--error)' },
      { title: 'In Progress', value: inProgress, color: 'var(--accent)' },
      { title: 'Resolved', value: resolved, color: 'var(--success)' }
    ]);
    setActivities(tickets.slice(-3).reverse());
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Support Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card glass" 
            style={{ borderBottom: `4px solid ${stat.color}` }}
          >
            <h3>{stat.title}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3>Recent Activity</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {activities.length > 0 ? activities.map((act, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div>
                  <div style={{ fontWeight: '700' }}>{act?.user || 'System Activity'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{act?.issue || act?.category || 'Notification'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Latest Update</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '800', color: act?.status === 'open' ? 'var(--error)' : 'var(--primary)' }}>{(act?.status || 'Active').toUpperCase()}</div>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-dim)' }}>No recent activity.</div>
            )}
          </div>
        </div>

        <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3>Performance Insights</h3>
          <p style={{ color: 'var(--text-dim)', marginTop: '10px', fontSize: '0.9rem' }}>
            Average response time is currently <strong>14 minutes</strong>, which is 15% better than last week's average. Keep it up!
          </p>
          <div style={{ marginTop: '20px', height: '100px', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
            {[40, 60, 30, 80, 50, 70, 90].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary-glow)', borderRadius: '4px 4px 0 0' }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupportDashboard = () => (
  <Layout>
    <SupportDashboardContent />
  </Layout>
);

export const Unauthorized = () => (
  <div style={{ padding: '40px', color: 'white', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h1 style={{ color: 'var(--error)', fontSize: '3rem' }}>403</h1>
    <h2>Unauthorized</h2>
    <p style={{ margin: '20px 0' }}>You do not have permission to access this page.</p>
    <button className="btn btn-primary" onClick={() => window.history.back()} style={{ width: 'fit-content', margin: '0 auto' }}>Go Back</button>
  </div>
);
