// utils/sendEmail.ts
import ResetPasswordEmail from '@/components/template/email/ResetPasswordEmailTemplate';
import { VerificationEmail } from '@/components/template/email/WelcomeEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);





export const sendVerificationEmail = async ({
  to,
  name,
  subject,
  token
}: {
  to: string
  name: string
  subject: string
  token: string
}) => {

  try {
    const data = await resend.emails.send({
      from: 'Fortan <fortan@codepilot.dev>',
      to: [to],
      subject: subject,
      react: VerificationEmail({ confirmationEmail: `${process.env.NEXT_URL}/verify?token=${token}`, name: name, organizationName: "CodePilot" }) as React.ReactElement,
    });
    return { success: true, data: data }
  } catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}
export const sendResetPasswordEmail = async ({
  to,
  name,
  subject,
  token
}: {
  to: string
  name: string
  subject: string
  token: string
}) => {

  try {
    const data = await resend.emails.send({
      from: 'Fortan <fortan@codepilot.dev>',
      to: [to],
      subject: subject,
      react: ResetPasswordEmail({ resetPasswordLink: `${process.env.NEXT_URL}/reset-password?token=${token}`, name: name, organizationName: "CodePilot" }) as React.ReactElement,
    });
    return { success: true, data: data }
  } catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}