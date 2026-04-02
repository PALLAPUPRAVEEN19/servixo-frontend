import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email && password) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      const success = login(email, password, role);
      
      if (success) {
        // Redirect based on role
        switch (role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'professional':
            navigate('/pro-dashboard');
            break;
          case 'support':
            navigate('/support-dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError('Invalid email, password, or role');
      }
    } else {
      setError('Please fill in all fields');
    }
  };


  const roles = ['user', 'professional', 'admin', 'support'];

  return (
    <div className="auth-page">
      <div className="auth-container glass">
        <div className="auth-header">
          <h1 className="logo-text">SERVIXO</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>

        {error && <div style={{ color: 'var(--error)', textAlign: 'center', marginBottom: '15px', fontWeight: '600' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>I'm a...</label>
            <div className="role-switcher">
              {roles.map(r => (
                <button
                  key={r}
                  type="button"
                  className={`role-btn ${role === r ? 'active' : ''}`}
                  onClick={() => setRole(r)}
                >
                  {r === 'support' ? 'Support Portal' : r === 'admin' ? 'Admin Portal' : r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
