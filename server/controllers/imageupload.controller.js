import { handleImageUpload } from "../services/imgupload.services.js";

export const imageupload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        // Pass the file to the handleImageUpload function
        const result = await handleImageUpload(req.file);

        // Respond with the result of the upload
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error("Image upload error:", err);
        res.status(500).json({ success: false, message: "Image upload failed." });
    }
};


