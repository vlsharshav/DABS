import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Star, Clock, Calendar, CheckCircle, ChevronLeft } from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await apiService.getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <div className="container section-padding text-center">Loading specialist details...</div>;
  if (!doctor) return <div className="container section-padding text-center">Doctor not found</div>;

  return (
    <div className="container section-padding" style={{ maxWidth: '1000px' }}>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted" style={{ marginBottom: '2rem' }}>
        <ChevronLeft size={20} />
        <span>Back to search</span>
      </button>

      <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
        <section>
          <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyItems: 'center', margin: '0 auto 1.5rem', border: '4px solid var(--primary)' }}>
               <UserPlaceholder size={80} />
            </div>
            <h2 style={{ marginBottom: '0.25rem' }}>{doctor.user.name}</h2>
            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{doctor.specialization}</p>
            <div className="flex items-center justify-center gap-2" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              <Star size={18} color="#facc15" fill="#facc15" />
              <span style={{ fontWeight: 700 }}>{doctor.rating}</span>
              <span className="text-muted">({doctor.experience} years experience)</span>
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr', textAlign: 'left' }}>
              <div className="glass" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Consultation</p>
                <p style={{ fontWeight: 700 }}>${doctor.consultationFee}</p>
              </div>
              <div className="glass" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Patient Sat.</p>
                <p style={{ fontWeight: 700 }}>98%</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>About Specialist</h3>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
               Dr. {doctor.user.name} is a highly dedicated {doctor.specialization} specialist currently practicing at {doctor.hospitalName}. 
               With over {doctor.experience} years of experience, they have handled numerous complex cases and are committed to 
               providing the best possible care to patients.
            </p>

            <h3 style={{ marginBottom: '1rem' }}>Availability</h3>
            <div className="grid gap-4">
              {doctor.availability.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between glass" style={{ padding: '1rem' }}>
                  <div className="flex items-center gap-4">
                    <Calendar size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 600 }}>{slot.dayOfWeek}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted">
                    <Clock size={16} />
                    <span>{slot.startTime} - {slot.endTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(`/book/${doctor.id}`)}
              className="btn btn-primary" 
              style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}
            >
              Book Appointment Now
            </button>
            <div className="flex items-center gap-2 text-success">
               <CheckCircle size={18} />
               <span style={{ fontSize: '0.875rem' }}>Available Today</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const UserPlaceholder = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="var(--text-muted)" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ margin: 'auto' }}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default DoctorDetails;
