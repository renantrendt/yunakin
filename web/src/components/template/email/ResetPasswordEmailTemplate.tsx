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

interface ResetPasswordEmailProps {
    name?: string;
    organizationName?: string;
    resetPasswordLink?: string;
}

const baseUrl = platformConfig.variables.NEXT_URL

export const ResetPasswordEmail = ({
    name,
    resetPasswordLink,
    organizationName
}: ResetPasswordEmailProps) => {
    const previewText = `Reset password for the account on ${organizationName}`;

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
                            You recently requested an password reset  and reset password  email is sent.
                        </Text>
                        <Text>
                            Click the button below to reset the password,
                        </Text>
                        <Section className="text-left mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#9463FB] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={resetPasswordLink}
                            >
                                Reset your Password
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={resetPasswordLink} className="text-blue-600 no-underline">
                                {resetPasswordLink}
                            </Link>
                        </Text>
                        <Section className="text-left mt-[32px] mb-[32px]">
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

ResetPasswordEmail.PreviewProps = {
    name: "Fortan",
    confirmationEmail: "https://codepilot.dev/confirm/1234567890",
    organizationName: "CodePilot",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
