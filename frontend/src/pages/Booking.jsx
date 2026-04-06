import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const Booking = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    appointmentDate: '',
    timeSlot: '',
    reason: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

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
  }, [id, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await apiService.createAppointment({
        doctorId: parseInt(id),
        patientId: currentUser.uid, // In a real app this would be the DB ID
        ...bookingData
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container section-padding text-center">Preparing booking portal...</div>;
  if (success) {
    return (
      <div className="container flex items-center justify-center section-padding" style={{ minHeight: '60vh' }}>
        <div className="glass text-center" style={{ padding: '4rem', maxWidth: '500px' }}>
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={48} color="var(--success)" />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Appointment Confirmed!</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            Your appointment with Dr. {doctor.user.name} has been successfully booked. 
            Redirecting to your dashboard...
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding" style={{ maxWidth: '800px' }}>
      <div className="glass" style={{ padding: '3rem' }}>
        <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem' }}>
           <div style={{ backgroundColor: 'var(--primary)', padding: '12px', borderRadius: '12px' }}>
             <Calendar color="white" size={24} />
           </div>
           <div>
             <p className="text-muted" style={{ fontSize: '0.875rem' }}>Appointment with</p>
             <h3>Dr. {doctor.user.name}</h3>
           </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '1.5rem' }}>
            <div>
              <label>Select Date</label>
              <input 
                type="date" 
                required 
                value={bookingData.appointmentDate}
                onChange={(e) => setBookingData({...bookingData, appointmentDate: e.target.value})}
              />
            </div>
            <div>
              <label>Select Time Slot</label>
              <select 
                required 
                value={bookingData.timeSlot}
                onChange={(e) => setBookingData({...bookingData, timeSlot: e.target.value})}
              >
                <option value="">Select a slot</option>
                <option value="09:00-09:30">09:00 AM - 09:30 AM</option>
                <option value="10:00-10:30">10:00 AM - 10:30 AM</option>
                <option value="11:00-11:30">11:00 AM - 11:30 AM</option>
                <option value="14:00-14:30">02:00 PM - 02:30 PM</option>
                <option value="15:00-15:30">03:00 PM - 03:30 PM</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label>Reason for Visit</label>
            <textarea 
              rows="4" 
              required 
              placeholder="Briefly describe your health concern..."
              value={bookingData.reason}
              onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
            ></textarea>
          </div>

          <div className="flex items-center gap-4" style={{ padding: '1rem', backgroundColor: 'rgba(14, 165, 233, 0.05)', borderRadius: '8px', border: '1px solid rgba(14, 165, 233, 0.1)', marginBottom: '2.5rem' }}>
             <AlertCircle size={20} color="var(--primary)" />
             <span className="text-muted" style={{ fontSize: '0.875rem' }}>
               Note: You will be able to cancel or reschedule this appointment up to 24 hours before the scheduled time.
             </span>
          </div>

          <div className="flex items-center justify-between">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem' }} disabled={submitting}>
              {submitting ? 'Confirming Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
