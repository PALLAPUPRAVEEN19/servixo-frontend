import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserServices from './pages/UserServices';
import BookingForm from './pages/BookingForm';
import Bookings from './pages/Bookings';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import TicketPage from './pages/TicketPage';
import MyTicketDetail from './pages/MyTicketDetail';
import ManageUsers from './pages/ManageUsers';
import AdminPanel from './pages/AdminPanel';
import Revenue from './pages/Revenue';
import SystemSettings from './pages/SystemSettings';
import ProProfile from './pages/ProProfile';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import ProBookings from './pages/ProBookings';
import Messages from './pages/Messages';
import Earnings from './pages/Earnings';
import SupportPanel from './pages/SupportPanel';
import TicketDetails from './pages/TicketDetails';
import SupportChat from './pages/SupportChat';
import Analytics from './pages/Analytics';
import KnowledgeBase from './pages/KnowledgeBase';
import RoleBasedRoute from './components/RoleBasedRoute';
import { 
  UserDashboard, 
  AdminDashboard, 
  ProDashboard, 
  SupportDashboard, 
  Unauthorized 
} from './pages/Dashboards';
import './styles/global.css';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* User Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['user']} />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/services" element={<UserServices />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ticket-page" element={<TicketPage />} />
        <Route path="/my-ticket-detail" element={<MyTicketDetail />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-services" element={<AdminPanel />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/settings" element={<SystemSettings />} />
        <Route path="/admin-tickets" element={<SupportPanel />} />
        <Route path="/admin-ticket-details" element={<TicketDetails />} />
      </Route>

      {/* Professional Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['professional', 'PROFESSIONAL']} />}>
        <Route path="/professional-dashboard" element={<ProDashboard />} />
        <Route path="/pro-profile" element={<ProProfile />} />
        <Route path="/pro-services" element={<ProfessionalDashboard />} />
        <Route path="/pro-bookings" element={<ProBookings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/earnings" element={<Earnings />} />
      </Route>

      {/* Support Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['support']} />}>
        <Route path="/support-dashboard" element={<SupportDashboard />} />
        <Route path="/tickets" element={<SupportPanel />} />
        <Route path="/ticket-details" element={<TicketDetails />} />
        <Route path="/support-chat" element={<SupportChat />} />
        <Route path="/support-analytics" element={<Analytics />} />
        <Route path="/kb" element={<KnowledgeBase />} />
      </Route>

      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
