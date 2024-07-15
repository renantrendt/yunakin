import DocumentIcon from "@/icons/document-icon.svg"
import Image from "next/image"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadIcon } from "@radix-ui/react-icons"
import Typography from "../typography/Typography"

interface ImageUploaderProps {
    onImageUpload: (image: string, type: string) => void
    image?: string
}

const ImageUploader = ({ onImageUpload, image }: ImageUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const type = file.name.split('.').pop();
            const url = URL.createObjectURL(file);
            onImageUpload(url, type);
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    return (
        <div  {...getRootProps()} id="ImageUpload" className="relative  cursor-pointer   border border-transparent  bg-transparent
        hover:border-[#CECECE] focus:shadow-focus-primary focus:border-solid p-3  w-fit 
                    flex justify-center items-center group 
        ">
            {image && <Image alt="Image" src={image} width={100} height={100} objectFit="contain" className=" min-w-[100px] max-w-[150px]  h-auto w-fit  z-10 " />}

            <input {...getInputProps()} type="file" accept="image/*" className="hidden z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />

            <div className="absolute -right-8  hidden group-hover:block ">
                <UploadIcon width={24} height={24} />
            </div>

        </div >
    )
}

export default ImageUploader;