import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { appointments } from '../../data/dummyData';
import { Calendar, Clock, Stethoscope, Search } from 'lucide-react';
import { useState } from 'react';

const MyAppointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Get patient's appointments (for demo, using first patient)
  const patientAppointments = appointments.filter(apt => apt.patientId === 1);

  const filteredAppointments = patientAppointments.filter(apt =>
    apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="patient" />
      <Sidebar userRole="patient" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
              <p className="text-gray-600">View your appointment history</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="card overflow-x-auto">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Doctor</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Specialization</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Time</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Reason</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Stethoscope className="h-5 w-5 text-primary-600" />
                          <span className="font-medium text-gray-900">{appointment.doctorName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{appointment.specialization}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{appointment.reason}</td>
                      <td className="py-4 px-6">
                        <StatusBadge status={appointment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
