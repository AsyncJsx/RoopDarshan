import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

function AdminAuth({ children }) {
  const { admin, setAdmin } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const token = localStorage.getItem("Admin-Token");
  useEffect(() => {
    
    // If no token → redirect immediately
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // If admin already exists in context → skip API check
    if (admin) {
      setLoading(false);
      return;
    }

    // Verify token with backend
    const verifyAdmin = async () => {
      try {
        const res = await axiosInstance.get("/admin/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(res.data.admin);
      } catch (err) {
        navigate('/admin/login')
        console.error("Auth verification failed:", err);
        
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [token]); // ✅ only depends on token

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}

export default AdminAuth;
