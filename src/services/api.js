import axios from 'axios';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';
const USE_LOCAL_FALLBACK = true; // Use local fallback if API is unavailable

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle different error scenarios
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('isLocalMode');
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden
          break;
        case 404:
          // Not found
          break;
        case 429:
          // Rate limited
          break;
        case 500:
          // Server error
          break;
        default:
          break;
      }
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
    } else if (!navigator.onLine) {
      // Offline
    }
    
    return Promise.reject(error);
  }
);

// Local dummy data for fallback mode only
const localDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', email: 'sarah.johnson@smartcare.com', phone: '+1 234-567-8901', experience: '10 years', image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=00bcd4&color=fff&size=128' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', email: 'michael.chen@smartcare.com', phone: '+1 234-567-8902', experience: '8 years', image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2196f3&color=fff&size=128' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', email: 'emily.rodriguez@smartcare.com', phone: '+1 234-567-8903', experience: '12 years', image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=00bcd4&color=fff&size=128' },
  { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedic', email: 'james.wilson@smartcare.com', phone: '+1 234-567-8904', experience: '15 years', image: 'https://ui-avatars.com/api/?name=James+Wilson&background=2196f3&color=fff&size=128' },
  { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Dermatologist', email: 'lisa.anderson@smartcare.com', phone: '+1 234-567-8905', experience: '7 years', image: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=00bcd4&color=fff&size=128' },
  { id: 6, name: 'Dr. Robert Taylor', specialization: 'General Physician', email: 'robert.taylor@smartcare.com', phone: '+1 234-567-8906', experience: '20 years', image: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=2196f3&color=fff&size=128' }
];

const localPatients = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+1 234-567-8910', age: 35, gender: 'Male', address: '123 Main St, City, State', bloodGroup: 'O+', image: 'https://ui-avatars.com/api/?name=John+Doe&background=00bcd4&color=fff&size=128' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 234-567-8911', age: 28, gender: 'Female', address: '456 Oak Ave, City, State', bloodGroup: 'A+', image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=2196f3&color=fff&size=128' },
  { id: 3, name: 'David Brown', email: 'david.brown@email.com', phone: '+1 234-567-8912', age: 42, gender: 'Male', address: '789 Pine Rd, City, State', bloodGroup: 'B+', image: 'https://ui-avatars.com/api/?name=David+Brown&background=00bcd4&color=fff&size=128' },
  { id: 4, name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 234-567-8913', age: 31, gender: 'Female', address: '321 Elm St, City, State', bloodGroup: 'AB+', image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=2196f3&color=fff&size=128' }
];

// Initialize local appointments
const getInitialAppointments = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  return [
    { id: 1, patientId: 1, patientName: 'John Doe', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: todayStr, time: '10:00 AM', status: 'Pending', reason: 'Regular checkup' },
    { id: 2, patientId: 2, patientName: 'Jane Smith', doctorId: 2, doctorName: 'Dr. Michael Chen', specialization: 'Neurologist', date: todayStr, time: '11:00 AM', status: 'Pending', reason: 'Headache consultation' },
    { id: 3, patientId: 3, patientName: 'David Brown', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: todayStr, time: '02:00 PM', status: 'Completed', reason: 'Follow-up appointment' },
    { id: 4, patientId: 4, patientName: 'Maria Garcia', doctorId: 3, doctorName: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', date: tomorrowStr, time: '09:00 AM', status: 'Pending', reason: 'Child health checkup' },
    { id: 5, patientId: 1, patientName: 'John Doe', doctorId: 4, doctorName: 'Dr. James Wilson', specialization: 'Orthopedic', date: tomorrowStr, time: '03:00 PM', status: 'Pending', reason: 'Knee pain consultation' }
  ];
};

let localAppointments = getInitialAppointments();

// Local users for fallback (use unique passwords to avoid breach warnings)
const LOCAL_USERS = [
  { id: 1, email: 'admin@smartcare.com', password: 'SmartAdmin2024!', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'doctor@smartcare.com', password: 'SmartDoc2024!', role: 'doctor', name: 'Dr. Sarah Johnson' },
  { id: 3, email: 'patient@email.com', password: 'SmartPatient2024!', role: 'patient', name: 'John Doe' },
  { id: 4, email: 'patient2@email.com', password: 'SmartPatient2!', role: 'patient', name: 'Jane Smith' }
];

const USER_ID_TO_PATIENT_ID = { 3: 1, 4: 2 };
const USER_ID_TO_DOCTOR_ID = { 2: 1 }; // Doctor user (id=2) maps to Dr. Sarah Johnson (doctorId=1)

// Helper functions for local fallback mode
const handleLocalLogin = (email, password, role) => {
  const user = LOCAL_USERS.find(u => u.email === email && u.role === role);
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }
  const token = 'local_' + btoa(JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLocalMode', 'true');
  return { token, user };
};

const handleLocalGetDoctors = () => localDoctors;
const handleLocalGetPatients = () => localPatients;

const handleLocalGetAppointments = (role, userId) => {
  // Convert userId to number if it's a string
  const numericUserId = parseInt(userId, 10);
  
  let filtered = [...localAppointments];
  if (role === 'patient') {
    const patientId = USER_ID_TO_PATIENT_ID[numericUserId] || numericUserId;
    filtered = localAppointments.filter(a => a.patientId === patientId);
  } else if (role === 'doctor') {
    // Map user ID to doctor ID
    const doctorId = USER_ID_TO_DOCTOR_ID[numericUserId] || numericUserId;
    filtered = localAppointments.filter(a => a.doctorId === doctorId);
  }
  // If no role specified, return all appointments
  return filtered;
};

