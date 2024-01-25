// utils/sendEmail.ts
import { VerificationEmail } from '@/components/template/email/WelcomeEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async ({
  to,
  name,
  subject,
}: {
  to: string
  name: string
  subject: string
}) => {

  try {
    // const data = await resend.emails.send({
    //   from: 'Fortan <fortan@sleekvid.com>',
    //   to: [to],
    //   subject: subject,
    //   react: WelcomeEmailTemplate({ confirmationEmailLink: "https://dev.sleekvid.com", name: name }) as React.ReactElement,
    // });
    return { success: true }
  } catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}



export const sendVerificationEmail = async ({
  to,
  name,
  subject,
  token: string
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
      react: VerificationEmail({ confirmationEmail: `http://localhost:3000/verify?token=${token}`, name: name }) as React.ReactElement,
    });
    return { success: true }
  } catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}