import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Function to handle image upload
export const handleImageUpload = async function handleImageUpload(file) {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new Error("Invalid file buffer"));
        }

        // Upload the file buffer to Cloudinary
        cloudinary.uploader.upload_stream(
            { public_id: 'shoes' }, // Change this if needed
            (error, result) => {
                if (error) {
                    console.log("Upload error:", error);
                    return reject(error); // Reject the promise if there's an error
                }

                console.log("Upload result:", result);

                // Generate optimized URL (auto-format, auto-quality)
                const optimizeUrl = cloudinary.url(result.public_id, {
                    fetch_format: 'auto',
                    quality: 'auto',
                });

                console.log("Optimized URL:", optimizeUrl);

                // Apply transformation (auto-crop to square aspect ratio)
                const autoCropUrl = cloudinary.url(result.public_id, {
                    crop: 'fill',
                    gravity: 'auto',
                    width: 500,
                    height: 500,
                });

                console.log("Auto-cropped URL:", autoCropUrl);

                resolve({
                    optimizeUrl,
                    autoCropUrl,
                }); 
            }
        ).end(file.buffer); 
    });
};