const handleLocalCreateAppointment = (data) => {
  const { patientId, doctorId, date, time, reason } = data;
  const actualPatientId = USER_ID_TO_PATIENT_ID[patientId] || patientId;
  const doctor = localDoctors.find(d => d.id === doctorId);
  const patient = localPatients.find(p => p.id === actualPatientId);
  if (!doctor) throw new Error('Doctor not found');
  if (!patient) throw new Error('Patient not found');
  
  const newAppointment = {
    id: Date.now(),
    patientId: actualPatientId,
    patientName: patient.name,
    doctorId,
    doctorName: doctor.name,
    specialization: doctor.specialization,
    date,
    time,
    status: 'Pending',
    reason
  };
  localAppointments.push(newAppointment);
  return newAppointment;
};

const handleLocalStats = () => ({
  totalDoctors: localDoctors.length,
  totalPatients: localPatients.length,
  appointmentsToday: localAppointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
  totalAppointments: localAppointments.length,
  pendingAppointments: localAppointments.filter(a => a.status === 'Pending').length,
  completedAppointments: localAppointments.filter(a => a.status === 'Completed').length
});

const handleLocalCancelAppointment = (id) => {
  const index = localAppointments.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Appointment not found');
  localAppointments.splice(index, 1);
  return { success: true, message: 'Appointment cancelled successfully' };
};

const handleLocalUpdateAppointment = (id, data) => {
  const index = localAppointments.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Appointment not found');
  localAppointments[index] = { ...localAppointments[index], ...data };
  return localAppointments[index];
};

// Helper to check if error is network-related
const isNetworkError = (error) => {
  return (
    !error.response || // No response means network error
    error.code === 'ERR_NETWORK' ||
    error.code === 'ECONNREFUSED' ||
    error.message.includes('Network Error') ||
    error.message.includes('Failed to fetch')
  );
};

// API functions with real API + optional local fallback
export const authAPI = {
  login: async (email, password, role) => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isLocalMode', 'false');
      }
      return response.data;
    } catch (error) {
      console.log('[API] Login error:', error.message);
      console.log('[API] Error response:', error.response?.data);
      
      // Try local fallback on network errors OR credential errors
      // This ensures users can still login even if backend has issues
      if (USE_LOCAL_FALLBACK && (isNetworkError(error) || error.response?.status === 400)) {
        console.log('[API] Trying local login fallback');
        try {
          return handleLocalLogin(email, password, role);
        } catch (localError) {
          // If local also fails, throw the original error
          console.log('[API] Local fallback also failed:', localError.message);
          throw new Error(error.response?.data?.message || 'Invalid credentials');
        }
      }
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLocalMode');
  },
  
  verify: async () => {
    const token = localStorage.getItem('token');
    const isLocal = localStorage.getItem('isLocalMode') === 'true';
    const user = localStorage.getItem('user');
    
    if (isLocal && token && user) {
      return JSON.parse(user);
    }
    
    if (!token) return null;
    
    try {
      const response = await api.get('/auth/verify');
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isLocalMode: () => localStorage.getItem('isLocalMode') === 'true',
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK && error.code === 'ERR_NETWORK') {
        throw new Error('Cannot register in offline mode');
      }
      throw error;
    }
  }
};

export const doctorsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/doctors');
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK) {
        return handleLocalGetDoctors();
      }
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      // Try to find in local
      const doctor = localDoctors.find(d => d.id === parseInt(id));
      if (doctor) return doctor;
      throw new Error('Doctor not found');
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/doctors', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create doctor');
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/doctors/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update doctor');
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete doctor');
    }
  }
};

export const patientsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/patients');
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK) {
        return handleLocalGetPatients();
      }
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      // Try to find in local
      const patient = localPatients.find(p => p.id === parseInt(id));
      if (patient) return patient;
      throw new Error('Patient not found');
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/patients', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create patient');
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/patients/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update patient');
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete patient');
    }
  },
  
  getMedicalRecords: async (patientId) => {
    try {
      const response = await api.get(`/patients/${patientId}/medical-records`);
      return response.data;
    } catch (error) {
      return []; // Return empty array if no records
    }
  },
  
  addMedicalRecord: async (patientId, data) => {
    try {
      const response = await api.post(`/patients/${patientId}/medical-records`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add medical record');
    }
  }
};

export const appointmentsAPI = {
  getAll: async (role = null, userId = null) => {
    try {
      let endpoint = '/appointments';
      if (role && userId) endpoint += `?role=${role}&userId=${userId}`;
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.log('[API] Get appointments error:', error.message);
      // Fall back to local mode on any error (network or auth)
      if (USE_LOCAL_FALLBACK) {
        console.log('[API] Using local appointments fallback');
        return handleLocalGetAppointments(role, userId);
      }
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Appointment not found');
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/appointments', data);
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK) {
        return handleLocalCreateAppointment(data);
      }
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/appointments/${id}`, data);
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK) {
        return handleLocalUpdateAppointment(id, data);
      }
      throw error;
    }
  },
  
  cancel: async (id) => {
    try {
      const response = await api.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK) {
        return handleLocalCancelAppointment(id);
      }
      throw error;
    }
  }
};

export const statsAPI = {
  get: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      if (USE_LOCAL_FALLBACK) {
        return handleLocalStats();
      }
      throw error;
    }
  }
};

export const healthAPI = {
  check: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
};

export default { 
  auth: authAPI, 
  doctors: doctorsAPI, 
  patients: patientsAPI, 
  appointments: appointmentsAPI, 
  stats: statsAPI,
  health: healthAPI 
};

