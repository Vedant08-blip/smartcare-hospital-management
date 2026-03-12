import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { patientsAPI } from "../../services/api";
import { useToast } from "../../components/Toast";
import { MapPin, Droplet, Plus, Edit, Trash2, Loader2 } from "lucide-react";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

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

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientsAPI.getAll();
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newPatient = await patientsAPI.create({
        ...formData,
        age: parseInt(formData.age),
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=00bcd4&color=fff&size=128`
      });
      
      setPatients([...patients, newPatient]);
      closeModal();
      toast.success('Patient added successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to add patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit Patient
  const handleEditPatient = (patient) => {
    setIsEditing(true);
    setCurrentPatient(patient);
    setFormData(patient);
    setIsOpen(true);
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const updated = await patientsAPI.update(currentPatient.id, formData);
      
      setPatients(patients.map((p) =>
        p.id === currentPatient.id ? { ...p, ...updated } : p
      ));
      closeModal();
      toast.success('Patient updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Patient
  const handleDeletePatient = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    
    try {
      await patientsAPI.delete(id);
      const filtered = patients.filter((p) => p.id !== id);
      setPatients(filtered);
      toast.success('Patient deleted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to delete patient');
    }
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

      <div className="lg:ml-64 pt-20 sm:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
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

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              <span className="ml-2 text-gray-600">Loading patients...</span>
            </div>
          ) : patients.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No patients found</p>
            </div>
          ) : (
            /* Table - Horizontal scroll wrapper for mobile */
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
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-3 sm:p-4 z-50">
          <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {isEditing ? "Edit Patient" : "Add Patient"}
            </h2>

            <form onSubmit={isEditing ? handleUpdatePatient : handleAddPatient} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full text-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="input-field w-full text-sm"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="input-field w-full text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field w-full text-sm"
                />
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field w-full text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <select
                name="bloodGroup"
                required
                value={formData.bloodGroup}
                onChange={handleChange}
                className="input-field w-full text-sm"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
