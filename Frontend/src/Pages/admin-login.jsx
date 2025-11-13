import React, { useContext, useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import axiosInstance from "../config/axios"; // ✅ Corrected import name
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { admin, setAdmin } = useContext(AdminContext); // admin context

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axiosInstance.post("/admin/login", { email, password });
      localStorage.setItem("Admin-Token",res.data.token);
      setAdmin(res.data.admin)
      setError("");
      navigate('/admin/dashboard')
      // You can navigate or store token here if needed
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#151515]">
      <div className="bg-[#dad6d6] p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full border border-gray-600 rounded-xl p-2 pl-10 focus:ring-2 focus:ring-gray-400 outline-none"
              />
              <User className="absolute left-3 top-2.5 text-gray-500" size={18} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-600 rounded-xl p-2 pl-10 pr-10 focus:ring-2 focus:ring-gray-400 outline-none"
              />
              <Lock className="absolute left-3 top-2.5 text-gray-600" size={18} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 font-semibold transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
