import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { useToast } from '../../components/Toast';
import { LoadingOverlay, EmptyState, ErrorState } from '../../components/Loading';
import { appointmentsAPI, authAPI, doctorsAPI } from '../../services/api';
import { formatDate, formatTime } from '../../utils/date';
import { Calendar, Clock, User, FileText, Phone, Mail, Stethoscope } from 'lucide-react';
import { useState, useEffect } from 'react';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusBanner, setStatusBanner] = useState(null);
  const [dateFilter, setDateFilter] = useState('all');
  const toast = useToast();

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // If user is a doctor, fetch their data and appointments
      if (currentUser.role === 'doctor') {
        fetchDoctorAndAppointments(currentUser.id);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDoctorAndAppointments = async (userId) => {
    try {
      // Get appointments for this doctor
      const data = await appointmentsAPI.getAll('doctor', userId);
      
      if (data && Array.isArray(data)) {
        setAppointments(data);
      } else {
        setAppointments([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to load appointments');
      toast.error('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    setUpdating(true);
    try {
      await appointmentsAPI.update(appointmentId, { status });
      
      // Update local state
      setAppointments(prevAppointments =>
        prevAppointments.map(apt =>
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      );
      
      // Close the modal
      setShowDetailsModal(false);
      setSelectedAppointment(null);
      
      const bannerMessage = status === 'Confirmed'
        ? 'Appointment confirmed. The patient will see the updated status.'
        : 'Appointment marked as completed.';
      toast.success(bannerMessage);
      setStatusBanner({ type: 'success', message: bannerMessage });
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date();
  const today = todayDate.toISOString().split('T')[0];
  const sevenDays = new Date(todayDate);
  sevenDays.setDate(sevenDays.getDate() + 6);
  const sevenDaysStr = sevenDays.toISOString().split('T')[0];
  
  // Show upcoming appointments (today + future), sorted by date/time
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });
  const upcomingNext7Days = upcomingAppointments.filter(apt => apt.date <= sevenDaysStr);
  const visibleAppointments = dateFilter === 'today'
    ? upcomingAppointments.filter(apt => apt.date === today)
    : dateFilter === '7days'
      ? upcomingNext7Days
      : upcomingAppointments;
  
  // Stats (upcoming only)
  const pendingCount = upcomingAppointments.filter(apt => apt.status === 'Pending').length;
  const completedCount = upcomingAppointments.filter(apt => apt.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="doctor" />
      <Sidebar userRole="doctor" />
      
      <div className="lg:ml-64 pt-20 sm:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {statusBanner && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 flex items-center justify-between">
              <span>{statusBanner.message}</span>
              <button
                onClick={() => setStatusBanner(null)}
                className="text-green-700 hover:text-green-900"
                aria-label="Dismiss notification"
              >
                X
              </button>
            </div>
          )}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome Back Doctor</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-primary-600" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Next 7 Days</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingNext7Days.length}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDateFilter('all')}
                  className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full border ${
                    dateFilter === 'all' ? 'border-primary-500 text-primary-600' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  All Upcoming
                </button>
                <button
                  onClick={() => setDateFilter('7days')}
                  className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full border ${
                    dateFilter === '7days' ? 'border-primary-500 text-primary-600' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Next 7 Days
                </button>
                <button
                  onClick={() => setDateFilter('today')}
                  className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full border ${
                    dateFilter === 'today' ? 'border-primary-500 text-primary-600' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Today
                </button>
              </div>
            </div>
            
            {visibleAppointments.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No upcoming appointments scheduled</p>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                              {appointment.patientName}
                            </h3>
                          </div>
                          <StatusBadge status={appointment.status} />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{formatTime(appointment.time)}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 text-sm truncate">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>Call</span>
                          </button>
                          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>Message</span>
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        className="btn-primary text-sm whitespace-nowrap self-start"
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
            )}
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
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedAppointment.patientName}</h3>
                <p className="text-gray-600">Patient</p>
                <StatusBadge status={selectedAppointment.status} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{formatDate(selectedAppointment.date)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>{formatTime(selectedAppointment.time)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Stethoscope className="h-5 w-5 text-gray-400" />
                <span>{selectedAppointment.reason}</span>
              </div>
            </div>

            {selectedAppointment.status === 'Pending' && (
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => updateStatus(selectedAppointment.id, 'Confirmed')}
                  disabled={updating}
                  className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 disabled:bg-blue-50 disabled:text-blue-300"
                >
                  {updating ? 'Updating...' : 'Confirm Appointment'}
                </button>
                <button
                  onClick={() => updateStatus(selectedAppointment.id, 'Completed')}
                  disabled={updating}
                  className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 disabled:bg-green-50 disabled:text-green-300"
                >
                  {updating ? 'Updating...' : 'Mark as Completed'}
                </button>
              </div>
            )}
            {selectedAppointment.status === 'Confirmed' && (
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => updateStatus(selectedAppointment.id, 'Completed')}
                  disabled={updating}
                  className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 disabled:bg-green-50 disabled:text-green-300"
                >
                  {updating ? 'Updating...' : 'Mark as Completed'}
                </button>
              </div>
            )}
            {selectedAppointment.status === 'Cancelled' && selectedAppointment.cancelReason && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-1">Cancel reason</p>
                <p className="text-sm text-gray-800">{selectedAppointment.cancelReason}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
