import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, User, LogOut, Search } from 'lucide-react';

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, margin: '1rem', padding: '0.75rem 1.5rem' }}>
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <div style={{ backgroundColor: 'var(--primary)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
            <Activity color="white" size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>DABS</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="btn-outline" style={{ padding: '4px 8px', borderRadius: '4px' }}>Find Doctors</Link>
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-4">
                <User size={18} />
                <span>{userRole === 'DOCTOR' ? 'Dr. Dashboard' : 'My Dashboard'}</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-4 border-none color-error">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
