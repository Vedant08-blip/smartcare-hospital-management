// SmartCare API Service
// Connects frontend to backend API

const API_URL = 'http://localhost:5002/api';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper for fetch with auth headers
const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// ================================
// AUTH API
// ================================

export const authAPI = {
  login: async (email, password, role) => {
    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    
    // Store token and user data
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  verify: async () => {
    const user = localStorage.getItem('user');
    const token = getToken();
    
    if (!token || !user) {
      return null;
    }
    
    try {
      const data = await fetchWithAuth('/auth/verify');
      return data.user;
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// ================================
// DOCTORS API
// ================================

export const doctorsAPI = {
  getAll: async () => {
    return fetchWithAuth('/doctors');
  },

  getById: async (id) => {
    return fetchWithAuth(`/doctors/${id}`);
  },

  create: async (doctorData) => {
    return fetchWithAuth('/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    });
  },

  update: async (id, doctorData) => {
    return fetchWithAuth(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(doctorData),
    });
  },

  delete: async (id) => {
    return fetchWithAuth(`/doctors/${id}`, {
      method: 'DELETE',
    });
  },
};

// ================================
// PATIENTS API
// ================================

export const patientsAPI = {
  getAll: async () => {
    return fetchWithAuth('/patients');
  },

  getById: async (id) => {
    return fetchWithAuth(`/patients/${id}`);
  },

  create: async (patientData) => {
    return fetchWithAuth('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  },

  update: async (id, patientData) => {
    return fetchWithAuth(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  },

  delete: async (id) => {
    return fetchWithAuth(`/patients/${id}`, {
      method: 'DELETE',
    });
  },
};

// ================================
// APPOINTMENTS API
// ================================

export const appointmentsAPI = {
  getAll: async (role = null, userId = null) => {
    let endpoint = '/appointments';
    if (role && userId) {
      endpoint += `?role=${role}&userId=${userId}`;
    }
    return fetchWithAuth(endpoint);
  },

  getById: async (id) => {
    return fetchWithAuth(`/appointments/${id}`);
  },

  create: async (appointmentData) => {
    return fetchWithAuth('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  update: async (id, appointmentData) => {
    return fetchWithAuth(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  },

  cancel: async (id) => {
    return fetchWithAuth(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// ================================
// STATS API
// ================================

export const statsAPI = {
  get: async () => {
    return fetchWithAuth('/stats');
  },
};

export default {
  auth: authAPI,
  doctors: doctorsAPI,
  patients: patientsAPI,
  appointments: appointmentsAPI,
  stats: statsAPI,
};

