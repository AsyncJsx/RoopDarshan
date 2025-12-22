import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import axios from '../config/axios'
import AdminCategoryCard from '../Components/Admin-Category-Card'

function AdminDashboard() {
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    axios
      .get('/category/all')
      .then((res) => {
        setCategories(res?.data?.categories || [])
      })
      .catch((err) => {
        console.log(err)
        setCategories([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      category.eng_name?.toLowerCase().includes(searchLower) ||
      category.mar_name?.toLowerCase().includes(searchLower)
    )
  })

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='min-h-screen w-full bg-white'>
      <Navbar />

      <div className="Products w-screen md:px-8 mt-36">
        <h3 className="text-center productpage-text1 text-4xl font-bold mb-6 text-gray-800">
          Explore Collections
        </h3>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
          />
        </div>

        <div className="w-full flex justify-end items-center gap-6 md:px-20 px-4 py-3 text-gray-700">
          <Link to="/product/add" className="flex items-center gap-2 hover:text-black transition">
            <i className="ri-add-circle-line text-lg"></i>
            <span>Add Product</span>
          </Link>

          <Link to="/category/add" className="flex items-center gap-2 hover:text-black transition">
            <i className="ri-function-add-line text-lg"></i>
            <span>Add Category</span>
          </Link>

          <Link
            to="/admin/logout"
            className="flex items-center gap-2 hover:text-white transition hover:bg-red-700 hover:scale-105 bg-red-600 p-2 text-white rounded-lg"
          >
            <i className="ri-logout-box-line"></i>
            <span>Logout</span>
          </Link>
        </div>

        {/* Categories Section */}
        <div className="w-full flex justify-center my-10">
          {loading ? (
            // 🔄 Loading Spinner
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading categories...
              </p>
              <img src="/loading.gif" className=' h-[40vh] w-auto' alt="" />
            </div>
          ) : (
            <div className="w-full flex flex-wrap justify-center md:gap-6 gap-3">
              {filteredCategories.map((category, index) => (
                <AdminCategoryCard category={category} key={index} />
              ))}

              {searchQuery && filteredCategories.length === 0 && (
                <div className="text-center py-8 w-full">
                  <p className="text-gray-500 text-lg">
                    No categories found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
