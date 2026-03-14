import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { appointmentsAPI, authAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import { Calendar, Clock, User, Search, Stethoscope } from 'lucide-react';
import { useState, useEffect } from 'react';

const DoctorAppointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusBanner, setStatusBanner] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      fetchAppointments(currentUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAppointments = async (userId) => {
    try {
      // Pass role and userId to get filtered appointments
      const data = await appointmentsAPI.getAll('doctor', userId);
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      toast.error('Failed to load appointments');
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
  const today = new Date().toISOString().split('T')[0];

  // Filter appointments - show all appointments for the doctor (not just today's)
  const filteredAppointments = appointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
              <p className="text-gray-600 text-sm sm:text-base">View and manage all your appointments</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
          </div>

          <div className="card overflow-x-auto">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-900 text-sm truncate">{appointment.patientName}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center space-x-1 sm:space-x-2 text-gray-600 text-sm">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{appointment.date}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center space-x-1 sm:space-x-2 text-gray-600 text-sm">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{appointment.time}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <StatusBadge status={appointment.status} />
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <button 
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium whitespace-nowrap"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDetailsModal(true);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">Doctor:</span>
                <span>{selectedAppointment.doctorName}</span>
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

export default DoctorAppointments;
