import { MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_RECORDS } from '../mockData';

// This service layer initially uses mock data as per user request 
// but is structured for future async/fetch calls to the Spring Boot backend.

const BASE_URL = 'http://localhost:8080/api';

const fetchWithError = async (url, options = {}) => {
  // In real implementation, this would handle the Firebase token injection
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('API call failed');
    return await response.json();
  } catch (error) {
    console.error('API Context Error:', error);
    throw error;
  }
};

export const apiService = {
  // Doctor APIs
  getDoctors: async () => {
    // return fetchWithError(`${BASE_URL}/doctors`);
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DOCTORS), 500));
  },
  
  getDoctorById: async (id) => {
    // return fetchWithError(`${BASE_URL}/doctors/${id}`);
    return new Promise((resolve) => {
      const doctor = MOCK_DOCTORS.find(d => d.id === parseInt(id));
      setTimeout(() => resolve(doctor), 300);
    });
  },

  // Appointment APIs
  createAppointment: async (appointmentData) => {
    // return fetchWithError(`${BASE_URL}/appointments`, {
    //   method: 'POST',
    //   body: JSON.stringify(appointmentData),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    return new Promise((resolve) => {
      const newAppointment = {
        id: MOCK_APPOINTMENTS.length + 1,
        ...appointmentData,
        status: 'PENDING'
      };
      MOCK_APPOINTMENTS.push(newAppointment);
      setTimeout(() => resolve(newAppointment), 500);
    });
  },

  getAppointmentsByPatient: async (patientId) => {
     // return fetchWithError(`${BASE_URL}/appointments`);
     return new Promise((resolve) => {
        const patientAppointments = MOCK_APPOINTMENTS.filter(a => a.patient.id === parseInt(patientId));
        setTimeout(() => resolve(patientAppointments), 400);
     });
  },

  getAppointmentsByDoctor: async (doctorId) => {
    // return fetchWithError(`${BASE_URL}/appointments`);
    return new Promise((resolve) => {
       const doctorAppointments = MOCK_APPOINTMENTS.filter(a => a.doctor.id === parseInt(doctorId));
       setTimeout(() => resolve(doctorAppointments), 400);
    });
 },

  // Medical Records APIs
  getRecordsByPatient: async (patientId) => {
      // return fetchWithError(`${BASE_URL}/records/${patientId}`);
      return new Promise((resolve) => {
        const records = MOCK_RECORDS.filter(r => r.patient.id === parseInt(patientId));
        setTimeout(() => resolve(records), 400);
      });
  }
};
