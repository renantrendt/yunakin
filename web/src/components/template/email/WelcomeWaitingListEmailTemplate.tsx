import platformConfig from "@/config/app-config";
import {
    Body,
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


interface WelcomeWaitingListEmailTemplateProps {
    email?: string;
    organizationName?: string;
}

const baseUrl = platformConfig.variables.NEXT_URL || "http://localhost:3000";

export const WelcomeWaitingListEmailTemplate = ({
    email,
    organizationName
}: WelcomeWaitingListEmailTemplateProps) => {
    const previewText = `Confirm registration on ${organizationName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind
            >
                <Body className="bg-[#FAFAFA] font-sans ">
                    <Container className=" bg-white  px-[60px] pt-[36px] pb-[24px] rounded-[10px]   mt-[60px] mx-auto  flex flex-col justify-center    max-w-[565px]">
                        <Section>

                            <Text className="text-black text-2xl font-bold leading-[24px]">
                                You’ve submitted! 💌
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px]">
                                Thank you for submitting your email. <br />
                                We can’t wait to inform you for our launch! ⏳
                            </Text>
                        </Section>

                        <Section className="text-left  mb-[32px]">
                            <Text>
                                Enjoy the rest of your week,<br />
                                {organizationName} team.
                            </Text>
                        </Section>
                        <Section className="text-left mt-[32px] mb-[32px] px-4   border-gray-300 rounder-md rounded-md  border border-solid">
                            <Text className="text-[#7A7A7A]">
                                <span className="font-extrabold">   P.S. </span> We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
                            </Text>
                        </Section>
                    </Container>
                    <Container className=" !w-full min-w-full min-h-[250px]">
                        <Section className="mt-4 flex justify-center items-center mb-4">
                            <Img
                                src={`${baseUrl}/images/email-footer-logo.png`}
                                width="10%"
                                height="10%"
                                alt="CodePilot"
                                className="my-0  mx-auto"
                            />
                        </Section>
                        <Section className="flex flex-row justify-center gap-4 text-[#8E8E8E]">
                            <Link className="mr-4 text-[#8E8E8E] text-[12px] " href={`${baseUrl}/privacy-policy`}>
                                Privacy Policy
                            </Link>
                            <Link href={`${baseUrl}/tos`} className="text-[#8E8E8E] text-[12px]">
                                Terms & Conditions
                            </Link>
                        </Section>
                        <Section className="flex justify-center">
                            <Text className="text-[#8E8E8E] text-[12px]">
                                © 2024, All right reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

WelcomeWaitingListEmailTemplate.PreviewProps = {
    email: "fortanpireva@gmail.com",
    organizationName: "CodePilot",
} as WelcomeWaitingListEmailTemplateProps;

export default WelcomeWaitingListEmailTemplate;
