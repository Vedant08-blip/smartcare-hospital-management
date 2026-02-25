import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";

const AdminProfile = () => {
  const initialData = {
    name: "Admin User",
    email: "admin@smartcare.com",
    phone: "+1 234-567-8900",
    address: "123 Hospital Street, Medical City",
    role: "Administrator",
    image: null,
  };

  const [formData, setFormData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={true} userRole="admin" />
      <Sidebar userRole="admin" />

      <div className="ml-64 pt-16 p-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and update your account details
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div className="flex items-center space-x-6">

                {/* Profile Image */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden shadow">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Shield className="h-14 w-14 text-primary-600" />
                    )}
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow cursor-pointer">
                      <Camera className="h-4 w-4 text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">
                    {formData.name}
                  </h2>
                  <p className="text-primary-600 font-medium">
                    {formData.role}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 md:mt-0 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center space-x-2 transition"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3 mt-6 md:mt-0">
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center space-x-2 transition"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Form Section */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <User className="h-5 w-5 text-gray-400" />
                    <span>{formData.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                {isEditing ? (
                  <>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-start space-x-2 text-gray-800">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <span>{formData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;