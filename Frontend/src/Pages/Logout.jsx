import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("Admin-Token");

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.get("/admin/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Always clear token & redirect
        localStorage.removeItem("Admin-Token");
        setLoading(false);
        navigate("/");
      }
    };

    logoutUser();
  }, [navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Logging you out...
          </p>
        </div>
      )}
    </div>
  );
}

export default Logout;
