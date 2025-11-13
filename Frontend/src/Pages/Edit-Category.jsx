import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from "lucide-react"
import axios from '../config/axios'

function Edit_Category() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('Admin-Token')

  const [category, setCategory] = useState({
    eng_name: '',
    mar_name: '',
    eng_description: '',
    mar_description: ''
  })

  const [loading, setLoading] = useState(false)

  // Fetch existing category data
  useEffect(() => {
    axios
      .get(`/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategory(res.data.category)
      })
      .catch((err) => {
        console.error("Error fetching category:", err)
      })
  }, [id, token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.put(
        `/category/${id}`,
        category,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      alert("Category updated successfully ✅")
      navigate('/admin/dashboard')
    } catch (err) {
      console.error("Error updating category:", err)
      alert("Failed to update category ❌")
      navigate('/admin/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />

      <div className="container mx-auto px-6 py-28 md:w-[50%]">
        {/* Back Button */}
        <div
          className="w-[80%] flex items-center gap-2 mb-6 text-gray-700 hover:text-black cursor-pointer transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </div>

        <div className="bg-white border border-gray-300 shadow-md rounded-2xl p-8">
          <h4 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Edit Category
          </h4>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* English Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category Name (English)
              </label>
              <input
                type="text"
                name="eng_name"
                value={category.eng_name}
                onChange={handleChange}
                placeholder="Enter category name in English"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Marathi Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category Name (Marathi)
              </label>
              <input
                type="text"
                name="mar_name"
                value={category.mar_name}
                onChange={handleChange}
                placeholder="श्रेणीचे नाव टाका"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* English Description */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Description (English)
              </label>
              <textarea
                name="eng_description"
                value={category.eng_description}
                onChange={handleChange}
                placeholder="Enter description in English"
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              ></textarea>
            </div>

            {/* Marathi Description */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Description (Marathi)
              </label>
              <textarea
                name="mar_description"
                value={category.mar_description}
                onChange={handleChange}
                placeholder="वर्णन टाका"
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {loading ? "Updating..." : "Update Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit_Category
