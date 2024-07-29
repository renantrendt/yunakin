import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {

    const formData = await req.formData();
    const imageSource = formData.get('image') as File;
    const width = formData.get('width') as string;
    const height = formData.get('height') as string;

    const arrayBuffer = await imageSource.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    try {
        const image = await sharp(buffer)
            .resize({
                width: parseInt(width),
                height: parseInt(width),
                fit: "contain"
            })
            .toBuffer();
        const response = new NextResponse(image);
        response.headers.set('Content-Type', 'image/jpeg');
        return response;
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}