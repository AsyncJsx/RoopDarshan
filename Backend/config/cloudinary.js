const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const checkUsage = async () => {
  try {
    const usage = await cloudinary.api.usage();
    console.log('Current usage info:', usage);
  } catch (err) {
    console.error('Error fetching usage:', err.message);
  }
};





const deleteFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error("Error deleting from Cloudinary:", err);
  }
};

module.exports = {cloudinary,deleteFromCloudinary};
