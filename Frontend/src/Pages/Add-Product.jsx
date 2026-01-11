import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react"; 
import axiois from '../config/axios';

function AddProductForm() {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    
    const token = localStorage.getItem("Admin-Token");

    // Fetch categories on component mount
    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiois.get('/category/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to load categories');
            }
        };
        fetchCategories();
    }, [token]);

    const onSubmit = async (data) => {
        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }
        
        if (!selectedCategory) {
            toast.error('Please select a category');
            return;
        }

        setLoading(true);

        try {
            // Create FormData for single endpoint upload
            const formData = new FormData();

            // Append all images
            images.forEach((image) => {
                formData.append('images', image.file);
            });

            // Append product data
            formData.append('eng_name', data.name);
            formData.append('mar_name', data.marathiName);
            formData.append('eng_description', data.description);
            formData.append('mar_description', data.marathiDescription);
            formData.append('category', selectedCategory._id);
            
            // Append tags as array
            tags.forEach((tag) => {
                formData.append('tag', tag);
            });

            const response = await axiois.post('/product/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Product added successfully!');
            reset();
            setTags([]);
            setImages([]);
            setMainImageIndex(0);
            setSelectedCategory(null);
            
        } catch (error) {
            console.error('Error adding product:', error);
            const errorMessage = error.response?.data?.error || 'Failed to add product. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        const validFiles = files.filter(file => {
            if (!['image/jpeg','image/png','image/jpg','image/webp'].includes(file.type)) {
                toast.error('Only JPG, PNG, and WebP images allowed');
                return false;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        validFiles.forEach(file => {
            const id = Date.now() + Math.random();
            const reader = new FileReader();
            reader.onload = (ev) => {
                const newImage = { 
                    id, 
                    file, 
                    preview: ev.target.result 
                };
                setImages(prev => [...prev, newImage]);
            };
            reader.readAsDataURL(file);
        });
        e.target.value = null;
    };

    const removeImage = (id) => {
        const newImages = images.filter(img => img.id !== id);
        setImages(newImages);
        if (mainImageIndex >= newImages.length && newImages.length > 0) {
            setMainImageIndex(newImages.length - 1);
        }
    };

    const name = watch('name', '');
    const description = watch('description', '');
    const marathiName = watch('marathiName', '');
    const marathiDescription = watch('marathiDescription', '');

    return (
        <div className="min-h-screen w-full">
          <Navbar/>
          <div className="p-6 max-w-6xl mx-auto my-36 border-black border-2">
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
            
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-8">
                {/* Form Section */}
                <div className="w-1/2 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Product Name (English) *</label>
                            <input 
                                type="text" 
                                {...register('name', { 
                                    required: 'Product name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Product name must be at least 2 characters'
                                    }
                                })} 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Enter product name in English"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Product Name (Marathi) *</label>
                            <input 
                                type="text" 
                                {...register('marathiName', { 
                                    required: 'Marathi product name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Marathi product name must be at least 2 characters'
                                    }
                                })} 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="उत्पादनाचे नाव मराठी मध्ये"
                            />
                            {errors.marathiName && <p className="text-red-500 text-xs mt-1">{errors.marathiName.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
    <div>
        <label className="block text-sm font-medium mb-2">Description (English)</label>
        <textarea 
            {...register('description')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter product description in English"
        ></textarea>
        {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
    </div>
    
    <div>
        <label className="block text-sm font-medium mb-2">Description (Marathi)</label>
        <textarea 
            {...register('marathiDescription')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="उत्पादनाचे वर्णन मराठी मध्ये"
        ></textarea>
        {errors.marathiDescription && (
            <p className="text-red-500 text-xs mt-1">{errors.marathiDescription.message}</p>
        )}
    </div>
</div>


                    {/* Category Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <Autocomplete
                            options={categories}
                            getOptionLabel={(option) => option.eng_name || option.name || ''}
                            value={selectedCategory}
                            onChange={(event, newValue) => {
                                setSelectedCategory(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField 
                                    {...params} 
                                    variant="outlined" 
                                    placeholder="Select category" 
                                    size="small"
                                    error={!selectedCategory}
                                    helperText={!selectedCategory ? "Category is required" : ""}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Tags (max 15)</label>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            value={tags}
                            onChange={(e, newValue) => {
                                if (newValue.length <= 15) {
                                    setTags(newValue);
                                } else {
                                    toast.error('Maximum 15 tags allowed');
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
                                    placeholder="Add tags (press Enter after each tag)" 
                                    size="small"
                                />
                            )}
                        />
                        {tags.length > 0 && <p className="text-xs text-gray-500 mt-2">Tags: {tags.length}/15</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Upload Images * (Max 5MB each, JPG, PNG, WebP)
                        </label>
                        <input 
                            type="file" 
                            accept="image/jpeg,image/png,image/jpg,image/webp" 
                            multiple
                            onChange={handleImageChange} 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {images.length} image(s) selected. First image will be used as main image.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-3">
                            {images.map((img, index) => (
                                <div key={img.id} className="relative group">
                                    <div className="w-20 h-20 border-2 border-gray-300 rounded-lg overflow-hidden">
                                        <img src={img.preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                        {index === 0 && (
                                            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => removeImage(img.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || images.length === 0 || !selectedCategory} 
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium transition-colors"
                    >
                        {loading && (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>
                </div>

                {/* Preview Section */}
                <div className="min-w-1/2">
                    <div className="bg-[#efefef] border border-gray-300 rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center">
                        {/* Product Section */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                            {/* Left: Images */}
                            <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
                                {/* Main Product Image */}
                                <div className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rounded-xl shadow-lg bg-white flex items-center justify-center">
                                    {/* Logo Background */}
                                    {images.length > 0 ? (
                                        <>
                                            <img
                                                src="/logo-black.png"
                                                alt="logo background"
                                                className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 scale-125 -rotate-[35deg] mix-blend-multiply opacity-40"
                                            />
                                            {/* Main Image */}
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

                                {/* Side Gallery */}
                                {images.length > 1 && (
                                    <div className="flex md:flex-col gap-3 max-w-64 overflow-x-auto py-2">
                                        {images.map((img, index) => (
                                            <div
                                                key={img.id}
                                                onClick={() => setMainImageIndex(index)}
                                                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                                                    index === mainImageIndex 
                                                        ? 'border-blue-500 scale-105' 
                                                        : 'border-gray-300 hover:border-gray-500'
                                                }`}
                                            >
                                                {/* Logo Watermark */}
                                                <img
                                                    src="/logo-black.png"
                                                    alt="logo watermark"
                                                    className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] scale-110 mix-blend-multiply opacity-30"
                                                />
                                                {/* Gallery Image */}
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

                            {/* Product Details */}
                            <div className="mt-6 md:mt-0 text-center md:text-left w-full max-w-sm">
                                {/* English Name */}
                                <h2 className="text-xl md:text-2xl font-semibold text-black p-2 pb-3 border-b">
                                    {name || 'Product Name'}
                                </h2>
                                
                                {/* Marathi Name */}
                                <h3 className="text-lg md:text-xl font-medium text-gray-800 p-2 pb-3 border-b" style={{ direction: 'rtl' }}>
                                    {marathiName || 'उत्पादनाचे नाव'}
                                </h3>

                                {/* Category */}
                                {selectedCategory && (
                                    <div className="p-2 pb-3 border-b">
                                        <span className="text-sm text-gray-600">Category: </span>
                                        <span className="text-sm font-medium">
                                            {selectedCategory.eng_name || selectedCategory.name}
                                        </span>
                                    </div>
                                )}

                                {/* English Description */}
                                <p className="text-gray-700 text-sm leading-6 px-2 py-3 border-b">
                                    {description || 'Product description will appear here...'}
                                </p>

                                {/* Marathi Description */}
                                <p className="text-gray-700 text-sm leading-6 px-2 py-3 border-b" style={{ direction: 'rtl' }}>
                                    {marathiDescription || 'उत्पादनाचे वर्णन येथे दिसेल...'}
                                </p>

                                {/* Tags */}
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 px-2 py-4">
                                        {tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-200 text-black font-medium text-sm rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Disclaimer */}
                                <p className="text-xs text-gray-600 italic opacity-80 px-2 mt-4">
                                    *Disclaimer: Actual product may vary slightly from the image shown.
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

export default AddProductForm;