import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { patients } from '../../data/dummyData';
import { Users, Mail, Phone, MapPin, Droplet, Plus, Edit, Trash2 } from 'lucide-react';

const ManagePatients = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Patients</h1>
              <p className="text-gray-600">View and manage all registered patients</p>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Patient</span>
            </button>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Age</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Gender</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Blood Group</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={patient.image}
                          alt={patient.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{patient.phone}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {patient.address}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{patient.age} years</td>
                    <td className="py-4 px-6 text-gray-900">{patient.gender}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <Droplet className="h-3 w-3 mr-1" />
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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

export default ManagePatients;
