import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { patients } from '../../data/dummyData';
import { User, Mail, Phone, Droplet, Search } from 'lucide-react';
import { useState } from 'react';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="doctor" />
      <Sidebar userRole="doctor" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Patients</h1>
              <p className="text-gray-600">View patient information and records</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {patient.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Droplet className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-600">Blood Group: {patient.bloodGroup}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{patient.age} years, {patient.gender}</span>
                  </div>
                </div>
                
                <button className="w-full btn-secondary text-sm py-2">
                  View Medical Records
                </button>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No patients found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;
