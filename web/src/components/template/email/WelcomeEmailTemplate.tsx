import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface VercelInviteUserEmailProps {
    name?: string;
    organizationName?: string;
    confirmationEmail?: string;

}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const VerificationEmail = ({
    name,
    confirmationEmail,
    organizationName
}: VercelInviteUserEmailProps) => {
    const previewText = `Confirm registration on ${organizationName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/static/vercel-logo.png`}
                                width="40"
                                height="37"
                                alt="CodePilot"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Text className="text-black text-2xl font-bold leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            You recently created an account and requested that the confirmation email is resend. Click the button below to confirm the account,
                        </Text>
                        <Section className="text-left mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#2F80ED] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={confirmationEmail}
                            >
                                Confirm your Email
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={confirmationEmail} className="text-blue-600 no-underline">
                                {confirmationEmail}
                            </Link>
                        </Text>
                        <Section className="text-left mt-[32px] mb-[32px]">
                            <Text>
                                If you did not create an account please ignore this email or reply to let us know.
                            </Text>
                            <Text>
                                Thanks,
                            </Text>
                            <Text>
                                {organizationName} team
                            </Text>
                        </Section>
                        <Section className="text-left mt-[32px] mb-[32px] p-4 border-black border-2 rounded-md">
                            <Text>
                                P.S. We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

VerificationEmail.PreviewProps = {
    name: "Fortan",
    confirmationEmail: "https://codepilot.dev/confirm/1234567890",
    organizationName: "CodePilot",
} as VercelInviteUserEmailProps;

export default VerificationEmail;
