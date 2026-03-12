import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { User, Mail, Phone, MapPin, Heart, Droplet, Edit, Save, X } from 'lucide-react';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8910',
    address: '123 Main St, City, State',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+'
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="patient" />
      <Sidebar userRole="patient" />
      
      <div className="lg:ml-64 pt-20 sm:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your account information</p>
          </div>

          <div className="card">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-primary-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{formData.name}</h2>
                  <p className="text-primary-600 font-medium text-sm sm:text-base">Patient</p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center space-x-2 text-sm w-full sm:w-auto justify-center"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2 w-full sm:w-auto justify-center">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2 text-sm flex-1 sm:flex-none justify-center"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2 text-sm flex-1 sm:flex-none justify-center"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>{formData.name}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="input-field"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.age} years</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="input-field"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="text-gray-900">{formData.gender}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field"
                    rows={3}
                  />
                ) : (
                  <div className="flex items-start space-x-2 text-gray-900">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{formData.address}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                {isEditing ? (
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="input-field"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Droplet className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      {formData.bloodGroup}
                    </span>
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

export default PatientProfile;
