// import { sendEmail } from "@/lib/mailer";
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<NextResponse<unknown>> {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'unauthorized'
      }),
      { status: 401 }
    )
  }
  try {
    const { password } = (await req.json()) as {
      password: string
    }
    const hashed_password = await hash(password, 12)

    const user = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        password: hashed_password
      }
    })

    // await sendEmail("verifyEmail", user.email, user.id);

    return NextResponse.json(
      {
        user: {
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    )
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500 }
    )
  }
}
