import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { patients as initialPatients } from "../../data/dummyData";
import { MapPin, Droplet, Plus, Edit, Trash2 } from "lucide-react";

const ManagePatients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    bloodGroup: "",
    image: "https://via.placeholder.com/100"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Patient
  const handleAddPatient = () => {
    const newPatient = {
      id: Date.now(),
      ...formData
    };
    setPatients([...patients, newPatient]);
    closeModal();
  };

  // Edit Patient
  const handleEditPatient = (patient) => {
    setIsEditing(true);
    setCurrentPatient(patient);
    setFormData(patient);
    setIsOpen(true);
  };

  const handleUpdatePatient = () => {
    const updatedPatients = patients.map((p) =>
      p.id === currentPatient.id ? { ...formData, id: p.id } : p
    );
    setPatients(updatedPatients);
    closeModal();
  };

  // Delete Patient
  const handleDeletePatient = (id) => {
    const filtered = patients.filter((p) => p.id !== id);
    setPatients(filtered);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setCurrentPatient(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      age: "",
      gender: "",
      bloodGroup: "",
      image: "https://via.placeholder.com/100"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />

      <div className="lg:ml-64 pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Manage Patients</h1>
              <p className="text-gray-600 text-sm sm:text-base">View and manage registered patients</p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Plus className="h-5 w-5" />
              <span>Add Patient</span>
            </button>
          </div>

          {/* Table - Horizontal scroll wrapper for mobile */}
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold">Patient</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold">Contact</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold">Age</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold">Gender</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold">Blood</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-xs sm:text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={patient.image}
                          alt={patient.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">{patient.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{patient.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm">
                      <p className="truncate">{patient.phone}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{patient.address}</span>
                      </p>
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm">{patient.age}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm">{patient.gender}</td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full inline-flex items-center">
                        <Droplet className="h-3 w-3 mr-1" />
                        {patient.bloodGroup}
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-red-600"
                        >
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

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-3 sm:p-4 z-50">
          <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {isEditing ? "Edit Patient" : "Add Patient"}
            </h2>

            <div className="space-y-3">
              {["name", "email", "phone", "address", "age", "gender", "bloodGroup"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="input-field w-full text-sm"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
              >
                Cancel
              </button>

              {isEditing ? (
                <button
                  onClick={handleUpdatePatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAddPatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;