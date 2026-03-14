// SmartCare API Service - Connects frontend to backend API
// Uses localtunnel URL for cross-network access with fallback to local data

// Try to use tunnel, but will fallback to local mode
const API_URL = 'https://smartcare-backend-vedant.loca.lt/api';
const USE_LOCAL_FALLBACK = true; // Set to true to enable offline fallback

// Local dummy data for fallback
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

// Initialize local appointments from localStorage or use default
const getInitialAppointments = () => {
  const stored = localStorage.getItem('localAppointments');
  
  // Always update dates to current for demo purposes
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  const defaultAppointments = [
    { id: 1, patientId: 1, patientName: 'John Doe', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: todayStr, time: '10:00 AM', status: 'Pending', reason: 'Regular checkup' },
    { id: 2, patientId: 2, patientName: 'Jane Smith', doctorId: 2, doctorName: 'Dr. Michael Chen', specialization: 'Neurologist', date: todayStr, time: '11:00 AM', status: 'Pending', reason: 'Headache consultation' },
    { id: 3, patientId: 3, patientName: 'David Brown', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: todayStr, time: '02:00 PM', status: 'Completed', reason: 'Follow-up appointment' },
    { id: 4, patientId: 4, patientName: 'Maria Garcia', doctorId: 3, doctorName: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', date: tomorrowStr, time: '09:00 AM', status: 'Pending', reason: 'Child health checkup' },
    { id: 5, patientId: 1, patientName: 'John Doe', doctorId: 4, doctorName: 'Dr. James Wilson', specialization: 'Orthopedic', date: tomorrowStr, time: '03:00 PM', status: 'Pending', reason: 'Knee pain consultation' }
  ];
  
  if (stored) {
    const parsed = JSON.parse(stored);
    
    // Check if stored appointments have outdated dates (different from today/tomorrow)
    const needsUpdate = parsed.some(apt => {
      return apt.date !== todayStr && apt.date !== tomorrowStr;
    });
    
    if (needsUpdate || parsed.length === 0) {
      localStorage.setItem('localAppointments', JSON.stringify(defaultAppointments));
      return defaultAppointments;
    }
    
    return parsed;
  }
  
  localStorage.setItem('localAppointments', JSON.stringify(defaultAppointments));
  return defaultAppointments;
};

let localAppointments = getInitialAppointments();

// Auth credentials (for local mode)
const LOCAL_USERS = [
  { id: 1, email: 'admin@smartcare.com', password: 'SmartAdmin2024!', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'doctor@smartcare.com', password: 'SmartDoc2024!', role: 'doctor', name: 'Dr. Sarah Johnson' },
  { id: 3, email: 'patient@email.com', password: 'SmartPatient2024!', role: 'patient', name: 'John Doe' },
  { id: 4, email: 'patient2@email.com', password: 'SmartPatient2024!', role: 'patient', name: 'Jane Smith' }
];

// Map user IDs to patient IDs for appointment filtering
const USER_ID_TO_PATIENT_ID = {
  3: 1, // John Doe (user id 3) -> patient id 1
  4: 2  // Jane Smith (user id 4) -> patient id 2
};

// Map user IDs to doctor IDs for appointment filtering (local mode)
const USER_ID_TO_DOCTOR_ID = {
  2: 1 // Dr. Sarah Johnson (user id 2) -> doctor id 1
};

// Debug function to log API calls
const logApiCall = (method, endpoint, status, error = null) => {
  console.log(`[API] ${method} ${endpoint} - Status: ${status}${error ? ' - Error: ' + error : ''}`);
};

const getToken = () => localStorage.getItem('token');

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    
    if (!response) {
      throw new Error('USE_LOCAL_FALLBACK');
    }
    
    const data = await response.json();

    if (!response.ok) {
      logApiCall(options.method || 'GET', endpoint, response.status, data.message);
      throw new Error(data.message || 'Something went wrong');
    }

    logApiCall(options.method || 'GET', endpoint, response.status);
    return data;
  } catch (error) {
    if (error.message === 'USE_LOCAL_FALLBACK' || (error.message.includes('Failed to fetch') && USE_LOCAL_FALLBACK)) {
      logApiCall(options.method || 'GET', endpoint, 'Local Mode', 'Using local data');
      throw new Error('USE_LOCAL_FALLBACK');
    }
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      logApiCall(options.method || 'GET', endpoint, 'Network Error', error.message);
      throw new Error('Cannot connect to server. Please check your internet connection and refresh the page.');
    }
    logApiCall(options.method || 'GET', endpoint, 'Error', error.message);
    throw error;
  }
};

// Local mode handlers
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

const handleLocalCreatePatient = (data) => {
  const newPatient = {
    id: Date.now(),
    ...data,
    medicalRecords: [],
    allergies: [],
    chronicConditions: []
  };
  localPatients.push(newPatient);
  
  // Also create a user account for the patient
  const newUser = {
    id: Date.now(),
    email: data.email,
    password: 'SmartPatient2024!', // Default password
    role: 'patient',
    name: data.name
  };
  LOCAL_USERS.push(newUser);
  
  console.log('[API] New patient created:', newPatient);
  return newPatient;
};

const handleLocalUpdatePatient = (id, data) => {
  const index = localPatients.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Patient not found');
  }
  localPatients[index] = { ...localPatients[index], ...data };
  console.log('[API] Patient updated:', id, data);
  return localPatients[index];
};

const handleLocalDeletePatient = (id) => {
  const index = localPatients.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Patient not found');
  }
  localPatients.splice(index, 1);
  console.log('[API] Patient deleted:', id);
  return { success: true, message: 'Patient deleted successfully' };
};

