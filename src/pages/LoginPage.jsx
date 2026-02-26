import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";
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
    demo: "admin@smartcare.com",
  },
  {
    id: "doctor",
    name: "Doctor",
    description: "View appointments and patient records",
    icon: Stethoscope,
    color: "blue",
    demo: "doctor@smartcare.com",
  },
  {
    id: "patient",
    name: "Patient",
    description: "Book appointments and manage health",
    icon: Heart,
    color: "green",
    demo: "patient@email.com",
  },
];

/* -------------------- COMPONENT -------------------- */

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get("role");

  const [role, setRole] = useState(preselectedRole || null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) return setError("Please select a role");
    if (!form.email || !form.password)
      return setError("All fields are required");

    setLoading(true);
    setError("");

    try {
      const data = await authAPI.login(form.email, form.password, role);
      
      if (data.token) {
        navigate(`/${role}/dashboard`);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setForm({ email: selectedRole.demo, password: "123456" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-medical-light">
      <Navbar />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {showRoleSelection ? "Welcome Back" : `${selectedRole?.name} Login`}
            </h1>
            <p className="text-gray-600 mt-2">
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
            <section className="grid gap-6 md:grid-cols-3 mb-10">
              {ROLES.map(({ id, name, description, icon: Icon, color }) => {
                const active = role === id;
                return (
                  <button
                    key={id}
                    onClick={() => setRole(id)}
                    className={`card text-center transition-all duration-300 
                      ${active ? `border-2 border-${color}-400 bg-${color}-50` : "hover:border-primary-300"}
                    `}
                  >
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
                        ${active ? `bg-${color}-100` : "bg-gray-100"}
                      `}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          active ? `text-${color}-600` : "text-gray-500"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
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

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
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
                    className="input-field"
                    placeholder="name@example.com"
                  />
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
                    className="input-field pr-10"
                    placeholder="••••••••"
                  />
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