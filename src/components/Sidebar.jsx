import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  User, 
  Stethoscope,
  FileText,
  Settings
} from 'lucide-react';

const Sidebar = ({ userRole }) => {
  const location = useLocation();

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/doctors', icon: Stethoscope, label: 'Manage Doctors' },
    { path: '/admin/patients', icon: Users, label: 'Manage Patients' },
    { path: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/admin/profile', icon: User, label: 'Profile' },
  ];

  const doctorMenuItems = [
    { path: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/doctor/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/doctor/patients', icon: Users, label: 'Patients' },
    { path: '/doctor/profile', icon: User, label: 'Profile' },
  ];

  const patientMenuItems = [
    { path: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/patient/book-appointment', icon: Calendar, label: 'Book Appointment' },
    { path: '/patient/appointments', icon: FileText, label: 'My Appointments' },
    { path: '/patient/profile', icon: User, label: 'Profile' },
  ];

  const menuItems = 
    userRole === 'admin' ? adminMenuItems :
    userRole === 'doctor' ? doctorMenuItems :
    patientMenuItems;

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-0 pt-16">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
