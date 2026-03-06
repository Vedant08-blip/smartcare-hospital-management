require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;

// Security: Require JWT_SECRET from environment - no fallback
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is required!');
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting configuration
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

// Rate limiting middleware
const rateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitStore.has(clientIP)) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const clientData = rateLimitStore.get(clientIP);
  
  if (now > clientData.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  if (clientData.count >= MAX_REQUESTS) {
    return res.status(429).json({ 
      message: 'Too many requests, please try again later',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  
  clientData.count++;
  rateLimitStore.set(clientIP, clientData);
  next();
};

app.use(rateLimit);

// Handle CORS for localtunnel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Input validation helper
const validateInput = (data, schema) => {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    
    if (rules.type && typeof value !== rules.type) {
      errors.push(`${field} must be of type ${rules.type}`);
    }
    
    if (rules.minLength && value && value.length < rules.minLength) {
      errors.push(`${field} must be at least ${rules.minLength} characters`);
    }
    
    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors.push(`${field} must not exceed ${rules.maxLength} characters`);
    }
    
    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors.push(`${field} has invalid format`);
    }
    
    if (rules.min && value && value < rules.min) {
      errors.push(`${field} must be at least ${rules.min}`);
    }
    
    if (rules.max && value && value > rules.max) {
      errors.push(`${field} must not exceed ${rules.max}`);
    }
  }
  return errors;
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }
  
  res.status(500).json({ message: 'Internal server error' });
};

// ================================
// FILE-BASED DATABASE
// ================================

// Load data from file

const loadData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.log('No existing data file, using defaults');
  }
  return null;
};

// Save data to file
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Initialize or load data
let db = loadData();

