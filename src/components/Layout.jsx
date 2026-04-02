import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Dashboard.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content-wrapper" style={{ flex: 1 }}>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
