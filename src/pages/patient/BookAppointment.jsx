import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import { doctors } from '../../data/dummyData';
import { Stethoscope, Calendar, Clock, User, Check } from 'lucide-react';

const BookAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (selectedDoctor && selectedDate && selectedTime && reason) {
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userRole="patient" />
      <Sidebar userRole="patient" />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
            <p className="text-gray-600">Select a doctor and schedule your appointment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Doctor Selection */}
            <div className="lg:col-span-2">
              <div className="card mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Doctor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`border-2 rounded-lg p-4 text-left transition-all hover:shadow-md ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                            {selectedDoctor?.id === doctor.id && (
                              <Check className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Stethoscope className="h-4 w-4 text-primary-600" />
                            <span className="text-sm text-primary-600 font-medium">
                              {doctor.specialization}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Appointment Form */}
              {selectedDoctor && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Details</h2>
                  <form onSubmit={handleBookAppointment} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Doctor
                      </label>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={selectedDoctor.image}
                          alt={selectedDoctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{selectedDoctor.name}</p>
                          <p className="text-sm text-primary-600">{selectedDoctor.specialization}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Time
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              selectedTime === time
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Visit
                      </label>
                      <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        className="input-field"
                        placeholder="Describe your symptoms or reason for appointment..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary py-3 text-lg"
                      disabled={!selectedDate || !selectedTime || !reason}
                    >
                      Book Appointment
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Appointment Summary */}
            {selectedDoctor && (
              <div className="lg:col-span-1">
                <div className="card sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Doctor</p>
                        <p className="font-medium text-gray-900">{selectedDoctor.name}</p>
                      </div>
                    </div>
                    {selectedDate && (
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Time</p>
                          <p className="font-medium text-gray-900">{selectedTime}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Appointment Booked Successfully!"
      >
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-gray-700 mb-2">
            Your appointment with <strong>{selectedDoctor?.name}</strong> has been booked successfully.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Date: {selectedDate && new Date(selectedDate).toLocaleDateString()} at {selectedTime}
          </p>
          <button
            onClick={() => {
              setShowModal(false);
              setSelectedDoctor(null);
              setSelectedDate('');
              setSelectedTime('');
              setReason('');
            }}
            className="btn-primary"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookAppointment;