if (!db) {
  // Initialize with default data
  const hashedPasswordAdmin = bcrypt.hashSync('SmartAdmin2024!', 10);
  const hashedPasswordDoctor = bcrypt.hashSync('SmartDoc2024!', 10);
  const hashedPasswordPatient = bcrypt.hashSync('SmartPatient2024!', 10);
  db = {
    users: [
      { id: 1, email: 'admin@smartcare.com', password: hashedPasswordAdmin, role: 'admin', name: 'Admin User' },
      { id: 2, email: 'doctor@smartcare.com', password: hashedPasswordDoctor, role: 'doctor', name: 'Dr. Sarah Johnson' },
      { id: 3, email: 'patient@email.com', password: hashedPasswordPatient, role: 'patient', name: 'John Doe' }
    ],
    doctors: [
      { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', email: 'sarah.johnson@smartcare.com', phone: '+1 234-567-8901', experience: '10 years', image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=00bcd4&color=fff&size=128' },
      { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', email: 'michael.chen@smartcare.com', phone: '+1 234-567-8902', experience: '8 years', image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2196f3&color=fff&size=128' },
      { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', email: 'emily.rodriguez@smartcare.com', phone: '+1 234-567-8903', experience: '12 years', image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=00bcd4&color=fff&size=128' },
      { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedic', email: 'james.wilson@smartcare.com', phone: '+1 234-567-8904', experience: '15 years', image: 'https://ui-avatars.com/api/?name=James+Wilson&background=2196f3&color=fff&size=128' },
      { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Dermatologist', email: 'lisa.anderson@smartcare.com', phone: '+1 234-567-8905', experience: '7 years', image: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=00bcd4&color=fff&size=128' },
      { id: 6, name: 'Dr. Robert Taylor', specialization: 'General Physician', email: 'robert.taylor@smartcare.com', phone: '+1 234-567-8906', experience: '20 years', image: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=2196f3&color=fff&size=128' }
    ],
    patients: [
      { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+1 234-567-8910', age: 35, gender: 'Male', address: '123 Main St, City, State', bloodGroup: 'O+', image: 'https://ui-avatars.com/api/?name=John+Doe&background=00bcd4&color=fff&size=128', medicalRecords: [], allergies: [], chronicConditions: [] },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 234-567-8911', age: 28, gender: 'Female', address: '456 Oak Ave, City, State', bloodGroup: 'A+', image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=2196f3&color=fff&size=128', medicalRecords: [], allergies: [], chronicConditions: [] },
      { id: 3, name: 'David Brown', email: 'david.brown@email.com', phone: '+1 234-567-8912', age: 42, gender: 'Male', address: '789 Pine Rd, City, State', bloodGroup: 'B+', image: 'https://ui-avatars.com/api/?name=David+Brown&background=00bcd4&color=fff&size=128', medicalRecords: [], allergies: [], chronicConditions: [] },
      { id: 4, name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 234-567-8913', age: 31, gender: 'Female', address: '321 Elm St, City, State', bloodGroup: 'AB+', image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=2196f3&color=fff&size=128', medicalRecords: [], allergies: [], chronicConditions: [] }
    ],
    appointments: [
      { id: 1, patientId: 1, patientName: 'John Doe', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: '2026-02-15', time: '10:00 AM', status: 'Pending', reason: 'Regular checkup' },
      { id: 2, patientId: 2, patientName: 'Jane Smith', doctorId: 2, doctorName: 'Dr. Michael Chen', specialization: 'Neurologist', date: '2026-02-15', time: '11:00 AM', status: 'Pending', reason: 'Headache consultation' },
      { id: 3, patientId: 3, patientName: 'David Brown', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: '2026-02-14', time: '02:00 PM', status: 'Completed', reason: 'Follow-up appointment' },
      { id: 4, patientId: 4, patientName: 'Maria Garcia', doctorId: 3, doctorName: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', date: '2026-02-16', time: '09:00 AM', status: 'Pending', reason: 'Child health checkup' },
      { id: 5, patientId: 1, patientName: 'John Doe', doctorId: 4, doctorName: 'Dr. James Wilson', specialization: 'Orthopedic', date: '2026-02-17', time: '03:00 PM', status: 'Pending', reason: 'Knee pain consultation' }
    ],
    medicalRecords: []
  };
  saveData(db);
}

// Reference to collections
let { users, doctors, patients, appointments, medicalRecords } = db;

const generateId = (arr) => Math.max(...arr.map(item => item.id), 0) + 1;

// ================================
// AUTH MIDDLEWARE
// ================================
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

// ================================
// ROUTES
// ================================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  // Input validation
  const validationErrors = validateInput(req.body, {
    email: { required: true, type: 'string' },
    password: { required: true, type: 'string' }
  });
  
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  const user = users.find(u => u.email === email);
  if (!user || (role && user.role !== role)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });
  
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

// GET /api/auth/verify
app.get('/api/auth/verify', authenticate, (req, res) => res.json({ user: req.user }));

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, role, name } = req.body;
  
  // Input validation
  const validationErrors = validateInput(req.body, {
    email: { required: true, type: 'string' },
    password: { required: true, type: 'string', minLength: 6 },
    role: { required: true, type: 'string' },
    name: { required: true, type: 'string', minLength: 2 }
  });
  
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  // Validate role
  const validRoles = ['admin', 'doctor', 'patient'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: generateId(users), email, password: hashedPassword, role, name };
  users.push(newUser);
  db.users = users;
  saveData(db);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '24h' });
  res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name } });
});

// Doctors
app.get('/api/doctors', (req, res) => res.json(doctors));
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  doctor ? res.json(doctor) : res.status(404).json({ message: 'Not found' });
});
app.post('/api/doctors', authenticate, authorize('admin'), (req, res) => {
  const validationErrors = validateInput(req.body, {
    name: { required: true, type: 'string', minLength: 2 },
    specialization: { required: true, type: 'string' },
    email: { required: true, type: 'string' },
    phone: { required: true, type: 'string' }
  });
  
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }
  
  const newDoctor = { id: generateId(doctors), ...req.body };
  doctors.push(newDoctor);
  db.doctors = doctors;
  saveData(db);
  res.status(201).json(newDoctor);
});
app.put('/api/doctors/:id', authenticate, authorize('admin', 'doctor'), (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  doctors[idx] = { ...doctors[idx], ...req.body };
  db.doctors = doctors;
  saveData(db);
  res.json(doctors[idx]);
});
app.delete('/api/doctors/:id', authenticate, authorize('admin'), (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  doctors.splice(idx, 1);
  db.doctors = doctors;
  saveData(db);
  res.json({ message: 'Deleted' });
});

