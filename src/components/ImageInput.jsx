import React from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const ImageInput = ({ onChange }) => {
    const [image, setImage] = useState(null);
    
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
        onChange(file);
    };
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
    });
    
    return (
        <div className="text-left mb-4 relative w-[100%]">
        <div {...getRootProps()} className="border border-gray-300 rounded-md p-4 cursor-pointer">
            <input {...getInputProps()} />
            {image ? (
            <img src={image} alt="Selected" className="w-full h-auto" />
            ) : (
            <p className="text-center text-gray-300 font-light text-[5rem]">+</p>
            )}
        </div>
        </div>
    );
}

export default ImageInput;