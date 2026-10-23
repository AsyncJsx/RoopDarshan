const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const deleteFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error("Error deleting from Cloudinary:", err);
  }
};

const printCloudinaryUsage = async () => {
  try {
    const usage = await cloudinary.api.usage();

    const storageBytes = usage.storage?.usage || 0;
    const bandwidthBytes = usage.bandwidth?.usage || 0;
    const transformations = usage.transformations?.usage || 0;

    const storageGB = storageBytes / (1024 * 1024 * 1024);
    const bandwidthGB = bandwidthBytes / (1024 * 1024 * 1024);

    // Cloudinary Free Plan
    const totalCredits = 25;

    // 1 credit = 1 GB storage OR 1 GB bandwidth OR 1000 transformations
    const storageCredits = storageGB;
    const bandwidthCredits = bandwidthGB;
    const transformationCredits = transformations / 1000;

    const creditsUsed =
      storageCredits +
      bandwidthCredits +
      transformationCredits;

    const creditsRemaining = Math.max(
      0,
      totalCredits - creditsUsed
    );

    const usagePercent = (creditsUsed / totalCredits) * 100;

    console.log("\n========== CLOUDINARY USAGE ==========");
    console.log(
      `Storage          : ${storageGB.toFixed(2)} GB`
    );
    console.log(
      `Bandwidth        : ${bandwidthGB.toFixed(2)} GB`
    );
    console.log(
      `Transformations  : ${transformations}`
    );

    console.log("--------------------------------------");

    console.log(
      `Credits Used     : ${creditsUsed.toFixed(2)} / ${totalCredits}`
    );
    console.log(
      `Credits Remaining: ${creditsRemaining.toFixed(2)}`
    );
    console.log(
      `Usage            : ${usagePercent.toFixed(2)}%`
    );

    console.log("======================================\n");

    return usage;

  } catch (err) {
    console.error("Error fetching Cloudinary usage:", err);
  }
};

module.exports = {
  cloudinary,
  deleteFromCloudinary,
  printCloudinaryUsage,
};