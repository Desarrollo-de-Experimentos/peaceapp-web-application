import axios from "axios";

class Cloudinary {
    constructor() {
        this.cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        this.uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        this.apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    }

    async uploadImage(imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", this.uploadPreset);

        try {
            const response = await axios.post(this.apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    }
}

export default new Cloudinary();