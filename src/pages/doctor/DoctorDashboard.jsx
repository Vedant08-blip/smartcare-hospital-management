import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { appointments } from '../../data/dummyData';
import { Calendar, Clock, User, FileText, Phone, Mail } from 'lucide-react';

const DoctorDashboard = () => {
  // Filter today's appointments (for demo, using current date)
  const todayAppointments = appointments.filter(apt => apt.date === '2026-02-15');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="doctor" />
      <Sidebar userRole="doctor" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. Sarah Johnson</p>
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
                  <p className="text-3xl font-bold text-gray-900">
                    {todayAppointments.filter(apt => apt.status === 'Pending').length}
                  </p>
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
                  <p className="text-3xl font-bold text-gray-900">
                    {todayAppointments.filter(apt => apt.status === 'Completed').length}
                  </p>
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
                        <button className="btn-primary text-sm">
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
    </div>
  );
};

export default DoctorDashboard;
