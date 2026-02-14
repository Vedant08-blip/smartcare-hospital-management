import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import { Users, Stethoscope, Calendar, Activity } from 'lucide-react';
import { adminStats, appointmentStatsByMonth } from '../../data/dummyData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Bar chart data for appointments
  const barChartData = {
    labels: appointmentStatsByMonth.map(item => item.month),
    datasets: [
      {
        label: 'Appointments',
        data: appointmentStatsByMonth.map(item => item.appointments),
        backgroundColor: 'rgba(0, 188, 212, 0.6)',
        borderColor: 'rgba(0, 188, 212, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Doughnut chart for appointment status
  const statusChartData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [adminStats.pendingAppointments, adminStats.completedAppointments],
        backgroundColor: ['rgba(255, 193, 7, 0.8)', 'rgba(76, 175, 80, 0.8)'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening at SmartCare today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Doctors"
              value={adminStats.totalDoctors}
              icon={Stethoscope}
              color="primary"
            />
            <StatCard
              title="Total Patients"
              value={adminStats.totalPatients}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Appointments Today"
              value={adminStats.appointmentsToday}
              icon={Calendar}
              color="teal"
            />
            <StatCard
              title="Total Appointments"
              value={adminStats.totalAppointments}
              icon={Activity}
              color="green"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Monthly Appointments
              </h3>
              <div className="h-64">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>

            {/* Doughnut Chart */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Appointment Status
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={statusChartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg text-left transition-colors">
                <Stethoscope className="h-6 w-6 text-primary-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Add New Doctor</h4>
                <p className="text-sm text-gray-600">Register a new doctor</p>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900">Add New Patient</h4>
                <p className="text-sm text-gray-600">Register a new patient</p>
              </button>
              <button className="p-4 bg-teal-50 hover:bg-teal-100 rounded-lg text-left transition-colors">
                <Calendar className="h-6 w-6 text-teal-600 mb-2" />
                <h4 className="font-semibold text-gray-900">View All Appointments</h4>
                <p className="text-sm text-gray-600">Manage appointments</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
