import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const UserDashboardContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { title: 'Total Bookings', value: 0, color: 'var(--primary)' },
    { title: 'Active Services', value: 0, color: 'var(--accent)' },
    { title: 'Completed Jobs', value: 0, color: 'var(--success)' }
  ];

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
          <Link to="/dashboard/bookings" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' }}>View All History</Link>
        </div>
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-dim)' }}>No recent bookings.</div>
      </div>
    </div>
  );
};

export const UserDashboard = () => (
  <UserDashboardContent />
);

const AdminDashboardContent = () => {
  const [stats, setStats] = useState({ users: 0, professionals: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    
    axios.get("/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setStats(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ 
          width: '50px', height: '50px', 
          border: '4px solid rgba(255,255,255,0.1)', 
          borderTop: '4px solid var(--primary)', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Admin Overview</h2>
      
      {/* We use a specialized responsive grid just for these two heavy cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px', 
        marginBottom: '40px' 
      }}>
        
        {/* Card 1: Total Users */}
        <div className="stat-card glass" style={{ 
          borderBottom: '4px solid var(--primary)', 
          padding: '40px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ fontSize: '3rem' }}>👥</div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '5px' }}>Total Users</h3>
            <div className="value" style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1' }}>
              {stats.users}
            </div>
          </div>
        </div>

        {/* Card 2: Total Professionals */}
        <div className="stat-card glass" style={{ 
          borderBottom: '4px solid var(--accent)', 
          padding: '40px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ fontSize: '3rem' }}>💼</div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '5px' }}>Total Professionals</h3>
            <div className="value" style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1' }}>
              {stats.professionals}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const AdminDashboard = () => (
  <AdminDashboardContent />
);

const ProDashboardContent = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'My Services', value: 0, color: 'var(--primary)' },
    { title: 'Active Bookings', value: 0, color: 'var(--accent)' },
    { title: 'Completed Jobs', value: 0, color: 'var(--success)' },
    { title: 'Total Earnings', value: '$0', color: 'var(--success)' }
  ];

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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>0 Active Requests</span>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
            No upcoming bookings yet.
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
  <ProDashboardContent />
);

const SupportDashboardContent = () => {
  const stats = [
    { title: 'Total Tickets', value: 0, color: 'var(--primary)' },
    { title: 'Open', value: 0, color: 'var(--error)' },
    { title: 'In Progress', value: 0, color: 'var(--accent)' },
    { title: 'Resolved', value: 0, color: 'var(--success)' }
  ];

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
          <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px', color: 'var(--text-dim)' }}>
            No recent activity.
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
  <SupportDashboardContent />
);

export const Unauthorized = () => (
  <div style={{ padding: '40px', color: 'white', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h1 style={{ color: 'var(--error)', fontSize: '3rem' }}>403</h1>
    <h2>Unauthorized</h2>
    <p style={{ margin: '20px 0' }}>You do not have permission to access this page.</p>
    <button className="btn btn-primary" onClick={() => window.history.back()} style={{ width: 'fit-content', margin: '0 auto' }}>Go Back</button>
  </div>
);
