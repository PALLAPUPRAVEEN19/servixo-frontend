import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Services', path: '/services' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Raise Ticket', path: '/raise-ticket' },
    { name: 'My Tickets', path: '/my-tickets' }
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Users', path: '/manage-users' },
    { name: 'Services', path: '/manage-services' },
    { name: 'Revenue', path: '/revenue' },
    { name: 'Tickets', path: '/admin-tickets' },
    { name: 'Settings', path: '/settings' }
  ];

  const proLinks = [
    { name: 'Dashboard', path: '/professional-dashboard' },
    { name: 'Services', path: '/pro-services' },
    { name: 'Bookings', path: '/pro-bookings' },
    { name: 'Messages', path: '/messages' },
    { name: 'Earnings', path: '/earnings' }
  ];

  const supportLinks = [
    { name: 'Dashboard', path: '/support-dashboard' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'Chat', path: '/support-chat' },
    { name: 'Analytics', path: '/support-analytics' },
    { name: 'Knowledge Base', path: '/kb' }
  ];

  const getLinks = () => {
    const userRole = typeof user?.role === 'string' 
      ? user.role.toLowerCase() 
      : user?.role?.name?.toLowerCase();

    if (userRole === 'admin') return adminLinks;
    if (userRole === 'professional') return proLinks;
    if (userRole === 'support') return supportLinks;
    return userLinks;
  };

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo">SERVIXO</div>
      <nav className="sidebar-nav">
        {getLinks().map(link => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
