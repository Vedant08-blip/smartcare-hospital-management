/* The above code is a React component called `BookAppointment` that allows a patient to book an
appointment with a doctor. Here is a summary of what the code does: */
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import { doctors } from "../../data/dummyData";
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
  const [appointment, setAppointment] = useState({
    doctor: null,
    date: "",
    time: "",
    reason: "",
  });

  const [showModal, setShowModal] = useState(false);

  const isFormComplete =
    appointment.doctor &&
    appointment.date &&
    appointment.time &&
    appointment.reason;

  const resetForm = () => {
    setAppointment({
      doctor: null,
      date: "",
      time: "",
      reason: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) return;
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated userRole="patient" />
      <Sidebar userRole="patient" />

      <main className="ml-64 pt-20 px-8 pb-10">
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

                <div className="grid sm:grid-cols-2 gap-4">
                  {doctors.map((doctor) => {
                    const active =
                      appointment.doctor?.id === doctor.id;

                    return (
                      <button
                        key={doctor.id}
                        onClick={() =>
                          setAppointment((prev) => ({
                            ...prev,
                            doctor,
                          }))
                        }
                        aria-pressed={active}
                        className={`border-2 rounded-lg p-4 text-left transition-all
                          ${
                            active
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-200 hover:border-primary-300"
                          }
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
                        onChange={(e) =>
                          setAppointment((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        className="input-field"
                        required
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="label">Select Time</label>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() =>
                              setAppointment((prev) => ({
                                ...prev,
                                time,
                              }))
                            }
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
                        onChange={(e) =>
                          setAppointment((prev) => ({
                            ...prev,
                            reason: e.target.value,
                          }))
                        }
                        className="input-field"
                        placeholder="Describe your symptoms..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormComplete}
                      className="btn-primary w-full py-3 text-lg disabled:opacity-60"
                    >
                      Book Appointment
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
            onClick={() => {
              setShowModal(false);
              resetForm();
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