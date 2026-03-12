import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { doctors as initialDoctors } from "../../data/dummyData";
import { Mail, Phone, Edit, Trash2 } from "lucide-react";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    experience: "",
    image: "https://via.placeholder.com/150"
  });

  // Edit Doctor
  const handleEditDoctor = (doctor) => {
    setIsOpen(true);
    setCurrentDoctor(doctor);
    setFormData(doctor);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateDoctor = () => {
    const updatedDoctors = doctors.map((doc) =>
      doc.id === currentDoctor.id ? { ...formData } : doc
    );
    setDoctors(updatedDoctors);
    setIsOpen(false);
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

      <div className="lg:ml-64 pt-20 sm:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Manage Doctors</h1>
              <p className="text-gray-600 text-sm sm:text-base">View and manage doctors</p>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-3 sm:p-4 z-50">
          <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Edit Doctor
            </h2>

            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field mb-2 w-full"
            />
            <input
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="input-field mb-2 w-full"
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field mb-2 w-full"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field mb-2 w-full"
            />
            <input
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="input-field mb-4 w-full"
            />

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateDoctor}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;