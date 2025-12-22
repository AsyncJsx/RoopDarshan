import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";

function Delete_Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("Admin-Token");

  const deleteCategory = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password,
        },
      });

      navigate(-1);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Delete failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
          Confirm Delete
        </h2>

        {/* Password Input with Eye Icon */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              // Eye Off
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.033.156-2.03.448-2.97M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8"
                />
              </svg>
            ) : (
              // Eye
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <button
          onClick={deleteCategory}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 bg-gray-300 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Delete_Category;
