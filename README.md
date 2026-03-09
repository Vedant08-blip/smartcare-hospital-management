# SmartCare – Hospital Management System

A modern, professional Hospital Management System with React.js frontend and Node.js/Express backend.

## 🚀 Features

- **Role-based Access**: Separate dashboards for Admin, Doctor, and Patient
- **Modern UI/UX**: Clean medical theme with professional design
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dashboard Analytics**: Visual charts and statistics
- **Appointment Management**: Book and manage appointments
- **Profile Management**: User profile pages for all roles
- **JWT Authentication**: Secure login with JSON Web Tokens
- **RESTful API**: Full backend API for data management

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Frontend library
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Chart.js / React-Chartjs-2** - Data visualization
- **Lucide React** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JSON Web Token (JWT)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Frontend
```bash
# Clone the repository
git clone https://github.com/Vedant08-blip/smartcare-hospital-management.git

# Navigate to project directory
cd smartcare-hospital-management

# Install dependencies
npm install
```

### Backend
```bash
# Navigate to backend directory
cd smartcare-backend

# Install dependencies
npm install
```

## 🏃 Running the Application

### Start Backend
```bash
cd smartcare-backend
npm start
```
The backend will start on `http://localhost:5002`

### Start Frontend
```bash
npm run dev
```
The application will start on `http://localhost:5173`

## 🔑 Login Credentials (Demo)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartcare.com | SmartAdmin2024! |
| Doctor | doctor@smartcare.com | SmartDoc2024! |
| Patient | patient@email.com | SmartPatient2024! |

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |
| GET | /api/auth/verify | Verify JWT token |


### Statistics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stats | Get dashboard statistics |

## 📁 Project Structure

### Frontend
```
src/
├── components/           # Reusable UI components
│   ├── Modal.jsx        # Reusable modal component
│   ├── Navbar.jsx       # Navigation bar component
│   ├── Sidebar.jsx      # Sidebar navigation
│   ├── StatCard.jsx     # Statistics card component
│   └── StatusBadge.jsx  # Status indicator badge
├── pages/               # Page components
│   ├── LandingPage.jsx  # Home/landing page
│   ├── LoginPage.jsx    # Authentication page
│   ├── ServicesPage.jsx # Services information
│   ├── admin/           # Admin role pages
│   ├── doctor/          # Doctor role pages
│   └── patient/         # Patient role pages
├── services/
│   └── api.js           # API service layer
├── data/
│   └── dummyData.js     # Sample data
├── App.jsx              # Main app component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

### Backend
```
smartcare-backend/
├── package.json         # Backend dependencies
├── server.js            # Express server & routes
├── .env                # Environment variables
```

## 🧭 Route Structure

### Public Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | LandingPage | Home page |
| `/login` | LoginPage | Login page |
| `/services` | ServicesPage | Services information |

### Admin Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/admin/dashboard` | AdminDashboard | Dashboard with stats & charts |
| `/admin/doctors` | ManageDoctors | Manage doctor records |
| `/admin/patients` | ManagePatients | Manage patient records |
| `/admin/appointments` | AppointmentsOverview | View all appointments |
| `/admin/profile` | AdminProfile | Admin profile settings |

### Doctor Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/doctor/dashboard` | DoctorDashboard | Doctor's dashboard |
| `/doctor/appointments` | DoctorAppointments | View appointments |
| `/doctor/patients` | DoctorPatients | View patient list |
| `/doctor/profile` | DoctorProfile | Doctor profile settings |

### Patient Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/patient/dashboard` | PatientDashboard | Patient's dashboard |
| `/patient/book-appointment` | BookAppointment | Book new appointment |
| `/patient/appointments` | MyAppointments | View appointment history |
| `/patient/profile` | PatientProfile | Patient profile settings |

## 💾 Data Storage

- **Frontend**: Uses `src/data/dummyData.js` for static demo data
- **Backend**: Uses in-memory storage (data resets on server restart)
- **Future**: MongoDB integration can be added for permanent storage

## 📝 Notes

- The backend stores data in memory - data will reset when the server restarts
- CORS is enabled for local development
- Frontend and backend run on different ports (5173 and 5002)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Vedant Trivedi - [GitHub](https://github.com/Vedant08-blip)

