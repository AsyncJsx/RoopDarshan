import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../config/axios';

function Delete_Product() {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("Admin-Token");


  useEffect(() => {
    const deleteProduct = async () => {
      try {
        axios.delete(`/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(()=>{navigate('/admin/dashboard')}).catch((err)=>{
          console.log(err);
          navigate(-1)
        });
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    deleteProduct();
  }, [id, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">Deleting product...</p>
        </div>
      ) : (
        <p className="text-green-600 font-semibold text-lg">Product deleted successfully!</p>
      )}
    </div>
  );
}

export default Delete_Product;
