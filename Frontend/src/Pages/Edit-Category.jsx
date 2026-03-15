import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, X, Upload } from "lucide-react"
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

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [existingImage, setExistingImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch existing category data
  useEffect(() => {
    axios
      .get(`/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const categoryData = res.data.category
        setCategory({
          eng_name: categoryData.eng_name || '',
          mar_name: categoryData.mar_name || '',
          eng_description: categoryData.eng_description || '',
          mar_description: categoryData.mar_description || ''
        })

        // Set existing image if available
        if (categoryData.image && categoryData.image.url) {
          setExistingImage(categoryData.image)
          setImagePreview(categoryData.image.url)
        }
      })
      .catch((err) => {
        console.error("Error fetching category:", err)
      })
  }, [id, token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // FIX 1: Clear preview completely and reset file input
  const removeImage = () => {
    setImage(null)
    setImagePreview('')  // Clear completely so upload box reappears
    const fileInput = document.getElementById('image-upload')
    if (fileInput) fileInput.value = ''  // Reset file input so same file can be re-selected
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()

      // FIX 2: Properly handle image cases
      if (image) {
        // New image selected — send it
        formData.append('image', image)
      } else if (!imagePreview && existingImage) {
        // User removed the existing image — tell backend to delete it
        formData.append('remove_image', 'true')
      }
      // If imagePreview still has the old URL and no new image, backend keeps the existing image

      formData.append('eng_name', category.eng_name)
      formData.append('mar_name', category.mar_name)
      formData.append('eng_description', category.eng_description)
      formData.append('mar_description', category.mar_description)

      await axios.put(
        `/category/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Do NOT set Content-Type manually — axios sets multipart/form-data automatically
          },
        }
      )

      alert("Category updated successfully ✅")
      navigate('/admin/dashboard')
    } catch (err) {
      console.error("Error updating category:", err)
      alert("Failed to update category ❌")
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

            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Category Image
                {existingImage && !image && imagePreview && (
                  <span className="text-sm text-gray-500 ml-2 font-normal">
                    (Current image — upload new one to replace)
                  </span>
                )}
              </label>

              {/* FIX 3: Show upload box when imagePreview is empty */}
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
                  {image && (
                    <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      New Image
                    </div>
                  )}
                  {/* FIX 4: Allow replacing image by clicking on it */}
                  <label
                    htmlFor="image-upload-replace"
                    className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-opacity-80 transition"
                  >
                    Replace
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload-replace"
                  />
                </div>
              )}
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