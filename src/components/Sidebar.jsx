import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  User, 
  Stethoscope,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      {/* Mobile menu toggle button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-md bg-white shadow-lg text-gray-700 hover:bg-gray-100 border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:z-30
        `}
      >
        <div className="h-full flex flex-col pt-16 lg:pt-4 overflow-y-auto">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold border-l-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* User info footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center capitalize">
              Logged in as {userRole}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