const handleLocalGetAppointments = (role, userId) => {
  // Reload from localStorage to get latest appointments
  const stored = localStorage.getItem('localAppointments');
  if (stored) {
    localAppointments = JSON.parse(stored);
  }
  
  // Convert userId to patientId if needed
  const patientId = USER_ID_TO_PATIENT_ID[userId] || userId;
  const doctorId = USER_ID_TO_DOCTOR_ID[userId] || userId;
  
  let filtered = [...localAppointments];
  
  if (role === 'patient') {
    filtered = localAppointments.filter(a => a.patientId === patientId);
  } else if (role === 'doctor') {
    filtered = localAppointments.filter(a => a.doctorId === doctorId);
  }
  console.log('[API] Getting appointments for', role, 'userId:', userId, 'patientId:', patientId, 'doctorId:', doctorId, 'Total:', filtered.length);
  return filtered;
};

const handleLocalCreateAppointment = (data) => {
  const { patientId, doctorId, date, time, reason } = data;
  
  // Convert userId to patientId if needed (userId is the user account id, not patient id)
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
  
  // Save to localStorage for persistence
  localStorage.setItem('localAppointments', JSON.stringify(localAppointments));
  console.log('[API] New appointment saved:', newAppointment);
  
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

const handleLocalCancelAppointment = (id, data = {}) => {
  // Reload from localStorage to get latest appointments
  const stored = localStorage.getItem('localAppointments');
  if (stored) {
    localAppointments = JSON.parse(stored);
  }
  
  const index = localAppointments.findIndex(a => a.id === id);
  if (index === -1) {
    throw new Error('Appointment not found');
  }
  
  // Mark the appointment as cancelled (keep history)
  localAppointments[index] = {
    ...localAppointments[index],
    status: 'Cancelled',
    cancelReason: data.cancelReason || localAppointments[index].cancelReason || ''
  };
  
  // Save to localStorage for persistence
  localStorage.setItem('localAppointments', JSON.stringify(localAppointments));
  console.log('[API] Appointment cancelled:', id);
  
  return localAppointments[index];
};

const handleLocalUpdateAppointment = (id, data) => {
  // Reload from localStorage to get latest appointments
  const stored = localStorage.getItem('localAppointments');
  if (stored) {
    localAppointments = JSON.parse(stored);
  }
  
  const index = localAppointments.findIndex(a => a.id === id);
  if (index === -1) {
    throw new Error('Appointment not found');
  }
  
  // Update the appointment with new data
  localAppointments[index] = { ...localAppointments[index], ...data };
  
  // Save to localStorage for persistence
  localStorage.setItem('localAppointments', JSON.stringify(localAppointments));
  console.log('[API] Appointment updated:', id, data);
  
  return localAppointments[index];
};

// Auth API
export const authAPI = {
  login: async (email, password, role) => {
    try {
      return await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      }).then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('isLocalMode', 'false');
        }
        return data;
      });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        console.log('[API] Using local login fallback');
        return handleLocalLogin(email, password, role);
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
    const user = localStorage.getItem('user');
    const token = getToken();
    const isLocal = localStorage.getItem('isLocalMode') === 'true';
    
    if (isLocal && token) {
      return JSON.parse(user);
    }
    
    if (!token || !user) return null;
    try {
      const data = await fetchWithAuth('/auth/verify');
      return data.user;
    } catch {
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
};

// Doctors API
export const doctorsAPI = {
  getAll: async () => {
    try {
      return await fetchWithAuth('/doctors');
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalGetDoctors();
      }
      throw error;
    }
  },
  getById: (id) => fetchWithAuth(`/doctors/${id}`),
  create: (data) => fetchWithAuth('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchWithAuth(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchWithAuth(`/doctors/${id}`, { method: 'DELETE' }),
};

// Patients API
export const patientsAPI = {
  getAll: async () => {
    try {
      return await fetchWithAuth('/patients');
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalGetPatients();
      }
      throw error;
    }
  },
  getById: (id) => fetchWithAuth(`/patients/${id}`),
  create: async (data) => {
    try {
      return await fetchWithAuth('/patients', { method: 'POST', body: JSON.stringify(data) });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalCreatePatient(data);
      }
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      return await fetchWithAuth(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalUpdatePatient(id, data);
      }
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await fetchWithAuth(`/patients/${id}`, { method: 'DELETE' });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalDeletePatient(id);
      }
      throw error;
    }
  },
};

// Appointments API
export const appointmentsAPI = {
  getAll: async (role = null, userId = null) => {
    let endpoint = '/appointments';
    if (role && userId) endpoint += `?role=${role}&userId=${userId}`;
    
    try {
      return await fetchWithAuth(endpoint);
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalGetAppointments(role, userId);
      }
      throw error;
    }
  },
  getById: (id) => fetchWithAuth(`/appointments/${id}`),
  create: async (data) => {
    try {
      return await fetchWithAuth('/appointments', { method: 'POST', body: JSON.stringify(data) });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalCreateAppointment(data);
      }
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      return await fetchWithAuth(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalUpdateAppointment(id, data);
      }
      throw error;
    }
  },
  cancel: async (id, data = {}) => {
    try {
      return await fetchWithAuth(`/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'Cancelled', ...data })
      });
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalCancelAppointment(id, data);
      }
      throw error;
    }
  },
};

// Stats API
export const statsAPI = {
  get: async () => {
    try {
      return await fetchWithAuth('/stats');
    } catch (error) {
      if (error.message === 'USE_LOCAL_FALLBACK') {
        return handleLocalStats();
      }
      throw error;
    }
  },
};

export default { auth: authAPI, doctors: doctorsAPI, patients: patientsAPI, appointments: appointmentsAPI, stats: statsAPI };
