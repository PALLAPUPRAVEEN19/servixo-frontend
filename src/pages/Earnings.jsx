import { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Services.css';
import { useAuth } from '../context/AuthContext';

const EarningsContent = () => {
  const { user } = useAuth();
  // TODO: Fetch earnings from API
  const [payouts] = useState([]);
  const [totalBalance] = useState(0);

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Earnings Overview</h2>
        <p>Track your income and upcoming platform payouts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="glass" style={{ padding: '30px', borderRadius: '24px', borderBottom: '4px solid var(--success)' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Total Balance</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '10px' }}>${totalBalance.toLocaleString()}.00</div>
        </div>
        <div className="glass" style={{ padding: '30px', borderRadius: '24px', borderBottom: '4px solid var(--primary)' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Pending Withdrawal</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '10px' }}>$0.00</div>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '20px' }}>Payout ID</th>
              <th style={{ padding: '20px' }}>Date</th>
              <th style={{ padding: '20px' }}>Method</th>
              <th style={{ padding: '20px' }}>Amount</th>
              <th style={{ padding: '20px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length > 0 ? payouts.map((pay) => (
              <tr key={pay.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: '700', color: 'var(--primary)' }}>{pay.id}</td>
                <td style={{ padding: '20px' }}>{pay.date}</td>
                <td style={{ padding: '20px' }}>{pay.method}</td>
                <td style={{ padding: '20px', fontWeight: '800' }}>{pay.amount}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '800',
                    background: pay.status === 'paid' ? 'var(--success)' : pay.status === 'pending' ? 'rgba(255, 255, 255, 0.05)' : 'var(--primary-glow)',
                    color: pay.status === 'paid' ? 'white' : pay.status === 'pending' ? 'var(--text-dim)' : 'var(--primary)'
                  }}>
                    {pay.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>No payout history yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Earnings = () => (
  <Layout>
    <EarningsContent />
  </Layout>
);

export default Earnings;
