import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Heart,
  Shield,
  Clock,
  Users,
  Award,
  Github,
  Linkedin,
  Mail,
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

/* -------------------- ANIMATION VARIANTS -------------------- */

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: (i) => ({
    scale: 1,
    transition: {
      delay: i * 0.15 + 0.2,
      duration: 0.4,
      type: "spring",
      stiffness: 200,
    },
  }),
};

/* -------------------- COMPONENT -------------------- */

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main>
      {/* ---------------- Hero Section ---------------- */}
      <header className="bg-gradient-to-br from-primary-50 via-white to-[#e3f2fd] py-24 px-4">
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
            {STATS.map(({ id, icon: Icon, value, label }, i) => (
              <motion.div
                key={id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={statVariants}
                className="text-center"
              >
                <motion.div
                  custom={i}
                  variants={iconVariants}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100"
                >
                  <Icon className="h-8 w-8 text-primary-600" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                  className="text-3xl font-bold"
                >
                  {value}
                </motion.p>
                <p className="text-gray-600">{label}</p>
              </motion.div>
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

    {/* Logo */}
    <div className="flex items-center justify-center gap-2 mb-4">
      <Stethoscope className="h-6 w-6 text-primary-400" />
      <span className="text-xl font-bold">SmartCare</span>
    </div>

    <p className="text-gray-400 mb-4">
      Hospital Management System
    </p>

    {/* Social Icons */}
    <div className="flex justify-center gap-6 mb-6">
      <a
        href="#"
        className="text-gray-400 hover:text-primary-400 transition-transform hover:scale-110"
      >
        <Github className="h-6 w-6" />
      </a>

      <a
        href="#"
        className="text-gray-400 hover:text-primary-400 transition-transform hover:scale-110"
      >
        <Linkedin className="h-6 w-6" />
      </a>

      <a
        href="#"
        className="text-gray-400 hover:text-primary-400 transition-transform hover:scale-110"
      >
        <Mail className="h-6 w-6" />
      </a>
    </div>

    {/* Developer Credit */}
    <p className="text-sm text-gray-500">
      Managed & Developed by{" "}
      <span className="text-primary-400 font-medium">
        Vedant Trivedi
      </span>
    </p>

    <p className="text-xs text-gray-600 mt-2">
      © 2026 SmartCare Hospital. All rights reserved.
    </p>

  </div>
</footer>
    </div>
  );
};

export default LandingPage;
 