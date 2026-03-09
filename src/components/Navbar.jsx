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
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-white/20 transition-all duration-300 hover:shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Stethoscope className="h-8 w-8 text-primary-600 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">SmartCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium">
                  Home
                </Link>
                <Link to="/services" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium">
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
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to={`/${userRole}/profile`} 
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
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
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  Home
                </Link>
                <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
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
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  to={`/${userRole}/profile`} 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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

