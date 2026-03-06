import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";
import { useToast } from "../components/Toast";
import {
  Stethoscope,
  Shield,
  Heart,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
} from "lucide-react";

/* -------------------- ROLE CONFIG -------------------- */

const ROLES = [
  {
    id: "admin",
    name: "Admin",
    description: "Manage hospital operations and users",
    icon: Shield,
    color: "red",
    bgClass: "bg-red-50",
    borderClass: "border-red-400",
    iconBgClass: "bg-red-100",
    iconTextClass: "text-red-600",
    scaleClass: "scale-110",
    demo: "admin@smartcare.com",
  },
  {
    id: "doctor",
    name: "Doctor",
    description: "View appointments and patient records",
    icon: Stethoscope,
    color: "blue",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-400",
    iconBgClass: "bg-blue-100",
    iconTextClass: "text-blue-600",
    scaleClass: "scale-110",
    demo: "doctor@smartcare.com",
  },
  {
    id: "patient",
    name: "Patient",
    description: "Book appointments and manage health",
    icon: Heart,
    color: "green",
    bgClass: "bg-green-50",
    borderClass: "border-green-400",
    iconBgClass: "bg-green-100",
    iconTextClass: "text-green-600",
    scaleClass: "scale-110",
    demo: "patient@email.com",
  },
];

/* -------------------- COMPONENT -------------------- */

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get("role");
  const toast = useToast();

  const [role, setRole] = useState(preselectedRole || null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Auto-select role if provided in URL
  useEffect(() => {
    if (preselectedRole && ROLES.find((r) => r.id === preselectedRole)) {
      setRole(preselectedRole);
    }
  }, [preselectedRole]);

  const selectedRole = ROLES.find((r) => r.id === role);

  // Check if we should show role selection (no preselected role)
  const showRoleSelection = !preselectedRole;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!role) {
      newErrors.role = 'Please select a role';
    }
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const data = await authAPI.login(form.email, form.password, role);
      
      if (data.token) {
        toast.success('Login successful! Welcome back.');
        navigate(`/${role}/dashboard`);
      } else {
        setErrors({ general: data.message || 'Login failed' });
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Server error. Please try again.';
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

const fillDemo = () => {
    const passwords = {
      admin: 'SmartAdmin2024!',
      doctor: 'SmartDoc2024!',
      patient: 'SmartPatient2024!'
    };
    setForm({ email: selectedRole.demo, password: passwords[role] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-medical-light">
      <Navbar />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              {showRoleSelection ? "Welcome Back" : `${selectedRole?.name} Login`}
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {showRoleSelection 
                ? "Secure login to SmartCare Hospital System" 
                : "Sign in to access your dashboard"}
            </p>
          </header>

          {/* Back Button (when role is preselected) */}
          {showRoleSelection === false && (
            <div className="mb-6">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Choose different role</span>
              </button>
            </div>
          )}

          {/* Role Selection */}
          {showRoleSelection && (
            <section className="grid gap-4 sm:grid-cols-3 mb-8">
              {ROLES.map(({ id, name, description, icon: Icon, bgClass, borderClass, iconBgClass, iconTextClass, scaleClass }, index) => {
                const active = role === id;
                return (
                  <button
                    key={id}
                    onClick={() => setRole(id)}
                    className={`card text-center transition-all duration-300 animate-fadeInUp hover:scale-105 hover:shadow-xl
                      ${active ? `${borderClass} bg-opacity-50 ${bgClass}` : "hover:border-primary-300 border-2 border-transparent"}
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`mx-auto mb-3 sm:mb-4 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full transition-transform duration-300
                        ${active ? `${iconBgClass} ${scaleClass}` : "bg-gray-100"}
                      `}
                    >
                      <Icon
                        className={`h-6 w-6 sm:h-8 sm:w-8 transition-colors duration-300 ${
                          active ? iconTextClass : "text-gray-500"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg">{name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
                  </button>
                );
              })}
            </section>
          )}

          {/* Login Form */}
          {selectedRole && (
            <section className="card max-w-md mx-auto animate-fadeIn">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-2">
                  <p className="text-sm text-gray-600">
                    Logging in as{" "}
                    <span className="font-semibold text-primary-600">
                      {selectedRole.name}
                    </span>
                  </p>
                </div>

                {errors.general && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {errors.general}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`input-field pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="text-primary-600 hover:underline"
                  >
                    Use demo credentials
                  </button>
                  <span className="text-primary-600 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Signing in...
                    </>
                  ) : (
                    `Sign in as ${selectedRole.name}`
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Don’t have access?{" "}
                <span className="text-primary-600 font-medium cursor-pointer hover:underline">
                  Contact Admin
                </span>
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;