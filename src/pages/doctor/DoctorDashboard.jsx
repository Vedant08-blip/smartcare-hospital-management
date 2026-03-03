import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { useToast } from '../../components/Toast';
import { LoadingOverlay, EmptyState, ErrorState } from '../../components/Loading';
import { appointmentsAPI, authAPI, doctorsAPI } from '../../services/api';
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
      // Get all appointments
      const data = await appointmentsAPI.getAll();
      
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

  const markAsCompleted = async (appointmentId) => {
    setUpdating(true);
    try {
      await appointmentsAPI.update(appointmentId, { status: 'Completed' });
      
      // Update local state
      setAppointments(prevAppointments =>
        prevAppointments.map(apt =>
          apt.id === appointmentId ? { ...apt, status: 'Completed' } : apt
        )
      );
      
      // Close the modal
      setShowDetailsModal(false);
      setSelectedAppointment(null);
      
      toast.success('Appointment marked as completed!');
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter today's appointments
  const todayAppointments = appointments.filter(apt => apt.date === today);
  
  // Stats
  const pendingCount = todayAppointments.filter(apt => apt.status === 'Pending').length;
  const completedCount = todayAppointments.filter(apt => apt.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="doctor" />
      <Sidebar userRole="doctor" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome Back Doctor</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{todayAppointments.length}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-primary-600" />
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

          {/* Today's Appointments */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Appointments</h2>
            
            {todayAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900">
                              {appointment.patientName}
                            </h3>
                          </div>
                          <StatusBadge status={appointment.status} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </p>
                        
                        <div className="flex space-x-4">
                          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>Call Patient</span>
                          </button>
                          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>Send Message</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <button 
                          className="btn-primary text-sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDetailsModal(true);
                          }}
                        >
                          View Details
                        </button>
                      </div>
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
                  onClick={() => markAsCompleted(selectedAppointment.id)}
                  disabled={updating}
                  className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 disabled:bg-green-50 disabled:text-green-300"
                >
                  {updating ? 'Updating...' : 'Mark as Completed'}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
