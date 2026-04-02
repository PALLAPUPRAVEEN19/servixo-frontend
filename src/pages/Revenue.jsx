import { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Services.css';

const RevenueContent = () => {
  const [transactions] = useState([
    { id: 'TXN101', user: 'John Doe', pro: 'Alex Johnson', service: 'Plumbing', amount: '$45.00', date: '2026-04-01', status: 'completed' },
    { id: 'TXN102', user: 'Emily Davis', pro: 'Sarah Miller', service: 'Cleaning', amount: '$30.00', date: '2026-04-01', status: 'completed' },
    { id: 'TXN103', user: 'Jane Smith', pro: 'Michael Chen', service: 'Gardening', amount: '$40.00', date: '2026-03-31', status: 'pending' },
    { id: 'TXN104', user: 'Chris Evans', pro: 'Emily Davis', service: 'Tutoring', amount: '$55.00', date: '2026-03-31', status: 'completed' },
    { id: 'TXN105', user: 'Robert Downey', pro: 'Jessica Taylor', service: 'Logistics', amount: '$35.00', date: '2026-03-30', status: 'failed' }
  ]);

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Revenue & Transactions</h2>
        <p>A centralized transaction and revenue tracking table for financial oversight.</p>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '20px' }}>TXN ID</th>
              <th style={{ padding: '20px' }}>User</th>
              <th style={{ padding: '20px' }}>Professional</th>
              <th style={{ padding: '20px' }}>Amount</th>
              <th style={{ padding: '20px' }}>Date</th>
              <th style={{ padding: '20px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '20px', color: 'var(--primary)', fontWeight: '700' }}>{txn.id}</td>
                <td style={{ padding: '20px' }}>{txn.user}</td>
                <td style={{ padding: '20px' }}>{txn.pro}</td>
                <td style={{ padding: '20px', fontWeight: '800' }}>{txn.amount}</td>
                <td style={{ padding: '20px', fontSize: '0.9rem' }}>{txn.date}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '800',
                    background: txn.status === 'completed' ? 'var(--success)' : txn.status === 'failed' ? 'var(--error)' : 'rgba(255, 255, 255, 0.05)',
                    color: txn.status === 'pending' ? 'var(--text-dim)' : 'white'
                  }}>
                    {txn.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Revenue = () => (
  <Layout>
    <RevenueContent />
  </Layout>
);

export default Revenue;
