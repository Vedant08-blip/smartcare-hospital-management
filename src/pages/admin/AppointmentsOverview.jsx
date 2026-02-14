import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { appointments } from '../../data/dummyData';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';

const AppointmentsOverview = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments Overview</h1>
            <p className="text-gray-600">Manage and monitor all appointments</p>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Doctor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Reason</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{appointment.patientName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                        <p className="text-sm text-primary-600">{appointment.specialization}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsOverview;
