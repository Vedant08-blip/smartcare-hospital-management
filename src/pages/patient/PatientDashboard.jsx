import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { useToast } from '../../components/Toast';
import { LoadingOverlay, EmptyState, ErrorState } from '../../components/Loading';
import { doctors } from '../../data/dummyData';
import { appointmentsAPI, authAPI } from '../../services/api';
import { Calendar, Clock, Stethoscope, Plus, FileText, X } from 'lucide-react';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Fetch appointments for this patient
      fetchAppointments(currentUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  // Refresh appointments when component mounts or regains focus
  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      fetchAppointments(currentUser.id);
    }
  }, []);

  const fetchAppointments = async (userId) => {
    try {
      const data = await appointmentsAPI.getAll('patient', userId);
      setAppointments(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to load appointments');
      toast.error('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setCancelling(true);
    try {
      await appointmentsAPI.cancel(appointmentId);
      
      // Update local state to remove the cancelled appointment
      setAppointments(prevAppointments => 
        prevAppointments.filter(apt => apt.id !== appointmentId)
      );
      
      // Close the modal
      setShowDetailsModal(false);
      setSelectedAppointment(null);
      
      // Show success toast
      toast.success('Appointment cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  // Filter and sort appointments by date/time
  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'Pending')
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });
  const completedAppointments = appointments
    .filter(apt => apt.status === 'Completed')
    .sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      return dateCompare !== 0 ? dateCompare : b.time.localeCompare(a.time);
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="patient" />
      <Sidebar userRole="patient" />
      
      <div className="lg:ml-64 pt-20 sm:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back! Manage your appointments and health records.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Link to="/patient/book-appointment" className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Plus className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule a new appointment</p>
                </div>
              </div>
            </Link>
            
            <div className="card cursor-pointer" onClick={() => setCurrentView('upcoming')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Upcoming</h3>
                  <p className="text-sm text-gray-600">
                    {upcomingAppointments.length} appointments
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card cursor-pointer" onClick={() => setCurrentView('history')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">History</h3>
                  <p className="text-sm text-gray-600">
                    {completedAppointments.length} completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section - Changes based on currentView */}
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentView === 'upcoming' ? 'Upcoming Appointments' : 'Appointment History'}
              </h2>
              <div className="space-x-4">
                <button 
                  onClick={() => setCurrentView('upcoming')}
                  className={`text-sm font-medium ${currentView === 'upcoming' ? 'text-primary-600' : 'text-gray-500'}`}
                >
                  Upcoming
                </button>
                <button 
                  onClick={() => setCurrentView('history')}
                  className={`text-sm font-medium ${currentView === 'history' ? 'text-primary-600' : 'text-gray-500'}`}
                >
                  History
                </button>
              </div>
            </div>
            
            {currentView === 'upcoming' ? (
              upcomingAppointments.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No upcoming appointments</p>
                  <Link to="/patient/book-appointment" className="btn-primary inline-block text-sm sm:text-base">
                      View Available Doctors
                  </Link>
                   </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments
                    .slice(0, 3)
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                              <Stethoscope className="h-5 w-5 text-primary-600 flex-shrink-0" />
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                {appointment.doctorName}
                              </h3>
                              <StatusBadge status={appointment.status} />
                            </div>
                            <p className="text-sm text-primary-600 mb-3 truncate">{appointment.specialization}</p>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 text-sm">
                              <div className="flex items-center space-x-1.5">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{appointment.time}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mt-3 text-sm truncate">
                              <span className="font-medium">Reason:</span> {appointment.reason}
                            </p>
                          </div>
                          <button 
                            className="btn-secondary text-sm whitespace-nowrap self-start sm:self-center"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowDetailsModal(true);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )
            ) : (
              /* History View */
              completedAppointments.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No appointment history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                            <Stethoscope className="h-5 w-5 text-primary-600 flex-shrink-0" />
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                              {appointment.doctorName}
                            </h3>
                            <StatusBadge status={appointment.status} />
                          </div>
                          <p className="text-sm text-primary-600 mb-3 truncate">{appointment.specialization}</p>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 text-sm">
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{appointment.time}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-3 text-sm truncate">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Available Doctors */}
          <div className="card">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Available Doctors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.slice(0, 3).map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{doctor.name}</h3>
                      <p className="text-xs sm:text-sm text-primary-600 truncate">{doctor.specialization}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{doctor.experience} experience</p>
                  <Link
                    to="/patient/book-appointment"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Book Appointment →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Appointment Details"
      >
        {selectedAppointment && (
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={selectedAppointment.doctorId ? doctors.find(d => d.id === selectedAppointment.doctorId)?.image : 'https://ui-avatars.com/api/?name=Doctor&background=00bcd4&color=fff&size=128'}
                alt={selectedAppointment.doctorName}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{selectedAppointment.doctorName}</h3>
                <p className="text-primary-600">{selectedAppointment.specialization}</p>
                <StatusBadge status={selectedAppointment.status} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{selectedAppointment.date}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>{selectedAppointment.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Stethoscope className="h-5 w-5 text-gray-400" />
                <span>{selectedAppointment.reason}</span>
              </div>
            </div>

            {selectedAppointment.status === 'Pending' && (
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => cancelAppointment(selectedAppointment.id)}
                  disabled={cancelling}
                  className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 disabled:bg-red-50 disabled:text-red-300"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Appointment'}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientDashboard;
