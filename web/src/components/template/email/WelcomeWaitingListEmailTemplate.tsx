import platformConfig from "@/config/app-config";
import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Img,
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

const baseUrl = platformConfig.variables.NEXT_URL

export const WelcomeWaitingListEmailTemplate = ({
    email,
    organizationName
}: WelcomeWaitingListEmailTemplateProps) => {
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
                            Hi,
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Thanks for signing up for our email waiting list
                        </Text>
                        <Section className="text-left mt-[32px] mb-[32px]">
                            <Text>
                                Thanks, {email}
                            </Text>
                            <Text>
                                {organizationName} team
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

WelcomeWaitingListEmailTemplate.PreviewProps = {
    email: "fortanpireva@gmail.com",
    organizationName: "CodePilot",
} as WelcomeWaitingListEmailTemplateProps;

export default WelcomeWaitingListEmailTemplate;
