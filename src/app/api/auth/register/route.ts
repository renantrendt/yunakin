// import { sendEmail } from "@/lib/mailer";
import { getMemberPageConfigByClientSlug } from '@/app/actions'
import { createTranslation } from '@/lib/i18n/server'
import createClient from '@/lib/meilisearch/meilisearch'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/utils/sendEmail'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request): Promise<NextResponse<unknown>> {
  try {
    const { t } = await createTranslation('auth')
    const { email, clientId, password } = (await req.json()) as {
      email: string
      clientId: string
      password: string
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      }
    })
    if (existingUser) {
      throw { message: t("error.emailAlreadyInUse"), statusCode: 400 }
    }
    const hashed_password = await hash(password, 12)


    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: clientId,
          email: email.toLowerCase(),
          password: hashed_password,
          verified: false,
          provider: 'credentials',
        }
      })
      const meilisearchClient = await createClient()
      meilisearchClient.index('users').addDocuments([user])

      try {
        const memberPageConfig = await getMemberPageConfigByClientSlug(clientId);

        if (!memberPageConfig) {
          throw new Error("Member Page Config Not Found")
        }


        await prisma.memberBenefitPageConfig.update({
          where: {
            id: memberPageConfig.id
          },
          data: {
            userId: user.id
          }
        })
        const onboardingMemberBenefits = await prisma.onboardingMemberBenefits.findMany({
          where: {
            memberBenefitPageConfigId: memberPageConfig.id
          }
        })

        for (let i = 0; i < onboardingMemberBenefits.length; i++) {
          const element = onboardingMemberBenefits[i];
          await prisma.otherMemberBenefit.create({
            data: {
              userId: user.id,
              memberBenefitId: element.memberBenefitId,
            }
          });
        }

        await prisma.onboardingMemberBenefits.deleteMany({
          where: {
            memberBenefitPageConfigId: memberPageConfig.id
          }
        })
      } catch (error) {
        throw { message: "Member Page Config Not Found", statusCode: 400 }
      }

      return user;
    });
    // update memberpage config

    await sendVerificationEmail({
      to: result.email,
      name: result.name,
      subject: 'Confirm Account',
      token: result.verifyToken as string
    });
    return NextResponse.json({
      user: {
        name: result.name,
        email: result.email
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
