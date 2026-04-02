import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Functional signup logic
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    signup(userData);

    let redirectPath = '/dashboard';
    if (formData.role === 'admin') redirectPath = '/admin-dashboard';
    else if (formData.role === 'professional') redirectPath = '/pro-dashboard';
    else if (formData.role === 'support') redirectPath = '/support-dashboard';

    navigate(redirectPath);
  };



  const roles = ['user', 'professional', 'admin', 'support'];

  return (
    <div className="auth-page">
      <div className="auth-container glass">
        <div className="auth-header">
          <h1 className="logo-text">SERVIXO</h1>
          <p>Join the community and start matching today.</p>
        </div>

        {error && <div style={{ color: 'var(--error)', textAlign: 'center', marginBottom: '15px', fontWeight: '600' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="name@example.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="••••••••" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>I want to join as a...</label>
            <div className="role-switcher">
              {roles.map(r => (
                <button
                  key={r}
                  type="button"
                  className={`role-btn ${formData.role === r ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, role: r })}
                >
                  {r === 'support' ? 'Support Portal' : r === 'admin' ? 'Admin Portal' : r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
