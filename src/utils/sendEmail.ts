// utils/sendEmail.ts
import ResetPasswordEmail from '@/components/template/email/ResetPasswordEmailTemplate';
import { VerificationEmail } from '@/components/template/email/WelcomeEmailTemplate';
import WelcomeWaitingListEmailTemplate from '@/components/template/email/WelcomeWaitingListEmailTemplate';
import platformConfig from '@/config/app-config';
import { Resend } from 'resend';


if (!platformConfig.variables.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in .env.local")
}

const resend: Resend | null = platformConfig.variables.RESEND_API_KEY ? new Resend(platformConfig.variables.RESEND_API_KEY) : null;





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

  if (!resend) {
    return { success: false, error: "RESEND_API}KEY is not set" }
  }
  try {
    const data = await resend.emails.send({
      from: 'noreply <noreply@codepilot.dev>',
      to: [to],
      subject: subject,
      react: VerificationEmail({ confirmationEmail: `${platformConfig.variables.NEXT_URL}/verify?token=${token}`, name: name, organizationName: "Codepilot" }) as React.ReactElement,
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

  if (!resend) {
    return { success: false, error: "RESEND_API}KEY is not set" }
  }
  try {
    const data = await resend.emails.send({
      from: 'noreply <noreply@codepilot.dev>',
      to: [to],
      subject: subject,
      react: ResetPasswordEmail({ resetPasswordLink: `${platformConfig.variables.NEXT_URL}/reset-password?token=${token}`, name: name, organizationName: "Codepilot" }) as React.ReactElement,
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
export const sendWelcomeWaitingListEmail = async ({
  to,
  subject,
}: {
  to: string
  subject: string
}) => {

  if (!resend) {
    return { success: false, error: "RESEND_API}KEY is not set" }
  }
  const data = await resend.emails.send({
    from: 'noreply <noreply@codepilot.dev>',
    to: [to],
    subject: subject,
    react: WelcomeWaitingListEmailTemplate({ organizationName: "Codepilot" }) as React.ReactElement,
  });
  return { success: true, data: data }
}