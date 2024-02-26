import { Metadata } from "next";
import platformConfig from "./app-config";

const siteUrls = {
    home: '/',
    dashboard: '/dashboard',
    docs: "https://docs.codepilot.dev",
    login: '/login',
    logout: '/logout',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    pricing: "/pricing",
    features: "/features",
    profile: '/profile',
    settings: '/settings',
    notFound: '/404',
    serverError: '/500',
    unauthorized: '/401',
    forbidden: '/403',
    contactUs: '/contact-us',
    aboutUs: '/about-us',
    privacyPolicy: '/privacy-policy',
    termsAndConditions: '/terms-and-conditions',
    faq: '/faq',
    blog: '/blogs',
    blogDetail: '/blog/:slug',
    category: '/category/:slug',
    tag: '/tag/:slug',
    search: '/search',
    cart: '/cart',
    checkout: '/checkout',
    orderSuccess: '/order-success',
    orders: '/orders',
    orderDetail: '/orders/:id'
}

export const siteCopy = {
    heroSection: {
        title: "Elevate Your Development Journey with CodePilot",
        description: "The ultimate SaaS boilerplate, designed to fast-track your application development with ease and precision.",
        image: "/images/hero-image.jpeg"
    },
    ctaSection: {
        title: "Why use CodePilot",
        description: "CodePilot accelerates development by providing a pre-configured foundation that saves time, ensures best practices, and facilitates scalability, empowering you to focus on innovation.",
        reasons: [
            {
                metric: "40%",
                description: "faster to market time",
            },
            {
                metric: "25%",
                description: "lower development costs",
            },
            {
                metric: "100%",
                description: "productivity increase",
            },

        ]
    },
    testimonialsSection: {
        testimonials: [
            {
                "name": "Alex Johnson",
                "content": "CodePilot has been a game-changer for our startup. The reduction in development time allowed us to launch our app weeks ahead of schedule, giving us a significant advantage in a competitive market. The scalability and robustness built into CodePilot meant we could seamlessly grow our user base without worrying about performance hiccups. Highly recommend it to any team looking to make a mark fast",
                "role": "CTO of StartTech Innovations",
                "avatar": "/images/testimonials/alex-johnson.jpeg"
            },
            {
                "name": "Samantha Lee",
                "content": "Implementing CodePilot into our development workflow has dramatically improved our effic    iency. The pre-configured environments and best practices embedded in the platform have significantly reduced our onboarding time for new developers, and the cost savings have been remarkable. CodePilot is now an integral part of our toolset for all future projects.",
                "role": "Project Manager at Digital Solutions Corp.",
                "avatar": "/images/testimonials/samanta.jpeg"
            },
            {
                "name": "Ethan Rivera",
                "content": "As a freelancer, every minute counts, and CodePilot has been instrumental in helping me deliver high-quality work on tight deadlines. The ease of use, coupled with powerful customization options, means I can cater to diverse client needs without starting from zero each time. It's like having an expert team by my side, 24/7",
                "role": "Freelance App Developer",
                "avatar": "/images/testimonials/ethan.jpeg"
            }
        ]
    },
    featuresSection:
    {
        features: [
            {
                title: "Fast Editing",
                description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
                image: "https://s3-alpha-sig.figma.com/img/d8ca/d6d9/f5624cdee8844b58f83692bca4eb13ab?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q04I~DtdKtQCllrWSR8DLjhqUaOVW5fiFp50PKPhctLFoUxT3kNmxQ8stM8XuqWnP4OW3ti0T90oHVeLnhwMlzixV7HAQw9kcGaKE1gtlPzimY9sfdlpHQ6sqU-DRp2Y4cMNmwbCoM-zTwl3XQjsNBXlHVfsgbA6jwo25PmktxvG5izk6lHTze8RDVVC52KC~HmtY5q135ApW9yPzu~hCqw~Jev13~YU9Zb8sEpEntkNAYiojBvysEvgiLzmT5VEj25WijZXkK4dDO85e3Y342vFL3hhh3Dwqp~iH1NoB2h9YETQILPYEHoeioLbcmpHBtnX4q39YFmmQHaI5Uzfzw__"
            },
            {
                title: "Fast Editing",
                description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
                image: "https://s3-alpha-sig.figma.com/img/82fa/223e/ee5d8b7e657b17b69b7647c4c2d088a4?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jlAB~~M0MCGDbg1IMzcqVO31R~lL7XVGz0mq7UCunJBfURO3SU4LznYzgg78tiQ5pKjr1hxcND5Inx8OqTVM~p7-eg39SzMvUrZy36mMBsYHSnVWzEWg4wbLzNKWetebkTI2jSZAgmLOlHaIawEQHBpx~7wZ2nyN-rjrx53TlC5T3ocDd~rxqCbLvsU5Rqp6JQM4U7B9ngu6cZuvDqJOEjcxJIlG6kJ9kxlBRkyvjpa1ap69DC0p9cYkkH5KOZxFPcRLSESTPrOUeuINWZGWyniE4lekdwLPL4mVnW0SmuRhXRDZjdPWg61zOe5FohuUASafBgMbLrBZxpLkEy4ROw__",
                direction: "rtl"
            },
            {
                title: "Fast Editing",
                description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
                image: "https://s3-alpha-sig.figma.com/img/8938/0eaa/f0d2a0564e7ee23ab6317b5efecae9f6?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nkVZynLJvFBdijYgw15mWcW1K3iOgUY-HaQoSBDfuDnSa3EtsLg9p6SpqzmcBGUkJ7liH3CCLuAOcyNXRU6S1zHbfr9EMQzDz-O7675NcsyvMOHy4LC5mNTQ7JxNhA4KJRp68MlchVu8uVNDNZPIhbYoL2MzkSwjqTjUe2rLVRfRoLEthztkvUn7lv-kl~FfZ6YLcO1BaL3xp6YqJH-z1e-DQzuodv2-iOGaFhXUXIkbozloJmV9CCFh20QwGTBwKOWs8iUvyHchlvYb~ebUf5-CHPy2qArm8pPX950WjAm6WeQhL-HL2MzPh3czfBNlQymxfrpGtNoFj~MQzd5d7A__"
            },

        ],
    },
    faqSection: {
        faqs: [
            {
                "question": "What is CodePilot?",
                "answer": "CodePilot is a comprehensive SaaS boilerplate designed to help developers launch applications faster by providing a pre-configured foundation, ensuring best practices, and facilitating scalability."
            },
            {
                "question": "How can CodePilot reduce development time?",
                "answer": "CodePilot reduces development time by offering customizable templates and state-of-the-art tools that eliminate the need to build from scratch, allowing developers to focus on creating unique features."
            },
            {
                "question": "Is CodePilot suitable for beginners?",
                "answer": "Yes, CodePilot is designed to be user-friendly for beginners while offering advanced features for experienced developers, making it an ideal tool for projects of any size and complexity."
            },
            {
                "question": "Can I use CodePilot for commercial projects?",
                "answer": "Absolutely. CodePilot is built to support both personal and commercial projects, providing the scalability and robustness needed for enterprise-grade applications."
            },
            {
                "question": "What kind of support does CodePilot offer?",
                "answer": "CodePilot offers comprehensive support through documentation, a dedicated support team, and a community forum where users can share insights and seek help from fellow developers."
            },
            {
                "question": "How often is CodePilot updated?",
                "answer": "CodePilot is regularly updated to incorporate the latest development trends, security patches, and community feedback to ensure it remains at the forefront of technology."
            },
            {
                "question": "Does CodePilot offer customization options?",
                "answer": "Yes, CodePilot provides extensive customization options to ensure that developers can tailor their projects to meet specific requirements, making it a flexible solution for a wide range of applications."
            }
        ]

    }
}

export const siteConfig: Metadata = {
    applicationName: 'CodePilot',
    title: 'Codepilot - Launch in days, not weeks.',
    description: 'Ready to accelerate your development process?!',
    keywords: ['SaaS', 'boilerplate'],
    openGraph: {
        type: 'website',
        locale: 'en',
        siteName: 'Codepilot',
        url: 'www.codepilot.dev',
        title: 'Codepilot - The Ultimate SaaS Starter Kit',
        description: 'Ready to accelerate your development process?',
        images: [`${platformConfig.variables.NEXT_URL}/images/og-demo-landing.png`],
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@Landing Page',
        creatorId: '',
        description: "Ready to accelerate your development process?",
        images: [`${platformConfig.variables.NEXT_URL}/images/og-demo-landing.png`],
        title: "Codepilot - Launch in days, not weeks."
    },
};
export default siteUrls
