// import { sendEmail } from "@/lib/mailer";
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail, sendWelcomeWaitingListEmail } from '@/utils/sendEmail'
import { hash } from 'bcryptjs'
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
        await sendWelcomeWaitingListEmail({
            to: email,
            name: email,
            subject: 'Confirm Email',
            token: 'waiting-list'
        });
        return new NextResponse(
            JSON.stringify({
                status: 'success',
                message: 'Email sent successfully'
            }),
            { status: 200 }
        )
    } catch (error: any) {
        console.error(error)
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                message: error.message
            }),
            { status: 500 }
        )
    }
}
