// utils/sendEmail.ts
import sgMail from '@sendgrid/mail'

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('Missing SENDGRID_API_KEY environment variable')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async ({
  to,
  subject,
  text,
  html
}: {
  to: string
  subject: string
  text: string
  html: string
}) => {
  const msg = {
    to,
    from: 'your-email@example.com', // Replace with your verified sender email address
    subject,
    text,
    html
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
    return { success: false, error }
  }
}
