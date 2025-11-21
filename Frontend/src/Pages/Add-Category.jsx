import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X, Upload } from 'lucide-react'
import axios from '../config/axios'

function Add_Category() {
  const [category, setCategory] = useState({
    eng_name: '',
    mar_name: '',
    eng_description: '',
    mar_description: ''
  })

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = localStorage.getItem('Admin-Token')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setImage(file)
      setError('')

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate image
    if (!image) {
      setError('Category image is required')
      setLoading(false)
      return
    }

    try {
      // Create FormData to handle file upload
      const formData = new FormData()
      formData.append('image', image)
      formData.append('eng_name', category.eng_name)
      formData.append('mar_name', category.mar_name)
      formData.append('eng_description', category.eng_description)
      formData.append('mar_description', category.mar_description)

      const response = await axios.post(
        '/category/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      
      alert('Category created successfully!')
      navigate(-1)
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.response?.data?.error || 'Something went wrong')
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

            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category Image
              </label>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">
                      Click to upload image
                    </span>
                    <span className="text-gray-500 text-sm mt-1">
                      PNG, JPG, JPEG up to 5MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
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