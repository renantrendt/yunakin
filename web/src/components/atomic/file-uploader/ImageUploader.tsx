import DocumentIcon from "@/icons/document-icon.svg"
import Image from "next/image"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


interface ImageUploaderProps {
    onImageUpload: (image: string) => void
    image?: string
}

const ImageUploader = ({ onImageUpload, image }: ImageUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onImageUpload(url);
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    return (
        <div  {...getRootProps()} id="ImageUpload" className="relative  cursor-pointer  rounded-full border-[1px] border-dashed border-grey-300 bg-white py-14 px-16
        hover:border-primary-500 focus:shadow-focus-primary focus:border-solid w-28 h-28 p-0  overflow-hidden ">
            {image && <Image alt="Image" src={image} width={100} height={100} className="w-32 h-32 z-10  absolute top-[-10px] left-0 rounded-full" />}

            <input {...getInputProps()} type="file" accept="image/*" className="hidden z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />

            {!image &&
                <div className="flex flex-col items-center justify-center relative bottom-1 ">
                    <div className="z-20 text-black">
                        <DocumentIcon />
                    </div>
                </div>
            }

        </div >
    )
}

export default ImageUploader;