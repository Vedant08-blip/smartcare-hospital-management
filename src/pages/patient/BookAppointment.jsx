import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import { authAPI, appointmentsAPI, doctorsAPI } from "../../services/api";
import { useToast } from "../../components/Toast";
import { LoadingSpinner } from "../../components/Loading";
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  Check,
} from "lucide-react";

/* -------------------- CONSTANTS -------------------- */

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const today = new Date().toISOString().split("T")[0];

/* -------------------- COMPONENT -------------------- */

const BookAppointment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [doctorsError, setDoctorsError] = useState(null);
  
  const [appointment, setAppointment] = useState({
    doctor: null,
    date: "",
    time: "",
    reason: "",
  });
  
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorsAPI.getAll();
        setDoctors(data || []);
        setDoctorsError(null);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setDoctorsError('Failed to load doctors. Please refresh the page.');
        toast.error('Failed to load doctors. Please try again.');
      } finally {
        setLoadingDoctors(false);
      }
    };
    
    fetchDoctors();
  }, [toast]);

  const isFormComplete =
    appointment.doctor &&
    appointment.date &&
    appointment.time &&
    appointment.reason;

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!appointment.doctor) {
      newErrors.doctor = 'Please select a doctor';
    }
    if (!appointment.date) {
      newErrors.date = 'Please select a date';
    } else if (appointment.date < today) {
      newErrors.date = 'Cannot select a past date';
    }
    if (!appointment.time) {
      newErrors.time = 'Please select a time slot';
    }
    if (!appointment.reason) {
      newErrors.reason = 'Please provide a reason for your visit';
    } else if (appointment.reason.length < 10) {
      newErrors.reason = 'Please provide more details (at least 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setAppointment({
      doctor: null,
      date: "",
      time: "",
      reason: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Get current user
      const user = authAPI.getCurrentUser();
      if (!user) {
        toast.error('Please login first');
        navigate('/login?role=patient');
        return;
      }

      // Prepare appointment data
      const appointmentData = {
        patientId: user.id,
        doctorId: appointment.doctor.id,
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
      };

      // Call API to create appointment
      await appointmentsAPI.create(appointmentData);
      
      // Show success modal
      setShowModal(true);
      toast.success('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setShowModal(false);
    resetForm();
    // Navigate to dashboard to see the new appointment
    navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated userRole="patient" />
      <Sidebar userRole="patient" />

      <main className="lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* -------- Header -------- */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
            <p className="text-gray-600">
              Choose a doctor and schedule your visit
            </p>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* -------- Doctor Selection -------- */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">
                  Select Doctor
                </h2>

                {loadingDoctors ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner size="lg" />
                    <span className="ml-3 text-gray-600">Loading doctors...</span>
                  </div>
                ) : doctorsError ? (
                  <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{doctorsError}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="btn-primary"
                    >
                      Refresh Page
                    </button>
                  </div>
                ) : doctors.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No doctors available at the moment.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {doctors.map((doctor) => {
                      const active = appointment.doctor?.id === doctor.id;

                      return (
                        <button
                          key={doctor.id}
                          onClick={() => {
                            setAppointment((prev) => ({
                              ...prev,
                              doctor,
                            }));
                            // Clear doctor error
                            if (errors.doctor) {
                              setErrors(prev => ({ ...prev, doctor: '' }));
                            }
                          }}
                          aria-pressed={active}
                          className={`border-2 rounded-lg p-4 text-left transition-all
                            ${
                              active
                                ? "border-primary-500 bg-primary-50"
                                : "border-gray-200 hover:border-primary-300"
                            }
                            ${errors.doctor ? 'border-red-300' : ''}
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />

                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <h3 className="font-semibold">
                                  {doctor.name}
                                </h3>
                                {active && (
                                  <Check className="h-5 w-5 text-primary-600" />
                                )}
                              </div>

                              <div className="flex items-center gap-2 text-sm text-primary-600 mb-1">
                                <Stethoscope className="h-4 w-4" />
                                {doctor.specialization}
                              </div>

                              <p className="text-xs text-gray-500">
                                {doctor.experience} experience
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.doctor && (
                  <p className="text-red-500 text-sm mt-2">{errors.doctor}</p>
                )}
              </div>

              {/* -------- Appointment Form -------- */}
              {appointment.doctor && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">
                    Appointment Details
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Doctor Preview */}
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <img
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium">
                          {appointment.doctor.name}
                        </p>
                        <p className="text-sm text-primary-600">
                          {appointment.doctor.specialization}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="label">Select Date</label>
                      <input
                        type="date"
                        min={today}
                        value={appointment.date}
                        onChange={(e) => {
                          setAppointment((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }));
                          // Clear date error
                          if (errors.date) {
                            setErrors(prev => ({ ...prev, date: '' }));
                          }
                        }}
                        className={`input-field ${errors.date ? 'border-red-500 focus:border-red-500' : ''}`}
                        required
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                      )}
                    </div>

                    {/* Time */}
                    <div>
                      <label className="label">Select Time</label>
                      {errors.time && (
                        <p className="text-red-500 text-xs mb-2">{errors.time}</p>
                      )}
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => {
                              setAppointment((prev) => ({
                                ...prev,
                                time,
                              }));
                              // Clear time error
                              if (errors.time) {
                                setErrors(prev => ({ ...prev, time: '' }));
                              }
                            }}
                            className={`py-2 rounded-lg text-sm font-medium transition
                              ${
                                appointment.time === time
                                  ? "bg-primary-600 text-white"
                                  : "bg-gray-100 hover:bg-gray-200"
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="label">Reason for Visit</label>
                      <textarea
                        rows={4}
                        value={appointment.reason}
                        onChange={(e) => {
                          setAppointment((prev) => ({
                            ...prev,
                            reason: e.target.value,
                          }));
                          // Clear reason error
                          if (errors.reason) {
                            setErrors(prev => ({ ...prev, reason: '' }));
                          }
                        }}
                        className={`input-field ${errors.reason ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Describe your symptoms or reason for visit..."
                        required
                      />
                      {errors.reason && (
                        <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormComplete || isLoading}
                      className="btn-primary w-full py-3 text-lg disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          Booking...
                        </>
                      ) : (
                        'Book Appointment'
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* -------- Summary -------- */}
            {appointment.doctor && (
              <aside className="card sticky top-24 h-fit">
                <h3 className="text-lg font-semibold mb-4">
                  Appointment Summary
                </h3>

                <div className="space-y-4 text-sm">
                  <SummaryItem
                    icon={User}
                    label="Doctor"
                    value={appointment.doctor.name}
                  />
                  {appointment.date && (
                    <SummaryItem
                      icon={Calendar}
                      label="Date"
                      value={new Date(
                        appointment.date
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    />
                  )}
                  {appointment.time && (
                    <SummaryItem
                      icon={Clock}
                      label="Time"
                      value={appointment.time}
                    />
                  )}
                </div>
              </aside>
            )}
          </section>
        </div>
      </main>

      {/* -------- Success Modal -------- */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Appointment Confirmed"
      >
        <div className="text-center py-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          <p className="mb-2">
            Appointment booked with{" "}
            <strong>{appointment.doctor?.name}</strong>
          </p>

          <p className="text-sm text-gray-600 mb-6">
            {appointment.date} at {appointment.time}
          </p>

          <button
            onClick={handleDone}
            className="btn-primary"
            disabled={isLoading}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

/* -------------------- REUSABLE SUMMARY ITEM -------------------- */

const SummaryItem = ({ icon: Icon, label, value }) => (
  <div className="flex gap-3">
    <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default BookAppointment;

