import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { doctors } from '../../data/dummyData';
import { Stethoscope, Mail, Phone, Plus, Edit, Trash2 } from 'lucide-react';

const ManageDoctors = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Doctors</h1>
              <p className="text-gray-600">View and manage all registered doctors</p>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Doctor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Stethoscope className="h-4 w-4 text-primary-600" />
                      <span className="text-sm text-primary-600 font-medium">
                        {doctor.specialization}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center">
                      <Mail className="h-3 w-3 mr-2" />
                      {doctor.email}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 flex items-center">
                      <Phone className="h-3 w-3 mr-2" />
                      {doctor.phone}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Experience: {doctor.experience}
                    </p>
                    <div className="flex space-x-2">
                      <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 text-sm py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;
