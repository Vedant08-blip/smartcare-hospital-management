# SmartCare – Hospital Management System

A modern, professional Hospital Management System frontend built with React.js and Tailwind CSS.

## 🚀 Features

- **Role-based Access**: Separate dashboards for Admin, Doctor, and Patient
- **Modern UI/UX**: Clean medical theme with professional design
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dashboard Analytics**: Visual charts and statistics
- **Appointment Management**: Book and manage appointments
- **Profile Management**: User profile pages for all roles

## 🛠️ Tech Stack

- **React.js 18** - Frontend library
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Chart.js / React-Chartjs-2** - Data visualization
- **Lucide React** - Icon library
- **Vite** - Build tool

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Vedant08-blip/smartcare-hospital-management.git

# Navigate to project directory
cd smartcare-hospital-management

# Install dependencies
npm install
```

## 🏃 Running the Application

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## 📁 Project Structure

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
│   ├── LoginPage.jsx   # Authentication page
│   ├── ServicesPage.jsx# Services information
│   ├── admin/           # Admin role pages
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProfile.jsx
│   │   ├── AppointmentsOverview.jsx
│   │   ├── ManageDoctors.jsx
│   │   └── ManagePatients.jsx
│   ├── doctor/          # Doctor role pages
│   │   ├── DoctorDashboard.jsx
│   │   ├── DoctorAppointments.jsx
│   │   ├── DoctorPatients.jsx
│   │   └── DoctorProfile.jsx
│   └── patient/         # Patient role pages
│       ├── PatientDashboard.jsx
│       ├── BookAppointment.jsx
│       ├── MyAppointments.jsx
│       └── PatientProfile.jsx
├── data/
│   └── dummyData.js     # Sample data for the application
├── App.jsx              # Main app component with routing
├── main.jsx             # Application entry point
└── index.css            # Global styles
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

## 👥 User Roles

### Admin
- View overall statistics and analytics
- Manage doctor records (add, edit, remove)
- Manage patient records
- View all appointments
- Update profile settings

### Doctor
- View personal dashboard
- View and manage appointments
- View patient list
- Update profile settings

### Patient
- View personal dashboard
- Book new appointments
- View appointment history
- Update profile settings

## 🔧 Component Details

### StatCard
A reusable card component for displaying statistics with icons.

**Props:**
- `title` (string): Card title
- `value` (string/number): Stat value
- `icon` (Component): Lucide icon component
- `color` (string): Color theme ('primary', 'blue', 'teal', 'green', 'orange')
- `trend` (number): Optional trend percentage

### Modal
A reusable modal component for dialogs.

**Props:**
- `isOpen` (boolean): Control modal visibility
- `onClose` (function): Close handler
- `title` (string): Modal title
- `children` (node): Modal content

### StatusBadge
A badge component for displaying status.

**Props:**
- `status` (string): Status type ('pending', 'confirmed', 'completed', 'cancelled')

## 📝 Notes

- This is a frontend-only implementation
- No backend logic or authentication included
- Ready to connect with backend APIs later
- Uses dummy data from `src/data/dummyData.js`

## 🎨 Color Scheme

- **Primary**: #00BCD4 (Cyan)
- **Primary Dark**: #0097A7
- **Primary Light**: #B2EBF2
- **Background**: #F5F5F5
- **Surface**: #FFFFFF
- **Text Primary**: #212121
- **Text Secondary**: #757575

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Vedant Trivedi - [GitHub](https://github.com/Vedant08-blip)

