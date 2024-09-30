import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const CloudinaryUpload = forwardRef((props, ref) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to handle image selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Function to upload image to Cloudinary
    const uploadImage = async () => {
        if (!image) return null; // Return null if no image is selected

        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'Appointment_Plugin'); // Replace with your upload preset
        formData.append('folder', 'Appointment_Plugin'); // Specify Cloudinary folder

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
            setLoading(false);
            return response.data.secure_url; // Return the uploaded image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
            return null; // Return null if upload fails
        }
    };

    // Expose the uploadImage method to parent via ref
    useImperativeHandle(ref, () => ({
        uploadImage,
    }));

    return (
        <div>
            <input
                onChange={handleImageChange}
                accept="image/*"
                className="block w-full px-2 py-[5px] text-gray-700 bg-white border rounded-lg focus:border-indigo-300 focus:ring-opacity-40 focus:outline-none border-indigo-200"
                type="file"
                required
            />
            {loading && <p>Uploading...</p>}
        </div>
    );
});

CloudinaryUpload.displayName = 'CloudinaryUpload';
export default CloudinaryUpload;
