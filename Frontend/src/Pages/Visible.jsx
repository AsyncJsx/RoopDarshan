import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../config/axios";

function Visible() {

    const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("Admin-Token");


    
  useEffect(() => {
    axios.post(
        `/category/visibility/${id}`,
        {},   // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    .then((res) => {
      navigate(-1);
    })
    .catch((err) => {
        navigate(-1);
      console.error(err);
    });
  }, []);
  
  return (
    <div>Visible</div>
  )
}

export default Visible