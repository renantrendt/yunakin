import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getDownloadUrl, uploadFile } from "./storage/storage";
import { resizeImage } from "@/app/actions/image";
import platformConfig from "@/config/app-config";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
function calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
}


export async function uploadImage(data: { imageURL: string, imageType: string }, newMemberBenefit: any) {
    const blob = await fetch(data.imageURL).then(r => r.blob());
    const random = Math.floor(Math.random() * 10)
    const imageType = data.imageType

    const path = "memberbenefits_images/" + newMemberBenefit.id + "/" + `image-${random}.${imageType ?? 'jpg'}`
    const file = new File([blob], `image.${imageType ?? 'jpg'}`, { type: imageType.includes('svg') ? "image/svg+xml" : "image/jpeg" });

    const image = new Image()
    image.src = data.imageURL


    return new Promise<{
        success: boolean,
        downloadUrl: {
            publicUrl: string;
        }
        message?: string
    }>((resolve, reject) => {
        image.onload = async () => {
            console.log(image.naturalWidth, image.naturalHeight)
            const { width, height } = calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 160, 160)
            console.log(width, height)
            const formData = new FormData()
            formData.append('image', file)
            formData.append('width', width.toString())
            formData.append('height', height.toString())

            const resizedImage = await fetch("/api/image/resize", {
                body: formData,
                method: 'POST'
            },).then(r => r.blob())  // resize image to 80x80


            const resizedFile = new File([resizedImage], `image.${imageType ?? 'jpg'}`, { type: imageType.includes('svg') ? "image/svg+xml" : "image/jpeg" });

            const isUploaded = await uploadFile(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path, resizedFile, { cacheControl: '3600', upsert: true })
            if (!isUploaded) {
                reject({
                    success: false,
                    message: "Failed to upload image"
                })
            }
            const downloadUrl = await getDownloadUrl(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path)
            if (!downloadUrl) {
                reject({
                    success: false,
                    message: "Failed to upload image"
                })
            }
            if (downloadUrl)
                resolve({
                    success: true,
                    downloadUrl
                });
        }
    })
}