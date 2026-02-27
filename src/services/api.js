// SmartCare API Service - Connects frontend to backend API
const API_URL = 'http://localhost:5002/api';

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
    
    // Check if the server is reachable
    if (!response) {
      throw new Error('Unable to connect to server. Please ensure the backend is running.');
    }
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    // Provide more specific error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('Unable to connect')) {
      throw new Error('Cannot connect to server. Please start the backend server.');
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email, password, role) => {
    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
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
};

// Doctors API
export const doctorsAPI = {
  getAll: () => fetchWithAuth('/doctors'),
  getById: (id) => fetchWithAuth(`/doctors/${id}`),
  create: (data) => fetchWithAuth('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchWithAuth(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchWithAuth(`/doctors/${id}`, { method: 'DELETE' }),
};

// Patients API
export const patientsAPI = {
  getAll: () => fetchWithAuth('/patients'),
  getById: (id) => fetchWithAuth(`/patients/${id}`),
  create: (data) => fetchWithAuth('/patients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchWithAuth(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchWithAuth(`/patients/${id}`, { method: 'DELETE' }),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (role = null, userId = null) => {
    let endpoint = '/appointments';
    if (role && userId) endpoint += `?role=${role}&userId=${userId}`;
    return fetchWithAuth(endpoint);
  },
  getById: (id) => fetchWithAuth(`/appointments/${id}`),
  create: (data) => fetchWithAuth('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchWithAuth(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  cancel: (id) => fetchWithAuth(`/appointments/${id}`, { method: 'DELETE' }),
};

// Stats API
export const statsAPI = {
  get: () => fetchWithAuth('/stats'),
};

export default { auth: authAPI, doctors: doctorsAPI, patients: patientsAPI, appointments: appointmentsAPI, stats: statsAPI };

