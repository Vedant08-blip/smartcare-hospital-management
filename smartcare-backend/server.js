require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5002;
const JWT_SECRET = process.env.JWT_SECRET || 'smartcare_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// ================================
// IN-MEMORY DATABASE
// ================================

let doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', email: 'sarah.johnson@smartcare.com', phone: '+1 234-567-8901', experience: '10 years', image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=00bcd4&color=fff&size=128' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', email: 'michael.chen@smartcare.com', phone: '+1 234-567-8902', experience: '8 years', image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2196f3&color=fff&size=128' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', email: 'emily.rodriguez@smartcare.com', phone: '+1 234-567-8903', experience: '12 years', image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=00bcd4&color=fff&size=128' },
  { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedic', email: 'james.wilson@smartcare.com', phone: '+1 234-567-8904', experience: '15 years', image: 'https://ui-avatars.com/api/?name=James+Wilson&background=2196f3&color=fff&size=128' },
  { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Dermatologist', email: 'lisa.anderson@smartcare.com', phone: '+1 234-567-8905', experience: '7 years', image: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=00bcd4&color=fff&size=128' },
  { id: 6, name: 'Dr. Robert Taylor', specialization: 'General Physician', email: 'robert.taylor@smartcare.com', phone: '+1 234-567-8906', experience: '20 years', image: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=2196f3&color=fff&size=128' }
];

let patients = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+1 234-567-8910', age: 35, gender: 'Male', address: '123 Main St, City, State', bloodGroup: 'O+', image: 'https://ui-avatars.com/api/?name=John+Doe&background=00bcd4&color=fff&size=128' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 234-567-8911', age: 28, gender: 'Female', address: '456 Oak Ave, City, State', bloodGroup: 'A+', image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=2196f3&color=fff&size=128' },
  { id: 3, name: 'David Brown', email: 'david.brown@email.com', phone: '+1 234-567-8912', age: 42, gender: 'Male', address: '789 Pine Rd, City, State', bloodGroup: 'B+', image: 'https://ui-avatars.com/api/?name=David+Brown&background=00bcd4&color=fff&size=128' },
  { id: 4, name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 234-567-8913', age: 31, gender: 'Female', address: '321 Elm St, City, State', bloodGroup: 'AB+', image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=2196f3&color=fff&size=128' }
];

let appointments = [
  { id: 1, patientId: 1, patientName: 'John Doe', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: '2026-02-15', time: '10:00 AM', status: 'Pending', reason: 'Regular checkup' },
  { id: 2, patientId: 2, patientName: 'Jane Smith', doctorId: 2, doctorName: 'Dr. Michael Chen', specialization: 'Neurologist', date: '2026-02-15', time: '11:00 AM', status: 'Pending', reason: 'Headache consultation' },
  { id: 3, patientId: 3, patientName: 'David Brown', doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiologist', date: '2026-02-14', time: '02:00 PM', status: 'Completed', reason: 'Follow-up appointment' },
  { id: 4, patientId: 4, patientName: 'Maria Garcia', doctorId: 3, doctorName: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', date: '2026-02-16', time: '09:00 AM', status: 'Pending', reason: 'Child health checkup' },
  { id: 5, patientId: 1, patientName: 'John Doe', doctorId: 4, doctorName: 'Dr. James Wilson', specialization: 'Orthopedic', date: '2026-02-17', time: '03:00 PM', status: 'Pending', reason: 'Knee pain consultation' }
];

// Pre-hash passwords
let users = [];
const initPasswords = async () => {
  const hashedPassword = await bcrypt.hash('123456', 10);
  users = [
    { id: 1, email: 'admin@smartcare.com', password: hashedPassword, role: 'admin', name: 'Admin User' },
    { id: 2, email: 'doctor@smartcare.com', password: hashedPassword, role: 'doctor', name: 'Dr. Sarah Johnson' },
    { id: 3, email: 'patient@email.com', password: hashedPassword, role: 'patient', name: 'John Doe' }
  ];
};
initPasswords();

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
    res.status(400).json({ message: 'Invalid token' });
  }
};

// ================================
// ROUTES
// ================================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
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

// Doctors
app.get('/api/doctors', (req, res) => res.json(doctors));
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  doctor ? res.json(doctor) : res.status(404).json({ message: 'Not found' });
});
app.post('/api/doctors', (req, res) => {
  const newDoctor = { id: generateId(doctors), ...req.body };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
});
app.put('/api/doctors/:id', (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  doctors[idx] = { ...doctors[idx], ...req.body };
  res.json(doctors[idx]);
});
app.delete('/api/doctors/:id', (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  doctors.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

// Patients
app.get('/api/patients', (req, res) => res.json(patients));
app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  patient ? res.json(patient) : res.status(404).json({ message: 'Not found' });
});
app.post('/api/patients', (req, res) => {
  const newPatient = { id: generateId(patients), ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});
app.put('/api/patients/:id', (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  patients[idx] = { ...patients[idx], ...req.body };
  res.json(patients[idx]);
});
app.delete('/api/patients/:id', (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  patients.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

// Appointments
app.get('/api/appointments', (req, res) => {
  const { role, userId } = req.query;
  let filtered = appointments;
  if (role === 'patient' && userId) filtered = appointments.filter(a => a.patientId === parseInt(userId));
  else if (role === 'doctor' && userId) filtered = appointments.filter(a => a.doctorId === parseInt(userId));
  res.json(filtered);
});
app.post('/api/appointments', (req, res) => {
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
  res.status(201).json(newAppointment);
});
app.put('/api/appointments/:id', (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  appointments[idx] = { ...appointments[idx], ...req.body };
  res.json(appointments[idx]);
});
app.delete('/api/appointments/:id', (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  appointments.splice(idx, 1);
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

app.listen(PORT, () => {
  console.log(`SmartCare Backend running on http://localhost:${PORT}`);
});

