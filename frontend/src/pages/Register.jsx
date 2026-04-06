import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT',
    gender: 'MALE',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password);
      // In a real app, you would save the profile data to the backend here
      navigate('/login');
    } catch (err) {
      setError('Failed to create an account. ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center section-padding" style={{ minHeight: '80vh' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
        <p className="text-muted" style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Join DABS to manage your health appointments efficiently.
        </p>

        {error && (
          <div className="flex items-center gap-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--error)', fontSize: '0.875rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label>Full Name</label>
            <div className="flex items-center gap-4" style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
              <input 
                name="name"
                type="text" 
                required 
                style={{ paddingLeft: '3rem' }} 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label>Email Address</label>
            <div className="flex items-center gap-4" style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
              <input 
                name="email"
                type="email" 
                required 
                style={{ paddingLeft: '3rem' }} 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
              </select>
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label>Phone Number</label>
            <div className="flex items-center gap-4" style={{ position: 'relative' }}>
              <Phone size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
              <input 
                name="phone"
                type="tel" 
                required 
                style={{ paddingLeft: '3rem' }} 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <label>Password</label>
              <input 
                name="password"
                type="password" 
                required 
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input 
                name="confirmPassword"
                type="password" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginBottom: '1.5rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-muted" style={{ textAlign: 'center', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
