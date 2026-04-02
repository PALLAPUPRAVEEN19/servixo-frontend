import { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Dashboard.css';

const AnalyticsContent = () => {
  const barData = [30, 45, 60, 25, 80, 55, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [ticketStats] = useState([
    { label: 'Payment', val: 35, color: 'var(--primary)' },
    { label: 'Technical', val: 28, color: 'var(--accent)' },
    { label: 'Account', val: 22, color: 'var(--success)' },
    { label: 'Service', val: 15, color: 'var(--error)' },
  ]);

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Platform Analytics</h2>
        <p>Visualizing support volume and user engagement metrics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Ticket Volume Chart */}
        <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3>Daily Ticket Volume</h3>
          <div className="chart-container" style={{ marginTop: '20px', height: '250px' }}>
            {barData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%' }}>
                <div 
                  className="chart-bar" 
                  style={{ height: `${val}%`, width: '100%', background: i === 4 ? 'var(--accent)' : 'var(--primary)' }}
                ></div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3>Ticket Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {ticketStats.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>{item.label}</span>
                  <span style={{ fontWeight: '700' }}>{item.val}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.val}%`, background: item.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="glass" style={{ padding: '30px', borderRadius: '24px', gridColumn: 'span 2' }}>
          <h3>Efficiency Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '5px' }}>Avg. Response</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>14m</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '5px' }}>Resolution Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>92%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '5px' }}>Escalation Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--error)' }}>4%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '5px' }}>CSAT Score</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>4.8/5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => (
  <Layout>
    <AnalyticsContent />
  </Layout>
);

export default Analytics;
