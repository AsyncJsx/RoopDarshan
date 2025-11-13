import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "../config/axios";

function Edit_Product() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("Admin-Token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    setValue("name", product.eng_name || "");
    setValue("marathiName", product.mar_name || "");
    setValue("description", product.eng_description || "");
    setValue("marathiDescription", product.mar_description || "");
    setTags(product.tag || []);

    const existingImgPreviews = (product.img || []).map((imgUrl, index) => ({
      id: `existing-${index}`,
      preview: imgUrl.url,
      isExisting: true,
      progress: 100,
    }));
    setExistingImages(existingImgPreviews);
    setImages(existingImgPreviews);
  }, [product, setValue]);

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("eng_name", data.name);
    formData.append("mar_name", data.marathiName);
    formData.append("eng_description", data.description);
    formData.append("mar_description", data.marathiDescription);
    
    // Send tags as array directly, not stringified
    tags.forEach(tag => {
      formData.append("tag", tag);
    });

    // Get the existing images that are still kept
    const keptExistingImages = images
      .filter(img => img.isExisting)
      .map(img => img.preview);
    
    // Send kept existing images
    keptExistingImages.forEach(img => {
      formData.append("existingImages", img);
    });

    // Add new images
    images.forEach((img) => {
      if (!img.isExisting) {
        formData.append("images", img.file);
      }
    });

    try {
      const res = await axios.put(`/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product updated successfully");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPG/PNG images allowed");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return false;
      }
      return true;
    });

    validFiles.forEach((file) => {
      const id = Date.now() + Math.random();
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newImage = {
          id,
          file,
          preview: ev.target.result,
          progress: 0,
          isExisting: false,
        };
        setImages((prev) => [...prev, newImage]);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setImages((old) =>
            old.map((img) =>
              img.id === id
                ? { ...img, progress: Math.min(progress, 100) }
                : img
            )
          );
          if (progress >= 100) clearInterval(interval);
        }, 200);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = null;
  };

  const removeImage = (id) => {
    const imageToRemove = images.find((img) => img.id === id);

    if (imageToRemove?.isExisting) {
      toast.success("Image will be removed after saving");
    }

    const newImages = images.filter((img) => img.id !== id);
    setImages(newImages);

    if (mainImageIndex >= newImages.length && newImages.length > 0) {
      setMainImageIndex(newImages.length - 1);
    }
  };

  const name = watch("name", "");
  const description = watch("description", "");
  const marathiName = watch("marathiName", "");
  const marathiDescription = watch("marathiDescription", "");

  if (loading && !product) {
    return (
      <div className="min-h-screen w-full">
        <Navbar />
        <div className="flex items-center justify-center mt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto mt-36 border-black border-2">
        <div className="w-[80%] flex items-center gap-2  mb-4 text-gray-700 hover:text-black transition">
          <ArrowLeft
            onClick={() => {
              navigate(-1);
            }}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="cursor-pointer font-medium">Back</span>
        </div>
        <Toaster />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Product</h2>
          <div className="text-sm text-gray-500">Product ID: {id}</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-8">
          <div className="w-1/2 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name (English)
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name (Marathi)
                </label>
                <input
                  type="text"
                  {...register("marathiName", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.marathiName && (
                  <p className="text-red-500 text-xs mt-1">
                    Marathi name is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (English)
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    Description is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (Marathi)
                </label>
                <textarea
                  {...register("marathiDescription", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
                {errors.marathiDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    Marathi description is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (max 15)
              </label>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags}
                onChange={(e, newValue) => {
                  if (newValue.length <= 15) {
                    setTags(newValue);
                  } else {
                    toast.error("Maximum 15 tags allowed");
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <span
                      key={index}
                      {...getTagProps({ index })}
                      className="bg-gray-100 border border-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {option}
                    </span>
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Add tag"
                    size="small"
                  />
                )}
              />
              {tags.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Tags: {tags.length}/15
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Update Images
                <span className="text-xs text-gray-500 ml-2">
                  (Existing {existingImages.length} images)
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((img, index) => (
                  <div key={img.id} className="relative group">
                    <div
                      className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                        img.isExisting ? "border-green-300" : "border-blue-300"
                      }`}
                    >
                      <img
                        src={img.preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {img.progress < 100 && (
                        <div className="absolute bottom-0 left-0 w-full bg-gray-200">
                          <div
                            className="bg-blue-500 h-1 transition-all duration-300"
                            style={{ width: img.progress + "%" }}
                          ></div>
                        </div>
                      )}
                    </div>
                    {img.isExisting && (
                      <div className="absolute -top-1 -left-1 bg-green-500 text-white text-xs px-1 rounded">
                        Existing
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center font-medium transition-colors"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Updating Product..." : "Update Product"}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="w-[90vw]">
            <div className="bg-[#efefef] border border-gray-300 rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center">
                    {images.length > 0 ? (
                      <>
                        <img
                          src="/logo-black.png"
                          alt="logo background"
                          className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 scale-125 -rotate-[35deg] mix-blend-multiply opacity-40"
                        />
                        <img
                          src={images[mainImageIndex]?.preview}
                          alt={name}
                          className="relative z-10 w-[90%] h-[90%] object-contain transition-transform duration-500 hover:scale-105"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="flex md:flex-col gap-3 max-w-64 overflow-x-auto py-2">
                      {images.map((img, index) => (
                        <div
                          key={img.id}
                          onClick={() => setMainImageIndex(index)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            index === mainImageIndex
                              ? "border-blue-500 scale-105"
                              : "border-gray-300 hover:border-gray-500"
                          }`}
                        >
                          <img
                            src="/logo-black.png"
                            alt="logo watermark"
                            className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] scale-110 mix-blend-multiply opacity-30"
                          />
                          <img
                            src={img.preview}
                            alt={`Gallery ${index + 1}`}
                            className="relative z-10 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 md:mt-0 text-center md:text-left w-full max-w-72 p-12">
                  <h2 className="text-xl md:text-2xl font-semibold text-black p-2 pb-3 border-b break-words whitespace-normal">
                    {name || "Product Name"}
                  </h2>

                  <h3
                    className="text-lg md:text-xl font-medium text-gray-800 p-2 pb-3 border-b break-words whitespace-normal"
                    style={{ direction: "rtl" }}
                  >
                    {marathiName || "उत्पादनाचे नाव"}
                  </h3>

                  <p className="text-gray-700 text-sm leading-6 px-2 py-3 border-b break-words whitespace-normal">
                    {description || "Product description will appear here..."}
                  </p>

                  <p
                    className="text-gray-700 text-sm leading-6 px-2 py-3 border-b break-words whitespace-normal"
                    style={{ direction: "rtl" }}
                  >
                    {marathiDescription || "उत्पादनाचे वर्णन येथे दिसेल..."}
                  </p>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 px-2 py-4">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-200 text-black font-medium text-sm rounded-full break-words whitespace-normal"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-600 italic opacity-80 px-2 mt-4 break-words whitespace-normal">
                    *Disclaimer: Actual product may vary slightly from the image
                    shown.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit_Product;