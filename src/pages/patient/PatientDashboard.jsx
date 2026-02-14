import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { appointments, doctors } from '../../data/dummyData';
import { Calendar, Clock, Stethoscope, Plus, FileText } from 'lucide-react';

const PatientDashboard = () => {
  // Get patient's appointments (for demo, using first patient)
  const patientAppointments = appointments.filter(apt => apt.patientId === 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="patient" />
      <Sidebar userRole="patient" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back! Manage your appointments and health records.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            
            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Upcoming</h3>
                  <p className="text-sm text-gray-600">
                    {patientAppointments.filter(apt => apt.status === 'Pending').length} appointments
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">History</h3>
                  <p className="text-sm text-gray-600">
                    {patientAppointments.filter(apt => apt.status === 'Completed').length} completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link to="/patient/appointments" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            {patientAppointments.filter(apt => apt.status === 'Pending').length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No upcoming appointments</p>
                <Link to="/patient/book-appointment" className="btn-primary inline-block">
                  Book Appointment
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {patientAppointments
                  .filter(apt => apt.status === 'Pending')
                  .slice(0, 3)
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Stethoscope className="h-5 w-5 text-primary-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                              {appointment.doctorName}
                            </h3>
                            <StatusBadge status={appointment.status} />
                          </div>
                          <p className="text-sm text-primary-600 mb-3">{appointment.specialization}</p>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-3">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                        </div>
                        <button className="btn-secondary text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Available Doctors */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.slice(0, 3).map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-primary-600">{doctor.specialization}</p>
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
    </div>
  );
};

export default PatientDashboard;
