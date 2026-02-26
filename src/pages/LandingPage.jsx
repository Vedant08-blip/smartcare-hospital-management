import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

/* -------------------- COUNTER COMPONENT -------------------- */
const Counter = ({ value, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    mass: 1,
  });
  
  const [displayValue, setDisplayValue] = useState(0);
  
  // Parse the numeric value from string like "50+", "10K+", etc.
  const getNumericValue = (val) => {
    // Handle K values - "10K" means 10 (display as K), not 10000
    const upperVal = val.toUpperCase();
    if (upperVal.includes("K")) {
      const numStr = val.replace(/[^0-9]/g, "");
      return parseInt(numStr, 10) || 0;
    }
    const numStr = val.replace(/[^0-9]/g, "");
    return parseInt(numStr, 10) || 0;
  };
  
  const targetValue = getNumericValue(value);
  const hasPlus = value.includes("+");
  const hasK = value.toLowerCase().includes("k");
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(targetValue);
    }
  }, [isInView, targetValue, motionValue]);
  
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (hasK) {
        // For K values, show the number directly with K suffix (10K, not 0.01K)
        setDisplayValue(Math.round(latest));
      } else {
        setDisplayValue(Math.floor(latest));
      }
    });
    return () => unsubscribe();
  }, [springValue, hasK]);

  const getDisplayText = () => {
    if (hasK) {
      return `${displayValue}K${hasPlus ? "+" : ""}`;
    }
    return `${prefix}${displayValue}${suffix}`;
  };

  return (
    <motion.span
      ref={ref}
      className="text-3xl font-bold text-gray-900 inline-block"
    >
      {getDisplayText()}
    </motion.span>
  );
};


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

// Hero section variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Button hover animation
const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Stats section variants
const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15 + 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 200,
    },
  }),
};

// Services section variants
const servicesContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  },
};

// CTA section variants
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Floating background animation
const floatVariants = {
  animate: {
    y: [-20, 20, -20],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* -------------------- COMPONENT -------------------- */

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      <main>
        {/* ---------------- Hero Section ---------------- */}
        <header className="relative bg-gradient-to-br from-primary-50 via-white to-[#e3f2fd] py-24 px-4 overflow-hidden">
          {/* Floating decorative elements */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-30 blur-xl"
          />
          <motion.div
            variants={floatVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
            className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-xl"
          />
          <motion.div
            variants={floatVariants}
            animate="animate"
            style={{ animationDelay: "4s" }}
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-200 rounded-full opacity-30 blur-xl"
          />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={heroItemVariants}
                className="text-primary-600 font-semibold text-lg mb-4 tracking-wider uppercase"
              >
                Welcome to SmartCare
              </motion.p>
              <motion.h1
                variants={heroItemVariants}
                className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary-600 via-blue-600 to-primary-600 bg-clip-text text-transparent"
              >
                SmartCare Hospital
              </motion.h1>
              <motion.p
                variants={heroItemVariants}
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Your trusted healthcare partner delivering advanced treatment
                with compassion and care.
              </motion.p>

              <motion.div
                variants={heroItemVariants}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    aria-label="Get Started"
                    className="btn-primary px-8 py-3 text-lg inline-block"
                  >
                    Get Started
                  </Link>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/services"
                    aria-label="View Services"
                    className="btn-secondary px-8 py-3 text-lg inline-block"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
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
                whileHover={{ scale: 1.05 }}
                className="text-center cursor-pointer"
              >
                <motion.div
                  custom={i}
                  variants={iconVariants}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 shadow-lg"
                >
                  <Icon className="h-8 w-8 text-primary-600" />
                </motion.div>
                <Counter value={value} />
                <p className="text-gray-600">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- Services Section ---------------- */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl font-bold text-center mb-4">
                Our Healthcare Services
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive medical services designed to meet every
                patient's needs.
              </p>
            </motion.div>

            <motion.div
              variants={servicesContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {SERVICES.map(({ id, icon: Icon, title, description }) => (
                <motion.div
                  key={id}
                  variants={serviceCardVariants}
                  whileHover="hover"
                  className="card text-center cursor-pointer bg-white"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 shadow-md"
                  >
                    <Icon className="h-8 w-8 text-primary-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------------- Features Section ---------------- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                Why Choose SmartCare?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience healthcare excellence with our patient-centered approach
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Care",
                  desc: "Our team of specialists provides world-class medical care",
                  color: "bg-blue-500",
                },
                {
                  title: "Modern Facilities",
                  desc: "State-of-the-art equipment and comfortable environment",
                  color: "bg-green-500",
                },
                {
                  title: "24/7 Support",
                  desc: "Round-the-clock medical assistance for emergencies",
                  color: "bg-purple-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="card text-center cursor-pointer"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`mx-auto mb-4 w-16 h-16 rounded-full ${item.color} flex items-center justify-center`}
                  >
                    <Heart className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA Section ---------------- */}
        <section className="bg-gradient-to-r from-primary-600 to-blue-600 py-20 overflow-hidden relative">

          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 left-10 text-white"
          >
            <Shield className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-10 right-10 text-white"
          >
            <Heart className="w-20 h-20" />
          </motion.div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Animated gradient overlay */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-primary-600/80 via-blue-600/80 to-primary-600/80 bg-[length:200%_100%]"
          />

          <motion.div
            variants={ctaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center px-4 relative z-10"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Take Control of Your Health Today
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Book appointments, consult experts, and manage your healthcare
              digitally.
            </p>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="inline-block"
            >
              <Link
                to="/login?role=patient"
                className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 hover:bg-gray-100 transition shadow-lg"
              >
                Book Appointment
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start gap-2 mb-4"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Stethoscope className="h-6 w-6 text-primary-400" />
                </motion.div>
                <span className="text-xl font-bold">SmartCare</span>
              </motion.div>
              <p className="text-gray-400 text-sm">
                Hospital Management System providing quality healthcare digitally.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/services" className="block text-gray-400 hover:text-primary-400 text-sm transition">
                  Our Services
                </Link>
                <Link to="/login" className="block text-gray-400 hover:text-primary-400 text-sm transition">
                  Login
                </Link>
                <Link to="/login?role=patient" className="block text-gray-400 hover:text-primary-400 text-sm transition">
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Register as Doctor */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4">For Doctors</h4>
              <p className="text-gray-400 text-sm mb-4">
                Join our network of medical professionals
              </p>
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/register-doctor"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition"
                >
                  Register as Doctor
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Social Icons and Copyright */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="flex justify-center gap-6"
              >
                {[
                  { icon: Github, href: "https://github.com/Vedant08-blip" },
                  { icon: Linkedin, href: "https://www.linkedin.com/feed/?trk=sem-ga_campid.14650114788_asid.150089839322_crid.656569072777_kw.www%20linkedin_d.c_tid.kwd-2246447582_n.g_mt.e_geo.9301765" },
                  { icon: Mail, href: "mailto:vedanttrivedi87@gmail.com" },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Developer Credit */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-gray-500"
              >
                Managed & Developed by{" "}
                <span className="text-primary-400 font-medium">Vedant Trivedi</span>
              </motion.p>

              <p className="text-xs text-gray-600">
                © 2026 SmartCare Hospital. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

