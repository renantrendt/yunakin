// utils/sendEmail.ts
import InviteUserEmailTemplate from '@/components/template/email/InviteUserEmailTemplate';
import MagicLinkEmail from '@/components/template/email/MagicLinkEmailTemplate';
import ResetPasswordEmail from '@/components/template/email/ResetPasswordEmailTemplate';
import { VerificationEmail } from '@/components/template/email/WelcomeEmailTemplate';
import WelcomeWaitingListEmailTemplate from '@/components/template/email/WelcomeWaitingListEmailTemplate';
import platformConfig from '@/config/app-config';
import resend from '@/lib/email/resend';




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
      from: 'Renan <renan@yunakin.com>',
      to: [to],
      subject: subject,
      react: VerificationEmail({ confirmationEmail: `${platformConfig.variables.NEXT_URL}/verify?token=${token}`, name: name, organizationName: "Yunakin" }) as React.ReactElement,
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
      from: 'Renan <renan@yunakin.com>',
      to: [to],
      subject: subject,
      react: ResetPasswordEmail({ resetPasswordLink: `${platformConfig.variables.NEXT_URL}/reset-password?token=${token}`, name: name, organizationName: "Yunakin" }) as React.ReactElement,
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
    from: 'Renan <renan@yunakin.com>',
    to: [to],
    subject: subject,
    react: WelcomeWaitingListEmailTemplate({ organizationName: "Yunakin" }) as React.ReactElement,
  });
  return { success: true, data: data }
}


export const sendInviteUserEmail = async ({
  to,
  subject,
  token
}: {
  to: string
  name: string
  subject: string
  token: string
}) => {

  if (!resend) {
    return { success: false, error: "RESEND_API_KEY is not set" }
  }
  try {
    const data = await resend.emails.send({
      from: 'Renan <renan@yunakin.com>',
      to: [to],
      subject: subject,
      react: InviteUserEmailTemplate({
        acceptInviteLink: `${platformConfig.variables.NEXT_URL}/accept-invite?token=${token}`, organizationName: "Yunakin"
      }) as React.ReactElement,
    });
    return { success: true, data: data }
  }
  catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}
export const sendMagicLinkEmail = async ({
  to,
  subject,
  magicLink
}: {
  to: string,
  subject: string,
  magicLink: string
}) => {

  if (!resend) {
    return { success: false, error: "RESEND_API_KEY is not set" }
  }
  try {
    const data = await resend.emails.send({
      from: 'Renan <renan@yunakin.com>',
      to: [to],
      subject: subject,
      react: MagicLinkEmail({
        magicLink,
        organizationName: "Yunakin"
      }) as React.ReactElement,
    });
    return { success: true, data: data }
  }
  catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}