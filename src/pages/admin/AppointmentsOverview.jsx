import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { appointmentsAPI } from '../../services/api';
import { Calendar, Clock, User, Stethoscope, Search, Loader2 } from 'lucide-react';

const AppointmentsOverview = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentsAPI.getAll();
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments based on search
  const filteredAppointments = appointments.filter(apt =>
    apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />
      
      <div className="lg:ml-64 pt-20 sm:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Appointments Overview</h1>
              <p className="text-gray-600 text-sm sm:text-base">Manage and monitor all appointments</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-full sm:w-64"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              <span className="ml-2 text-gray-600">Loading appointments...</span>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="card text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'No appointments match your search' : 'No appointments found'}
              </p>
            </div>
          ) : (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Doctor</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Date & Time</th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-900 text-sm truncate">{appointment.patientName}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{appointment.doctorName}</p>
                          <p className="text-xs sm:text-sm text-primary-600 truncate">{appointment.specialization}</p>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-1 sm:gap-0">
                          <div className="flex items-center space-x-1 text-gray-600 text-xs sm:text-sm">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600 text-xs sm:text-sm">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{appointment.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <StatusBadge status={appointment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsOverview;
