import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { doctors as initialDoctors } from "../../data/dummyData";
import { Stethoscope, Mail, Phone, Plus, Edit, Trash2 } from "lucide-react";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    experience: "",
    image: "https://via.placeholder.com/150"
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Doctor
  const handleAddDoctor = () => {
    const newDoctor = {
      id: Date.now(),
      ...formData
    };
    setDoctors([...doctors, newDoctor]);
    setIsOpen(false);
    resetForm();
  };

  // Edit Doctor
  const handleEditDoctor = (doctor) => {
    setIsEditing(true);
    setIsOpen(true);
    setCurrentDoctor(doctor);
    setFormData(doctor);
  };

  const handleUpdateDoctor = () => {
    const updatedDoctors = doctors.map((doc) =>
      doc.id === currentDoctor.id ? { ...formData } : doc
    );
    setDoctors(updatedDoctors);
    setIsOpen(false);
    setIsEditing(false);
    resetForm();
  };

  // Delete Doctor
  const handleDeleteDoctor = (id) => {
    const filteredDoctors = doctors.filter((doc) => doc.id !== id);
    setDoctors(filteredDoctors);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      email: "",
      phone: "",
      experience: "",
      image: "https://via.placeholder.com/150"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />

      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Manage Doctors</h1>
              <p className="text-gray-600">View and manage doctors</p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Doctor</span>
            </button>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="card p-4 shadow-md">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full mb-3"
                />
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-sm text-primary-600">
                  {doctor.specialization}
                </p>
                <p className="text-sm flex items-center">
                  <Mail className="h-3 w-3 mr-2" />
                  {doctor.email}
                </p>
                <p className="text-sm flex items-center">
                  <Phone className="h-3 w-3 mr-2" />
                  {doctor.phone}
                </p>
                <p className="text-xs text-gray-500">
                  Experience: {doctor.experience}
                </p>

                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleEditDoctor(doctor)}
                    className="flex-1 btn-secondary text-sm py-2 flex justify-center items-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="flex-1 bg-red-100 text-red-700 text-sm py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Doctor" : "Add Doctor"}
            </h2>

            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input mb-2 w-full"
            />
            <input
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="input mb-2 w-full"
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input mb-2 w-full"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input mb-2 w-full"
            />
            <input
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="input mb-4 w-full"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              {isEditing ? (
                <button
                  onClick={handleUpdateDoctor}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAddDoctor}
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

export default ManageDoctors;