// Patients
app.get('/api/patients', authenticate, authorize('admin', 'doctor'), (req, res) => res.json(patients));
app.get('/api/patients/:id', authenticate, (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  // Patients can only view their own data, doctors and admins can view any
  if (!patient) return res.status(404).json({ message: 'Not found' });
  if (req.user.role === 'patient' && req.user.id !== patient.id) {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json(patient);
});
app.post('/api/patients', authenticate, authorize('admin'), (req, res) => {
  const validationErrors = validateInput(req.body, {
    name: { required: true, type: 'string', minLength: 2 },
    email: { required: true, type: 'string' },
    phone: { required: true, type: 'string' },
    age: { required: true, type: 'number', min: 0, max: 150 },
    gender: { required: true, type: 'string' },
    bloodGroup: { required: true, type: 'string' }
  });
  
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }
  
  const newPatient = { 
    id: generateId(patients), 
    ...req.body,
    medicalRecords: [],
    allergies: req.body.allergies || [],
    chronicConditions: req.body.chronicConditions || []
  };
  patients.push(newPatient);
  db.patients = patients;
  saveData(db);
  res.status(201).json(newPatient);
});
app.put('/api/patients/:id', authenticate, authorize('admin', 'patient'), (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  
  // Patients can only update their own profile
  if (req.user.role === 'patient') {
    const patient = patients[idx];
    const patientUser = users.find(u => u.email === patient.email);
    if (!patientUser || patientUser.id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
  }
  
  patients[idx] = { ...patients[idx], ...req.body };
  db.patients = patients;
  saveData(db);
  res.json(patients[idx]);
});
app.delete('/api/patients/:id', authenticate, authorize('admin'), (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  patients.splice(idx, 1);
  db.patients = patients;
  saveData(db);
  res.json({ message: 'Deleted' });
});

// Medical Records (NEW)
app.get('/api/patients/:patientId/medical-records', authenticate, authorize('admin', 'doctor', 'patient'), (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  
  // Patients can only view their own records
  if (req.user.role === 'patient') {
    const patientUser = users.find(u => u.id === req.user.id && u.email === patient.email);
    if (!patientUser) {
      return res.status(403).json({ message: 'Access denied' });
    }
  }
  
  res.json(patient.medicalRecords || []);
});

app.post('/api/patients/:patientId/medical-records', authenticate, authorize('admin', 'doctor'), (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  
  // Input validation
  const validationErrors = validateInput(req.body, {
    date: { required: true, type: 'string' },
    doctor: { required: true, type: 'string' },
    specialization: { required: true, type: 'string' },
    diagnosis: { required: true, type: 'string' }
  });
  
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }
  
  const newRecord = {
    id: generateId(patient.medicalRecords || []),
    date: req.body.date,
    doctor: req.body.doctor,
    specialization: req.body.specialization,
    diagnosis: req.body.diagnosis,
    prescription: req.body.prescription || '',
    notes: req.body.notes || '',
    vitals: req.body.vitals || {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: ''
    }
  };
  
  if (!patient.medicalRecords) {
    patient.medicalRecords = [];
  }
  patient.medicalRecords.push(newRecord);
  
  // Update patient allergies and chronic conditions
  if (req.body.allergies) {
    patient.allergies = req.body.allergies;
  }
  if (req.body.chronicConditions) {
    patient.chronicConditions = req.body.chronicConditions;
  }
  
  // Update in database
  const patientIdx = patients.findIndex(p => p.id === patientId);
  patients[patientIdx] = patient;
  db.patients = patients;
  saveData(db);
  
  res.status(201).json(newRecord);
});

