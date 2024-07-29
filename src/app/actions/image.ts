import sharp from 'sharp';

export async function resizeImage(formData: FormData) {

    const imageSource = formData.get('image') as File;
    const width = formData.get('width') as string;
    const height = formData.get('height') as string;

    const arrayBuffer = await imageSource.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const image = await sharp(buffer)
        .resize(parseInt(width), parseInt(height))
        .toBuffer();
    return image;

}