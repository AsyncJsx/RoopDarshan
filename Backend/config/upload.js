const multer = require("multer");
const sharp = require("sharp");
const { cloudinary } = require("./cloudinary");
const fs = require("fs").promises; // ✅ use promise-based fs
const path = require("path");

const upload = multer({ dest: "uploads/" });

async function optimizeAndUpload(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) return next();

    const uploadedFiles = [];

    for (const file of req.files) {
      let result;

      if (file.mimetype.startsWith("image/")) {
        const optimizedPath = path.join("uploads", `optimized-${file.filename}.webp`);

        // ✅ Optimize image first
        await sharp(file.path)
          .resize(800)
          .webp({ quality: 80 })
          .toFile(optimizedPath);

        // ✅ Upload optimized image to Cloudinary
        result = await cloudinary.uploader.upload(optimizedPath, {
          folder: "ecommerce",
          resource_type: "image",
        });

        // ✅ Clean up temp files safely
        await Promise.allSettled([
          fs.unlink(file.path),
          fs.unlink(optimizedPath),
        ]);
      }

      else if (file.mimetype.startsWith("video/") || file.mimetype.startsWith("audio/")) {
        // ✅ Upload videos & audios directly
        result = await cloudinary.uploader.upload(file.path, {
          folder: "ecommerce",
          resource_type: "video",
        });

        await fs.unlink(file.path).catch(() => {});
      } 
      else {
        // Skip unsupported types
        await fs.unlink(file.path).catch(() => {});
        continue;
      }

      uploadedFiles.push({
        url: result.secure_url,
        public_id: result.public_id,
        type: file.mimetype,
      });
    }

    req.optimizedImages = uploadedFiles;
    next();
  } catch (error) {
    console.error("❌ Error uploading files:", error);
    res.status(500).json({ error: "Error uploading files" });
  }
}

module.exports = { upload, optimizeAndUpload };
