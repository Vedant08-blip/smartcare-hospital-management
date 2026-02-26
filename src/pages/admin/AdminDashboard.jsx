import { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import {
  Users,
  Stethoscope,
  Calendar,
  Activity,
  ArrowLeft
} from 'lucide-react';
import { adminStats, appointmentStatsByMonth } from '../../data/dummyData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  /* =============================
     Chart Data
  ==============================*/

  const barChartData = useMemo(() => ({
    labels: appointmentStatsByMonth.map(item => item.month),
    datasets: [
      {
        label: 'Appointments',
        data: appointmentStatsByMonth.map(item => item.appointments),
        backgroundColor: 'rgba(59,130,246,0.6)',
        borderRadius: 6,
      },
    ],
  }), []);

  const statusChartData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [
          adminStats.pendingAppointments,
          adminStats.completedAppointments,
        ],
        backgroundColor: ['#F59E0B', '#10B981'],
        cutout: '70%',
      },
    ],
  };

  /* =============================
     Reusable Back Button
  ==============================*/

  const BackButton = () => (
    <button
      onClick={() => setCurrentView('dashboard')}
      className="flex items-center text-blue-600 mb-4"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back to Dashboard
    </button>
  );

  /* =============================
     MAIN RENDER
  ==============================*/

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated userRole="admin" />
      <Sidebar userRole="admin" />

      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* =============================
               DASHBOARD VIEW
          ==============================*/}
          {currentView === 'dashboard' && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500">
                  Manage doctors, patients and appointments easily.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Doctors"
                  value={adminStats.totalDoctors}
                  icon={Stethoscope}
                />
                <StatCard
                  title="Total Patients"
                  value={adminStats.totalPatients}
                  icon={Users}
                />
                <StatCard
                  title="Appointments Today"
                  value={adminStats.appointmentsToday}
                  icon={Calendar}
                />
                <StatCard
                  title="Total Appointments"
                  value={adminStats.totalAppointments}
                  icon={Activity}
                />
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold mb-4">
                    Monthly Appointments
                  </h3>
                  <div className="h-72">
                    <Bar data={barChartData} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold mb-4">
                    Appointment Status
                  </h3>
                  <div className="h-72 flex items-center justify-center">
                    <Doughnut data={statusChartData} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Quick Actions</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCurrentView('addPatient')}
                    className="p-5 bg-green-50 rounded-xl hover:bg-green-100 transition"
                  >
                    <Users className="mb-2 text-green-600" />
                    Add Patient
                  </button>

                  <button
                    onClick={() => setCurrentView('appointments')}
                    className="p-5 bg-purple-50 rounded-xl hover:bg-purple-100 transition"
                  >
                    <Calendar className="mb-2 text-purple-600" />
                    View Appointments
                  </button>
                </div>
              </div>
            </>
          )}

          {/* =============================
               ADD PATIENT VIEW
          ==============================*/}
          {currentView === 'addPatient' && (
            <div className="bg-white p-6 rounded-xl shadow">
              <BackButton />
              <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

              <input
                type="text"
                placeholder="Patient Name"
                className="input-field mb-3"
              />
              <input
                type="number"
                placeholder="Age"
                className="input-field mb-3"
              />
              <button className="btn-primary">Save Patient</button>
            </div>
          )}

          {/* =============================
               APPOINTMENTS VIEW
          ==============================*/}
          {currentView === 'appointments' && (
            <div className="bg-white p-6 rounded-xl shadow">
              <BackButton />
              <h2 className="text-xl font-semibold mb-4">
                All Appointments
              </h2>

              <p className="text-gray-500">
                Please wait collecting the data...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;