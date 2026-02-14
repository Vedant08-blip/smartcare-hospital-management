import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ isAuthenticated = false, userRole = null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Frontend only - no actual logout logic
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">SmartCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Home
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Services
                </Link>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={`/${userRole}/dashboard`} 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to={`/${userRole}/profile`} 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Home
                </Link>
                <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Services
                </Link>
                <Link to="/login" className="block px-4 py-2 btn-primary text-center">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={`/${userRole}/dashboard`} 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </Link>
                <Link 
                  to={`/${userRole}/profile`} 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full px-4 py-2 btn-secondary text-center">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
