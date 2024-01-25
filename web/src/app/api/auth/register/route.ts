// import { sendEmail } from "@/lib/mailer";
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/utils/sendEmail'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request): Promise<NextResponse<unknown>> {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string
      email: string
      password: string
    }
    const hashed_password = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        verified: false,
        provider: 'credentials',
      }
    })


    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      subject: 'Confirm Account',
      token: user.verifyToken as string
    });
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email
      }
    })
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
