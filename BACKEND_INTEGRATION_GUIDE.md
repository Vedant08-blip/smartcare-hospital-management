# Backend Integration Guide for SmartCare Hospital Management System

## 📋 Current Frontend Analysis

### What We've Built So Far
1. **Fixed Lucide React imports** in `StatCard.jsx` and `main.jsx`
2. **Created GitHub repository** at `https://github.com/Vedant08-blip/smartcare-hospital-management`
3. **Added comprehensive documentation** in README.md

### Current Data Structure (from dummyData.js)

```javascript
// Doctors - 6 doctors with:
- id, name, specialization, email, phone, experience, image

// Patients - 4 patients with:
- id, name, email, phone, age, gender, address, bloodGroup, image

// Appointments - 5 appointments with:
- id, patientId, patientName, doctorId, doctorName, specialization
- date, time, status ('Pending' | 'Completed'), reason

// Statistics
- adminStats: totalDoctors, totalPatients, appointmentsToday, totalAppointments
- appointmentStatsByMonth: monthly appointment data for charts
```

### Current API Simulation
The login is currently simulated in `LoginPage.jsx`:
```javascript
// Simulated API delay
setTimeout(() => {
  setLoading(false);
  navigate(`/${role}/dashboard`);
}, 1200);
```

---

## 🔌 How to Connect a Backend

### Option 1: Node.js + Express + MongoDB (Recommended)

This is the most common and well-suited stack for this React frontend.

#### Project Structure
```
smartcare-backend/
├── config/
│   └── db.js              # Database connection
├── models/
│   ├── User.js            # User model (admin, doctor, patient)
│   ├── Doctor.js          # Doctor profile
│   ├── Patient.js         # Patient profile
│   └── Appointment.js     # Appointment model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── doctors.js        # Doctor CRUD operations
│   ├── patients.js       # Patient CRUD operations
│   └── appointments.js   # Appointment operations
├── controllers/
│   ├── authController.js
│   ├── doctorController.js
│   ├── patientController.js
│   └── appointmentController.js
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── .env                  # Environment variables
├── package.json
└── server.js             # Entry point
```

#### Database Models

**User Model (for authentication)**
```javascript
{
  email: String (unique),
  password: String (hashed),
  role: String ('admin' | 'doctor' | 'patient'),
  // Reference to role-specific data
  doctorId: ObjectId (ref: 'Doctor'),
  patientId: ObjectId (ref: 'Patient')
}
```

**Doctor Model**
```javascript
{
  userId: ObjectId (ref: 'User'),
  name: String,
  specialization: String,
  phone: String,
  experience: String,
  image: String,
  available: Boolean
}
```

**Patient Model**
```javascript
{
  userId: ObjectId (ref: 'User'),
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  address: String,
  bloodGroup: String,
  image: String
}
```

**Appointment Model**
```javascript
{
  patientId: ObjectId (ref: 'Patient'),
  doctorId: ObjectId (ref: 'Doctor'),
  date: String,
  time: String,
  status: String ('Pending' | 'Confirmed' | 'Completed' | 'Cancelled'),
  reason: String,
  notes: String
}
```

#### API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/login | User login | Public |
| GET | /api/doctors | Get all doctors | All |
| GET | /api/doctors/:id | Get doctor by ID | All |
| POST | /api/doctors | Create doctor | Admin |
| PUT | /api/doctors/:id | Update doctor | Admin |
| DELETE | /api/doctors/:id | Delete doctor | Admin |
| GET | /api/patients | Get all patients | Admin/Doctor |
| GET | /api/patients/:id | Get patient by ID | Admin/Doctor/Patient |
| POST | /api/patients | Create patient | Admin |
| PUT | /api/patients/:id | Update patient | Admin/Patient |
| GET | /api/appointments | Get appointments | All |
| POST | /api/appointments | Create appointment | Patient |
| PUT | /api/appointments/:id | Update appointment | Admin/Doctor |
| DELETE | /api/appointments/:id | Cancel appointment | Admin/Doctor/Patient |
| GET | /api/stats | Get dashboard stats | Admin |

---

### Option 2: Firebase (Simpler Alternative)

If you want a quicker setup without managing a server:

#### Firebase Services to Use:
1. **Firebase Authentication** - For user login
2. **Cloud Firestore** - For database
3. **Firebase Storage** - For image uploads

#### Firestore Collections:
```
users/
  {userId}/
    - email
    - role
    - createdAt

doctors/
  {doctorId}/
    - name
    - specialization
    - email
    - phone
    - experience
    - imageUrl
    - userId

patients/
  {patientId}/
    - name
    - email
    - phone
    - age
    - gender
    - address
    - bloodGroup
    - imageUrl
    - userId

appointments/
  {appointmentId}/
    - patientId
    - doctorId
    - date
    - time
    - status
    - reason
    - createdAt
```

---

### Option 3: Supabase (PostgreSQL + Auth)

Another great alternative with SQL database:

#### Tables:
- users (managed by Supabase Auth)
- doctors
- patients
- appointments

---

## 🔧 Frontend Changes Required

### 1. Create API Service Layer

Create `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api';

export const api = {
  // Auth
  login: async (email, password, role) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    return res.json();
  },

  // Doctors
  getDoctors: () => fetch(`${API_URL}/doctors`).then(res => res.json()),
  getDoctor: (id) => fetch(`${API_URL}/doctors/${id}`).then(res => res.json()),
  
  // Patients
  getPatients: () => fetch(`${API_URL}/patients`).then(res => res.json()),
  getPatient: (id) => fetch(`${API_URL}/patients/${id}`).then(res => res.json()),
  
  // Appointments
  getAppointments: () => fetch(`${API_URL}/appointments`).then(res => res.json()),
  createAppointment: (data) => fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  // Stats
  getStats: () => fetch(`${API_URL}/stats`).then(res => res.json())
};
```

### 2. Update LoginPage.jsx

Replace simulated login with real API call:
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  if (!role || !form.email || !form.password) {
    return setError("All fields are required");
  }
  
  setLoading(true);
  try {
    const data = await api.login(form.email, form.password, role);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(`/${role}/dashboard`);
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    setError("Server error. Please try again.");
  }
  setLoading(false);
};
```

### 3. Update Dashboard Components

Replace dummy data imports with API calls:
```javascript
// Before:
import { adminStats, doctors } from '../../data/dummyData';

// After:
const [stats, setStats] = useState(null);
useEffect(() => {
  api.getStats().then(setStats);
}, []);
```

---

## 🚀 Quick Start: Node.js Backend

### 1. Initialize Backend
```bash
mkdir smartcare-backend
cd smartcare-backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

### 2. Create server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 3. Create .env file
```
MONGO_URI=mongodb://localhost:27017/smartcare
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## 📝 Summary

| Aspect | Current State | After Backend |
|--------|--------------|---------------|
| Data Storage | dummyData.js (static) | MongoDB/SQL Database |
| Authentication | Simulated (setTimeout) | JWT tokens |
| User Management | Not implemented | Full CRUD |
| Appointments | Static array | Dynamic with status updates |
| Real-time updates | No | Yes (with WebSocket) |

## 💡 Next Steps

1. **Choose a backend option** (Node.js recommended)
2. **Set up the backend server**
3. **Create API service layer** in frontend
4. **Replace dummy data** with API calls
5. **Add authentication** handling
6. **Test the full flow**

Would you like me to help you set up the Node.js backend with Express and MongoDB?

