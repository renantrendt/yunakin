import platformConfig from "@/config/app-config";
import {
    Body,
    Button,
    Column,
    Container,
    Head,
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

interface VerificationEmailProps {
    name?: string;
    organizationName?: string;
    confirmationEmail?: string;

}

const baseUrl = platformConfig.variables.NEXT_URL

export const VerificationEmail = ({
    name,
    confirmationEmail,
    organizationName
}: VerificationEmailProps) => {
    const previewText = `Confirm registration on ${organizationName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans px-2 ">
                    <Container className="  my-[40px] mx-auto    max-w-[665px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/images/logo.png`}
                                width="150"
                                height="120"
                                alt="CodePilot"
                                className="my-0 "
                            />
                        </Section>
                        <Text className="text-black text-2xl font-bold leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            You recently created an account and requested that the confirmation email is resend.
                        </Text>
                        <Text>
                            Click the button below to confirm the account,
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
                        <Section className="text-left mt-[32px] mb-[32px] p-4  border-gray-300 rounded-md  border border-solid">
                            <Text>
                                P.S. We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
                            </Text>
                        </Section>
                    </Container>
                    <Container className="bg-[#FAFAFA] !w-full min-w-full">
                        <Section className="mt-4">
                            <Img
                                src={`${baseUrl}/images/logo.png`}
                                width="150"
                                height="60"
                                alt="CodePilot"
                                className="my-0  mx-auto"
                            />
                        </Section>
                        <Section className="max-w-[665px] mt-4 text-center">
                            <Row className="my-4  ">
                                <Column>
                                    Facebook
                                </Column>
                                <Column>
                                    Twitter
                                </Column>
                                <Column>
                                    Instagram
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    Privacy Policy
                                </Column>
                                <Column>
                                    Terms & Conditions
                                </Column>
                                <Column>
                                    Cookies
                                </Column>
                            </Row>
                            <Text className="text-center">
                                © 2021, Company Inc. All right reserved.
                            </Text>
                            <Text>
                                Company Inc. <br />
                                Magjistralja Prishtine - Lipjan <br />
                                Prishtine, Kosovo <br />
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
} as VerificationEmailProps;

export default VerificationEmail;
