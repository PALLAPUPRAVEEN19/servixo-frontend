import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Services', path: '/dashboard/services' },
    { name: 'Bookings', path: '/dashboard/bookings' },
    { name: 'Feedback', path: '/dashboard/feedback' },
    { name: 'Raise Ticket', path: '/dashboard/tickets' },
    { name: 'Settings', path: '/dashboard/settings' }
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Services', path: '/admin/manage-services' },
    { name: 'Revenue', path: '/admin/revenue' },
    { name: 'Tickets', path: '/admin/tickets' },
    { name: 'Settings', path: '/admin/settings' }
  ];

  const proLinks = [
    { name: 'Dashboard', path: '/professional' },
    { name: 'Services', path: '/professional/services' },
    { name: 'Bookings', path: '/professional/bookings' },
    { name: 'Messages', path: '/professional/messages' },
    { name: 'Earnings', path: '/professional/earnings' }
  ];

  const supportLinks = [
    { name: 'Dashboard', path: '/support' },
    { name: 'Tickets', path: '/support/tickets' },
    { name: 'Chat', path: '/support/chat' },
    { name: 'Analytics', path: '/support/analytics' },
    { name: 'Knowledge Base', path: '/support/kb' }
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
