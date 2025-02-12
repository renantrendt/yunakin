import DocumentIcon from "@/icons/document-icon.svg"
import Image from "next/image"
import ReactCrop, { type Crop } from 'react-image-crop'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Modal from "../modal/Modal"
import Button from "../button/Button"

import 'react-image-crop/dist/ReactCrop.css'
import { cn } from "@/utils/cn"
interface ImageUploaderProps {
    onImageUpload: (image: string, type: string) => void
    image?: string
    useCrop?: boolean
    comment?: string
}

const ImageUploader = ({ onImageUpload, image, useCrop = true, comment }: ImageUploaderProps) => {
    const [imageURL, setImageURL] = React.useState<string | null>(null)
    const imageRef = React.useRef<HTMLImageElement>(null)
    const [imageType, setImageType] = React.useState<string | null>(null)
    const [crop, setCrop] = React.useState<Crop>({
        unit: 'px', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 80,
        height: 80
    })
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const type = file.name.split('.').pop();

            const url = URL.createObjectURL(file);
            setImageType(type ?? null)
            setImageURL(url)
            if (!useCrop) {
                onImageUpload(url, type as string);
            }
        }
    }, [])

    const applyCrop = () => {
        const canvas = document.createElement('canvas');
        const image = imageRef.current;
        console.log(image)
        if (!image) return;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = crop.width as number;
            canvas.height = crop.height as number;
            ctx.drawImage(
                image,
                crop.x as number * scaleX,
                crop.y as number * scaleY,
                crop.width as number * scaleX,
                crop.height as number * scaleY,
                0,
                0,
                crop.width as number,
                crop.height as number
            );
            canvas.toBlob((blob) => {
                console.log(blob)
                if (!blob) return;
                const url = URL.createObjectURL(blob);

                setImageURL(null)
                onImageUpload(url as any as string, imageType as string);
            })
        }
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    return (
        <>
            {imageURL && useCrop && <Modal
                closeOnOutsideClick={false}
                isOpen={true} onClose={() => setImageURL(null)}>
                <div className="p-3 pt-16 flex flex-col gap-6 justify-between ">
                    <ReactCrop
                        crop={crop}
                        onChange={newCrop => setCrop(newCrop)}
                        aspect={1 / 1}
                        minHeight={80}
                        minWidth={80}
                    >
                        <img src={imageURL} alt="Crop" ref={imageRef} />
                    </ReactCrop>
                    <div>
                        <Button type="button" label="Apply" onClick={applyCrop} />
                    </div>
                </div>

            </Modal>}
            <div className="flex w-fit gap-6 justify-center items-center">
                <div  {...getRootProps()} id="ImageUpload" className={cn(`relative  cursor-pointer  border  border-grey-300 bg-white 
   focus:shadow-focus-primary focus:border-solid w-20 h-20  rounded-[10px] overflow-hidden
        border-dashed
            flex justify-center items-center
        `,
                )}>
                    {image && <Image alt="Image" src={image} width={100} height={100} className="w-full h-full  z-10  absolute  left-0 rounded-full" />}

                    <input {...getInputProps()} type="file" accept="image/*" className="hidden z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />

                    {!image && <div className="flex flex-col items-center justify-center ">
                        <div className="z-20 text-black bg-white dark:text-white dark:bg-black rounded-full p-1">
                            <DocumentIcon />
                        </div>
                    </div>}

                </div >
                {comment && <p className="text-[#5E5E5E] text-xs font-inter max-w-[230px] text-left">{comment}</p>}
            </div>

        </>

    )
}

export default ImageUploader;