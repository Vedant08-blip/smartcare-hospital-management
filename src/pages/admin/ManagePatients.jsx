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

      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Manage Patients</h1>
              <p className="text-gray-600">View and manage registered patients</p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Patient</span>
            </button>
          </div>

          {/* Table */}
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">Patient</th>
                  <th className="py-4 px-6 text-left">Contact</th>
                  <th className="py-4 px-6 text-left">Age</th>
                  <th className="py-4 px-6 text-left">Gender</th>
                  <th className="py-4 px-6 text-left">Blood Group</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 flex items-center space-x-3">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p>{patient.phone}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {patient.address}
                      </p>
                    </td>

                    <td className="py-4 px-6">{patient.age}</td>
                    <td className="py-4 px-6">{patient.gender}</td>

                    <td className="py-4 px-6">
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full inline-flex items-center">
                        <Droplet className="h-3 w-3 mr-1" />
                        {patient.bloodGroup}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Patient" : "Add Patient"}
            </h2>

            {["name", "email", "phone", "address", "age", "gender", "bloodGroup"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={handleChange}
                className="input mb-2 w-full"
              />
            ))}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              {isEditing ? (
                <button
                  onClick={handleUpdatePatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAddPatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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