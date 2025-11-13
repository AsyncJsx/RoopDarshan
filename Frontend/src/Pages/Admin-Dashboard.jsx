import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Admin_Categories from '../Components/Admin-Category'
import { Link } from 'react-router-dom'
import axios from '../config/axios';


function AdminDashboard() {

  const [categorys, setCategorys] = useState([]);

  useEffect(()=>{
    axios.get('/category/all').then((res)=>{
     setCategorys(res.data.categories);
    }).catch((err)=>console.log(err))
  },[]);
  
  return (
    <div className='min-h-screen w-full bg-white'>
      <Navbar/>
      <div className="Products w-screen md:px-8 mt-36">
          <h3
            
            className="text-center productpage-text1 text-4xl font-bold mb-6 text-gray-800"
          >
            Explore Collections
          </h3>

          {/* Search Bar */}
          <div  className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search category..."
              className="w-full max-w-md px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            />
          </div>
          <div className="w-full flex justify-end items-center gap-6 px-6 py-3 text-gray-700">
  <Link to={'/product/add'} className="flex items-center gap-2 cursor-pointer hover:text-black transition">
    <i className="ri-add-circle-line text-lg"></i>
    <span>Add Product</span>
  </Link>
  <Link to={'/category/add'} className="flex items-center gap-2 cursor-pointer hover:text-black transition">
    <i className="ri-function-add-line text-lg"></i>
    <span className=''>Add Category</span>
  </Link>
</div>

          {/* Categories Section */}
          <div>
          <div >
           {categorys.map((category,index)=>{
            return <Admin_Categories category= {category} key={index}/>
           })}
          </div>
          </div>
        </div>

    </div>
  )
}

export default AdminDashboard