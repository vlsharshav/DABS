import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { Calendar, Clock, FileText, CheckCircle, XCircle, AlertCircle, User, Activity } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, userRole } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (userRole === 'DOCTOR') {
          const apps = await apiService.getAppointmentsByDoctor(1); // Mock ID for Sarah Smith
          setAppointments(apps);
        } else {
          const apps = await apiService.getAppointmentsByPatient(1); // Mock ID for John Doe
          const recs = await apiService.getRecordsByPatient(1);
          setAppointments(apps);
          setRecords(recs);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [userRole]);

  if (loading) return <div className="container section-padding text-center">Loading dashboard...</div>;

  return (
    <div className="container section-padding">
      <div className="flex items-center justify-between" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Welcome, {currentUser?.email?.split('@')[0]}</h1>
          <p className="text-muted">You have {appointments.filter(a => a.status === 'PENDING').length} pending appointments</p>
        </div>
        <div className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ backgroundColor: 'var(--success)', width: '8px', height: '8px', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Role: {userRole}</span>
        </div>
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: userRole === 'DOCTOR' ? '1fr' : '1.5fr 1fr' }}>
        <section>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <h3>Your Appointments</h3>
            <button className="text-primary" style={{ fontSize: '0.875rem' }}>View all history</button>
          </div>

          <div className="grid gap-4">
            {appointments.length === 0 ? (
              <div className="glass text-center" style={{ padding: '3rem' }}>
                <Calendar size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <p className="text-muted">No appointments scheduled yet.</p>
              </div>
            ) : (
              appointments.map((app) => (
                <div key={app.id} className="glass flex items-center justify-between" style={{ padding: '1.5rem' }}>
                  <div className="flex items-center gap-6">
                    <div className="glass text-center" style={{ padding: '0.75rem', width: '70px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                       <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>{new Date(app.appointmentDate).toLocaleString('default', { month: 'short' })}</p>
                       <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{new Date(app.appointmentDate).getDate()}</p>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                         {userRole === 'DOCTOR' ? `Patient: ${app.patient.name}` : `Dr. ${app.doctor.user.name}`}
                      </h4>
                      <p className="text-muted" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={14} /> {app.timeSlot}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                     <div className="text-right">
                       <p className="text-muted" style={{ fontSize: '0.75rem' }}>Status</p>
                       <div className="flex items-center gap-2" style={{ color: app.status === 'CONFIRMED' ? 'var(--success)' : app.status === 'PENDING' ? 'var(--primary)' : 'var(--error)' }}>
                          {app.status === 'CONFIRMED' ? <CheckCircle size={14} /> : app.status === 'PENDING' ? <Activity size={14} /> : <XCircle size={14} />}
                          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{app.status}</span>
                       </div>
                     </div>
                     {userRole === 'DOCTOR' && app.status === 'PENDING' && (
                       <div className="flex gap-2">
                         <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Reject</button>
                         <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Accept</button>
                       </div>
                     )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {userRole !== 'DOCTOR' && (
          <section>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
              <h3>Medical History</h3>
              <FileText size={20} color="var(--text-muted)" />
            </div>
            
            <div className="grid gap-4">
              {records.length === 0 ? (
                <div className="glass text-center" style={{ padding: '2rem' }}>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>No medical records found.</p>
                </div>
              ) : (
                records.map((rec) => (
                  <div key={rec.id} className="glass" style={{ padding: '1.25rem' }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--primary)' }}>{rec.diagnosis}</p>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(rec.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Dr. {rec.doctor.user.name}</p>
                    <a href={rec.prescriptionUrl} className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                      Download Prescription
                    </a>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
