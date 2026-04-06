// Mock data for the DABS application based on dto.md

export const MOCK_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "PATIENT",
    gender: "MALE",
    phone: "+1234567890",
    profilePic: null
  },
  {
    id: 2,
    name: "Dr. Sarah Smith",
    email: "sarah.smith@example.com",
    role: "DOCTOR",
    gender: "FEMALE",
    phone: "+1987654321",
    profilePic: null
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@dabs.com",
    role: "ADMIN",
    gender: "OTHER",
    phone: "+1000000000",
    profilePic: null
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    role: "DOCTOR",
    gender: "MALE",
    phone: "+1122334455",
    profilePic: null
  }
];

export const MOCK_DOCTORS = [
  {
    id: 1,
    user: MOCK_USERS[1],
    specialization: "Cardiology",
    experience: 12,
    hospitalName: "Central Health Center",
    consultationFee: 150.0,
    rating: 4.8,
    availability: [
       { dayOfWeek: "MONDAY", startTime: "09:00", endTime: "17:00" },
       { dayOfWeek: "WEDNESDAY", startTime: "09:00", endTime: "17:00" },
       { dayOfWeek: "FRIDAY", startTime: "09:00", endTime: "13:00" }
    ]
  },
  {
    id: 2,
    user: MOCK_USERS[3],
    specialization: "Dermatology",
    experience: 8,
    hospitalName: "Skin & Care Clinic",
    consultationFee: 100.0,
    rating: 4.5,
    availability: [
       { dayOfWeek: "TUESDAY", startTime: "10:00", endTime: "18:00" },
       { dayOfWeek: "THURSDAY", startTime: "10:00", endTime: "18:00" }
    ]
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 1,
    patient: MOCK_USERS[0],
    doctor: MOCK_DOCTORS[0],
    appointmentDate: "2026-04-10",
    timeSlot: "10:00-10:30",
    status: "CONFIRMED",
    reason: "Routine Heart Checkup"
  },
  {
    id: 2,
    patient: MOCK_USERS[0],
    doctor: MOCK_DOCTORS[1],
    appointmentDate: "2026-04-15",
    timeSlot: "14:00-14:30",
    status: "PENDING",
    reason: "Skin Rash Analysis"
  }
];

export const MOCK_RECORDS = [
  {
    id: 1,
    patient: MOCK_USERS[0],
    doctor: MOCK_DOCTORS[0],
    diagnosis: "Healthy recovery from minor heart issue",
    prescriptionUrl: "https://example.com/prescription-1.pdf",
    notes: "Patient should continue regular exercise.",
    createdAt: "2026-03-01T10:00:00Z"
  }
];
