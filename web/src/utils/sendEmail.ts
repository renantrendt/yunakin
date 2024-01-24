// utils/sendEmail.ts
import { WelcomeEmailTemplate } from '@/components/template/email/WelcomeEmailTemplate';
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
    const data = await resend.emails.send({
      from: 'Fortan <fortan@sleekvid.com>',
      to: [to],
      subject: subject,
      react: WelcomeEmailTemplate({ firstName: name }) as React.ReactElement,
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
