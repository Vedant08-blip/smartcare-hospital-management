import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Stethoscope,
  Heart,
  Shield,
  Clock,
  Users,
  Award,
} from "lucide-react";

/* -------------------- DATA -------------------- */

const SERVICES = [
  {
    id: 1,
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Highly qualified doctors with years of experience",
  },
  {
    id: 2,
    icon: Heart,
    title: "24/7 Patient Care",
    description: "Round-the-clock medical services for emergencies",
  },
  {
    id: 3,
    icon: Shield,
    title: "Advanced Technology",
    description: "Modern equipment and digital healthcare solutions",
  },
  {
    id: 4,
    icon: Clock,
    title: "Quick Appointments",
    description: "Fast and easy online appointment booking",
  },
];

const STATS = [
  { id: 1, icon: Users, value: "50+", label: "Expert Doctors" },
  { id: 2, icon: Heart, value: "10K+", label: "Happy Patients" },
  { id: 3, icon: Award, value: "15+", label: "Years Experience" },
  { id: 4, icon: Stethoscope, value: "20+", label: "Specializations" },
];

/* -------------------- COMPONENT -------------------- */

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main>
        {/* ---------------- Hero Section ---------------- */}
        <header className="bg-gradient-to-br from-primary-50 via-white to-medical-light py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              SmartCare Hospital
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Your trusted healthcare partner delivering advanced treatment
              with compassion and care.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                aria-label="Get Started"
                className="btn-primary px-8 py-3 text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/services"
                aria-label="View Services"
                className="btn-secondary px-8 py-3 text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </header>

        {/* ---------------- Stats Section ---------------- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10">
            {STATS.map(({ id, icon: Icon, value, label }) => (
              <div key={id} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Services Section ---------------- */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Our Healthcare Services
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
              We provide comprehensive medical services designed to meet every
              patient’s needs.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map(({ id, icon: Icon, title, description }) => (
                <div
                  key={id}
                  className="card text-center transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA Section ---------------- */}
        <section className="bg-primary-600 py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-4">
              Take Control of Your Health Today
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Book appointments, consult experts, and manage your healthcare
              digitally.
            </p>
            <Link
              to="/login"
              className="inline-block rounded-lg bg-white px-8 py-3 font-medium text-primary-600 hover:bg-gray-100 transition"
            >
              Book Appointment
            </Link>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stethoscope className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold">SmartCare</span>
          </div>
          <p className="text-gray-400 mb-2">
            Hospital Management System
          </p>
          <p className="text-sm text-gray-500">
            © 2026 SmartCare Hospital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;