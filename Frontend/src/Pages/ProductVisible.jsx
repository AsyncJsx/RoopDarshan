import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../config/axios";

function ProductVisible() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("Admin-Token");

  useEffect(() => {
    axios.patch(
      `/product/${id}/visibility`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      navigate(-1)
    })
    .catch((err) => {
      console.error(err);
      navigate(-1)
    });
  }, []);

  return (
    <div>ProductVisible</div>
  )
}

export default ProductVisible