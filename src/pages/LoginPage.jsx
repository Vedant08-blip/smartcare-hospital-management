import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Stethoscope, Shield, Heart } from "lucide-react";

/* -------------------- ROLE CONFIG -------------------- */

const ROLES = [
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    description: "Manage hospital operations and users",
    theme: {
      bg: "bg-red-50",
      border: "border-red-300",
      text: "text-red-700",
      iconBg: "bg-red-100",
    },
  },
  {
    id: "doctor",
    name: "Doctor",
    icon: Stethoscope,
    description: "View appointments and patient records",
    theme: {
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-700",
      iconBg: "bg-blue-100",
    },
  },
  {
    id: "patient",
    name: "Patient",
    icon: Heart,
    description: "Book appointments and manage health",
    theme: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
      iconBg: "bg-green-100",
    },
  },
];

/* -------------------- COMPONENT -------------------- */

const LoginPage = () => {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const selectedRole = ROLES.find((r) => r.id === role);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role || !form.email || !form.password) return;

    // Frontend-only navigation
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-medical-light">
      <Navbar />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* -------- Header -------- */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue to SmartCare
            </p>
          </header>

          {/* -------- Role Selection -------- */}
          <section className="grid gap-6 md:grid-cols-3 mb-10">
            {ROLES.map(({ id, name, icon: Icon, description, theme }) => {
              const active = role === id;

              return (
                <button
                  key={id}
                  onClick={() => setRole(id)}
                  aria-pressed={active}
                  className={`card text-center transition-all duration-300 
                    ${active ? `${theme.bg} ${theme.border} border-2` : "hover:border-primary-300"}
                  `}
                >
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
                      ${active ? theme.iconBg : "bg-gray-100"}
                    `}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        active ? theme.text : "text-gray-500"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </button>
              );
            })}
          </section>

          {/* -------- Login Form -------- */}
          {selectedRole && (
            <section className="card max-w-md mx-auto">
              <form
                onSubmit={handleLogin}
                className="space-y-6"
                aria-label="Login Form"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    Remember me
                  </label>
                  <span className="text-primary-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-lg"
                >
                  Sign in as {selectedRole.name}
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