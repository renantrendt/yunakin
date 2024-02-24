// import { sendEmail } from "@/lib/mailer";
import { prisma } from '@/lib/prisma'
import { sendWelcomeWaitingListEmail } from '@/utils/sendEmail'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request): Promise<NextResponse<boolean>> {
    try {
        const { email } = (await req.json()) as {
            email: string
        }
        const waitingListUser = await prisma.waitlistUser.findFirst({
            where: {
                email
            }
        });
        if (waitingListUser) {
            return new NextResponse(
                JSON.stringify({
                    status: 'error',
                    message: 'You are already in the waiting list'
                }),
                { status: 400 }
            )
        }
        await prisma.waitlistUser.create({
            data: {
                email
            }
        })
        const result = await sendWelcomeWaitingListEmail({
            to: email,
            subject: 'Waiting List Confirmation'
        });
        return new NextResponse(
            JSON.stringify({
                status: result.success ? 'success' : 'error',
                data: result.data
            }),
            { status: 200 }
        )
    } catch (error: any) {
        console.error(error)
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                error: error,
                message: JSON.stringify(error),
                reason: "Something bad happened"
            }),
            { status: 500 }
        )
    }
}