app.put('/api/patients/:patientId/medical-records/:recordId', authenticate, authorize('admin', 'doctor'), (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const recordId = parseInt(req.params.recordId);
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  if (!patient.medicalRecords) return res.status(404).json({ message: 'Medical record not found' });
  
  const recordIdx = patient.medicalRecords.findIndex(r => r.id === recordId);
  if (recordIdx === -1) return res.status(404).json({ message: 'Medical record not found' });
  
  patient.medicalRecords[recordIdx] = { 
    ...patient.medicalRecords[recordIdx], 
    ...req.body 
  };
  
  // Update in database
  const patientIdx = patients.findIndex(p => p.id === patientId);
  patients[patientIdx] = patient;
  db.patients = patients;
  saveData(db);
  
  res.json(patient.medicalRecords[recordIdx]);
});

app.delete('/api/patients/:patientId/medical-records/:recordId', authenticate, authorize('admin'), (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const recordId = parseInt(req.params.recordId);
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  if (!patient.medicalRecords) return res.status(404).json({ message: 'Medical record not found' });
  
  const recordIdx = patient.medicalRecords.findIndex(r => r.id === recordId);
  if (recordIdx === -1) return res.status(404).json({ message: 'Medical record not found' });
  
  patient.medicalRecords.splice(recordIdx, 1);
  
  // Update in database
  const patientIdx = patients.findIndex(p => p.id === patientId);
  patients[patientIdx] = patient;
  db.patients = patients;
  saveData(db);
  
  res.json({ message: 'Medical record deleted' });
});

// Appointments
app.get('/api/appointments', authenticate, (req, res) => {
  const { role, userId, email } = req.query;
  let filtered = appointments;
  
  if (role === 'patient' && userId) {
    // Find the patient's email from users or patients table
    const patientUser = users.find(u => u.id === parseInt(userId) && u.role === 'patient');
    if (patientUser) {
      // Find patient by email to get correct patientId
      const patient = patients.find(p => p.email === patientUser.email);
      if (patient) {
        filtered = appointments.filter(a => a.patientId === patient.id);
      }
    }
  }
  else if (role === 'doctor' && userId) {
    filtered = appointments.filter(a => a.doctorId === parseInt(userId));
  }
  res.json(filtered);
});
app.post('/api/appointments', authenticate, authorize('patient', 'admin'), (req, res) => {
  // Input validation
  const validationErrors = validateInput(req.body, {
    patientId: { required: true, type: 'number' },
    doctorId: { required: true, type: 'number' },
    date: { required: true, type: 'string' },
    time: { required: true, type: 'string' },
    reason: { required: true, type: 'string' }
  });
  
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }
  
  const { patientId, doctorId, date, time, reason } = req.body;
  const doctor = doctors.find(d => d.id === doctorId);
  const patient = patients.find(p => p.id === patientId);
  if (!doctor || !patient) return res.status(404).json({ message: 'Doctor or Patient not found' });
  
  const newAppointment = {
    id: generateId(appointments),
    patientId, patientName: patient.name,
    doctorId, doctorName: doctor.name,
    specialization: doctor.specialization,
    date, time, status: 'Pending', reason
  };
  appointments.push(newAppointment);
  db.appointments = appointments;
  saveData(db);
  res.status(201).json(newAppointment);
});
app.put('/api/appointments/:id', authenticate, authorize('admin', 'doctor'), (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  appointments[idx] = { ...appointments[idx], ...req.body };
  db.appointments = appointments;
  saveData(db);
  res.json(appointments[idx]);
});
app.delete('/api/appointments/:id', authenticate, authorize('admin'), (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  appointments.splice(idx, 1);
  db.appointments = appointments;
  saveData(db);
  res.json({ message: 'Deleted' });
});

// Stats
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json({
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    appointmentsToday: appointments.filter(a => a.date === today).length,
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'Pending').length,
    completedAppointments: appointments.filter(a => a.status === 'Completed').length
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Apply error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SmartCare Backend running on http://localhost:${PORT}`);
});

