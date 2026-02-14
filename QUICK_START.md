# Quick Start Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in terminal

## Testing Different Roles

### Admin Access
1. Go to Login page
2. Select "Admin" role
3. Enter any email and password
4. Click "Sign In as Admin"
5. You'll be redirected to Admin Dashboard

### Doctor Access
1. Go to Login page
2. Select "Doctor" role
3. Enter any email and password
4. Click "Sign In as Doctor"
5. You'll be redirected to Doctor Dashboard

### Patient Access
1. Go to Login page
2. Select "Patient" role
3. Enter any email and password
4. Click "Sign In as Patient"
5. You'll be redirected to Patient Dashboard

## Features Overview

### Admin Features
- View statistics dashboard with charts
- Manage doctors (view, add, edit, delete)
- Manage patients (view, add, edit, delete)
- View all appointments overview
- Profile management

### Doctor Features
- View today's appointments
- View all appointments
- Manage patient list
- Profile management

### Patient Features
- Book appointments with doctor selection
- View appointment history
- View available doctors
- Profile management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── StatusBadge.jsx
│   └── Modal.jsx
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── ServicesPage.jsx
│   ├── admin/         # Admin pages
│   ├── doctor/        # Doctor pages
│   └── patient/       # Patient pages
├── data/              # Dummy data
│   └── dummyData.js
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## Notes

- This is a **frontend-only** implementation
- No backend or authentication logic included
- All data is dummy/static data
- Ready to connect with backend APIs later
- Fully responsive design (mobile + desktop)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.
