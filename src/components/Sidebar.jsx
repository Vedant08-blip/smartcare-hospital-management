import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  User, 
  Stethoscope,
  FileText,
  Settings,
  X,
  Menu
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-md bg-white shadow-lg text-gray-700 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg border-r border-gray-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:top-16 lg:h-[calc(100vh-4rem)]
        pt-16 lg:pt-0
      `}>
        <div className="p-4 pt-20 lg:pt-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
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
    </>
  );
};

export default Sidebar;

