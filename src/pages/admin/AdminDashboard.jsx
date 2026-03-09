import { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import Modal from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { patientsAPI, statsAPI } from '../../services/api';
import {
  Users,
  Stethoscope,
  Calendar,
  Activity,
  ArrowLeft,
  MapPin,
  Droplet,
  X
} from 'lucide-react';
import { appointmentStatsByMonth } from '../../data/dummyData';
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
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    appointmentsToday: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Add Patient Modal State
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    bloodGroup: ''
  });

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await statsAPI.get();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await patientsAPI.create({
        ...formData,
        age: parseInt(formData.age),
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=00bcd4&color=fff&size=128`
      });
      
      toast.success('Patient added successfully!');
      setShowAddPatientModal(false);
      resetForm();
      fetchStats(); // Refresh stats
    } catch (error) {
      toast.error(error.message || 'Failed to add patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      gender: '',
      bloodGroup: ''
    });
  };

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
          stats.pendingAppointments,
          stats.completedAppointments,
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

      <div className="lg:ml-64 pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

          {/* =============================
               DASHBOARD VIEW
          ==============================*/}
          {currentView === 'dashboard' && (
            <>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                  Manage doctors, patients and appointments easily.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="animate-fadeInUp stagger-1">
                  <StatCard
                    title="Total Doctors"
                    value={loading ? '...' : stats.totalDoctors}
                    icon={Stethoscope}
                  />
                </div>
                <div className="animate-fadeInUp stagger-2">
                  <StatCard
                    title="Total Patients"
                    value={loading ? '...' : stats.totalPatients}
                    icon={Users}
                  />
                </div>
                <div className="animate-fadeInUp stagger-3">
                  <StatCard
                    title="Appointments Today"
                    value={loading ? '...' : stats.appointmentsToday}
                    icon={Calendar}
                  />
                </div>
                <div className="animate-fadeInUp stagger-4">
                  <StatCard
                    title="Total Appointments"
                    value={loading ? '...' : stats.totalAppointments}
                    icon={Activity}
                  />
                </div>
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow animate-fadeInUp stagger-5">
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">
                    Monthly Appointments
                  </h3>
                  <div className="h-56 sm:h-72">
                    <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow animate-fadeInUp stagger-6">
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">
                    Appointment Status
                  </h3>
                  <div className="h-56 sm:h-72 flex items-center justify-center">
                    <Doughnut data={statusChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow animate-fadeInUp stagger-7">
                <h3 className="font-semibold mb-4 text-sm sm:text-base">Quick Actions</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowAddPatientModal(true)}
                    className="p-4 sm:p-5 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left"
                  >
                    <Users className="mb-2 text-green-600 h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-medium text-sm sm:text-base">Add Patient</span>
                  </button>

                  <button
                    onClick={() => window.location.href = '/admin/appointments'}
                    className="p-4 sm:p-5 bg-purple-50 hover:bg-purple-100 transition-all duration-300 rounded-xl hover:scale-105 hover:shadow-lg text-left"
                  >
                    <Calendar className="mb-2 text-purple-600 h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="font-medium text-sm sm:text-base">View Appointments</span>
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

      {/* Add Patient Modal */}
      <Modal
        isOpen={showAddPatientModal}
        onClose={() => {
          setShowAddPatientModal(false);
          resetForm();
        }}
        title="Add New Patient"
      >
        <form onSubmit={handleAddPatient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="+1 234-567-8900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="123 Main St, City"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
              <input
                type="number"
                name="age"
                required
                min="1"
                max="150"
                value={formData.age}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="35"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group *</label>
            <select
              name="bloodGroup"
              required
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowAddPatientModal(false);
                resetForm();
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Patient'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
