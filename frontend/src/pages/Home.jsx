import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Search, MapPin, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await apiService.getDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const results = doctors.filter(doctor =>
      doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(results);
  }, [searchTerm, doctors]);

  return (
    <div className="container section-padding">
      <section className="hero-section text-center" style={{ marginBottom: '4rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Find the Right Doctor <br /><span style={{ color: 'var(--primary)' }}>for your Health</span></h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Connect with highly qualified doctors and book appointments seamlessly in just a few clicks.
        </p>

        <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', padding: '0.5rem' }}>
          <div className="flex items-center gap-4" style={{ flex: 1, padding: '0 1rem' }}>
            <Search size={20} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by name or specialization..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent' }}
            />
          </div>
          <button className="btn btn-primary">Find Best Doctors</button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
          <h2>Available Specialists</h2>
          <span className="text-muted">{filteredDoctors.length} doctors found</span>
        </div>

        {loading ? (
          <div className="text-center section-padding">Loading doctors...</div>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {filteredDoctors.map((doctor) => (
              <Link to={`/doctor/${doctor.id}`} key={doctor.id} className="glass glass-card" style={{ padding: '1.5rem' }}>
                <div className="flex gap-4" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyItems: 'center', overflow: 'hidden' }}>
                     <User size={48} color="var(--text-muted)" style={{ margin: 'auto' }} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.25rem' }}>{doctor.user.name}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>{doctor.specialization}</p>
                    <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
                      <Star size={14} color="#facc15" fill="#facc15" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{doctor.rating}</span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>({doctor.experience} yrs exp)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <MapPin size={16} />
                  <span>{doctor.hospitalName}</span>
                </div>

                <div className="flex items-center gap-2 text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                  <Clock size={16} />
                  <span>{doctor.availability[0]?.dayOfWeek}s: {doctor.availability[0]?.startTime} - {doctor.availability[0]?.endTime}</span>
                </div>

                <div className="flex items-center justify-between" style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>Consultation Fee</p>
                    <p style={{ fontWeight: 700, fontSize: '1.25rem' }}>${doctor.consultationFee}</p>
                  </div>
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const User = ({ size, color, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default Home;
