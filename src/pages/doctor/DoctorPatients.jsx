import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import { patients } from '../../data/dummyData';
import { User, Mail, Phone, Droplet, Search, Calendar, Activity, Pill, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRecords = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

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
                
                <button 
                  onClick={() => handleViewRecords(patient)}
                  className="w-full btn-secondary text-sm py-2"
                >
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

      {/* Medical Records Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Medical Records - ${selectedPatient?.name}`}
      >
        {selectedPatient && (
          <div className="space-y-6">
            {/* Patient Info Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedPatient.image}
                  alt={selectedPatient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedPatient.name}</h3>
                  <p className="text-sm text-gray-600">{selectedPatient.age} years, {selectedPatient.gender}</p>
                  <p className="text-sm text-gray-600">Blood Group: {selectedPatient.bloodGroup}</p>
                </div>
              </div>
            </div>

            {/* Allergies */}
            {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Allergies</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies.map((allergy, index) => (
                    <span key={index} className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Chronic Conditions */}
            {selectedPatient.chronicConditions && selectedPatient.chronicConditions.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Chronic Conditions</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.chronicConditions.map((condition, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Medical Records History */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Visit History</span>
              </h4>
              <div className="space-y-4">
                {selectedPatient.medicalRecords && selectedPatient.medicalRecords.length > 0 ? (
                  selectedPatient.medicalRecords.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{record.date}</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{record.specialization}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Doctor</p>
                          <p className="text-gray-900">{record.doctor}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Diagnosis</p>
                          <p className="text-gray-900">{record.diagnosis}</p>
                        </div>
                        {record.prescription && (
                          <div>
                            <p className="text-sm font-medium text-gray-500 flex items-center space-x-1">
                              <Pill className="h-4 w-4" />
                              <span>Prescription</span>
                            </p>
                            <p className="text-gray-900">{record.prescription}</p>
                          </div>
                        )}
                        {record.notes && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Notes</p>
                            <p className="text-gray-900 text-sm">{record.notes}</p>
                          </div>
                        )}
                        
                        {/* Vital Signs */}
                        <div className="bg-gray-50 rounded-lg p-3 mt-2">
                          <p className="text-sm font-medium text-gray-500 mb-2">Vital Signs</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">BP:</span>{' '}
                              <span className="font-medium">{record.vitals?.bloodPressure}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Heart Rate:</span>{' '}
                              <span className="font-medium">{record.vitals?.heartRate}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Temp:</span>{' '}
                              <span className="font-medium">{record.vitals?.temperature}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Weight:</span>{' '}
                              <span className="font-medium">{record.vitals?.weight}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No medical records available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPatients;
