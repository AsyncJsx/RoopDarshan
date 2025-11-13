import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import axios from '../config/axios'

function Add_Category() {
  const [category, setCategory] = useState({
    eng_name: '',
    mar_name: '',
    eng_description: '',
    mar_description: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = localStorage.getItem('Admin-Token')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        '/category/create',
        { ...category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Category created successfully!')
      navigate(-1)
    } catch (err) {
      console.error('Error creating category:', err);
      alert('Something Went Wrong Category!');
      navigate(-1);
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="container mx-auto px-6 py-48 md:w-[50%]">
        {/* Back Button */}
        <div
          className="w-[80%] flex items-center gap-2 mb-4 text-gray-700 hover:text-black transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <span className="cursor-pointer font-medium">Back</span>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-300 shadow-md rounded-2xl p-8">
          <h4 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Create Category
          </h4>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Category Name English */}
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

            {/* Category Name Marathi */}
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

            {/* Description English */}
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

            {/* Description Marathi */}
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

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'
                } text-white px-8 py-3 rounded-xl font-semibold transition-all`}
              >
                {loading ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add_Category
