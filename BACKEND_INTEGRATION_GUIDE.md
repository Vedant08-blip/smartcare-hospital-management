# Backend Integration Guide for SmartCare Hospital Management System

## ✅ Current Status: Backend is Integrated!

The SmartCare application now has a fully functional backend. Here's what's been implemented:

---

## 🚀 How to Run the Application

### Prerequisites
- Node.js installed
- npm or yarn

### Step 1: Start the Backend Server
```bash
cd smartcare-backend
npm install  # If dependencies not installed
node server.js
```
The backend runs on **http://localhost:5002**

### Step 2: Start the Frontend
```bash
npm run dev
```
The frontend runs on **http://localhost:3000** (or next available port)

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/login | User login | Public |
| POST | /api/auth/register | User registration | Public |
| GET | /api/auth/verify | Verify JWT token | Protected |

### Doctors
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/doctors | Get all doctors | Public |
| GET | /api/doctors/:id | Get doctor by ID | Public |
| POST | /api/doctors | Create doctor | Admin |
| PUT | /api/doctors/:id | Update doctor | Admin/Doctor |
| DELETE | /api/doctors/:id | Delete doctor | Admin |

### Patients
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/patients | Get all patients | Admin/Doctor |
| GET | /api/patients/:id | Get patient by ID | Protected |
| POST | /api/patients | Create patient | Admin |
| PUT | /api/patients/:id | Update patient | Admin/Patient |
| DELETE | /api/patients/:id | Delete patient | Admin |

### Medical Records
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/patients/:id/medical-records | Get patient records | Protected |
| POST | /api/patients/:id/medical-records | Add medical record | Doctor/Admin |
| PUT | /api/patients/:id/medical-records/:recordId | Update record | Doctor/Admin |
| DELETE | /api/patients/:id/medical-records/:recordId | Delete record | Admin |

### Appointments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/appointments | Get appointments | Protected |
| POST | /api/appointments | Create appointment | Patient/Admin |
| PUT | /api/appointments/:id | Update appointment | Admin/Doctor |
| DELETE | /api/appointments/:id | Cancel appointment | Admin |

### Statistics
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/stats | Get dashboard statistics | Public |

### Health Check
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/health | Server health status | Public |

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartcare.com | 123456 |
| Doctor | doctor@smartcare.com | 123456 |
| Patient | patient@email.com | 123456 |

---

## 🛠️ Backend Configuration

### Environment Variables (smartcare-backend/.env)
```
PORT=5002
JWT_SECRET=smartcare_secret_key_2024
```

### Data Storage
- Uses file-based JSON database (`data.json`)
- Data persists between server restarts

### Security Features
- JWT authentication with 24-hour token expiration
- Rate limiting (100 requests per 15 minutes)
- Input validation
- Password hashing with bcryptjs

---

## 🔌 Frontend API Service

The frontend uses axios with interceptors in `src/services/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 10000,
});

// Request interceptor adds auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor handles errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Local Fallback Mode
The app can work offline using local dummy data:
- Set `USE_LOCAL_FALLBACK = true` in `src/services/api.js`
- Automatically uses local data when backend is unavailable

---

## 📁 Project Structure

```
smartcare-hospital-management/
├── smartcare-backend/          # Express.js backend
│   ├── server.js              # Main server file
│   ├── data.json              # Database file
│   ├── package.json
│   └── .env                   # Environment variables
│
├── src/                       # React frontend
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── components/
│   │   ├── Toast.jsx         # Toast notifications
│   │   └── Loading.jsx       # Loading components
│   ├── pages/
│   │   ├── LoginPage.jsx     # Login with validation
│   │   ├── patient/
│   │   │   └── BookAppointment.jsx  # Booking with validation
│   │   └── doctor/
│   │       └── DoctorDashboard.jsx
│   └── data/
│       └── dummyData.js      # Local fallback data
│
└── package.json
```

---

## 🔧 Troubleshooting

### Port already in use
If port 5002 is in use, change it in `smartcare-backend/.env`:
```
PORT=5003
```

### JWT_SECRET error
Make sure `JWT_SECRET` is set in `smartcare-backend/.env`

### CORS errors
The backend is configured to allow all origins for development.

### Network error in frontend
- Ensure backend is running on port 5002
- Or enable local fallback mode in `src/services/api.js`

---

## 📝 Changelog

### Latest Updates
- ✅ Added Toast notification system
- ✅ Added form validation on Login and Book Appointment pages
- ✅ Implemented axios API service with interceptors
- ✅ Added medical records API endpoints
- ✅ Added rate limiting
- ✅ Added input validation on backend

---

## 💡 Next Steps for Enhancement

1. **Database**: Migrate from JSON file to MongoDB
2. **Pagination**: Add pagination for large datasets
3. **Real-time**: Add WebSocket for real-time updates
4. **Email**: Add email notifications for appointments
5. **Images**: Add image upload for profiles
6. **Analytics**: Enhanced dashboard analytics

