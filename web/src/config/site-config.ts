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
                "content": "CodePilot has been a game-changer for our startup. The reduction in development time allowed us to launch our app weeks ahead of schedule, giving us a significant advantage in a competitive market. Highly recommend it to any team looking to make a mark fast",
                "role": "CTO of StartTech Innovations",
                "avatar": "/images/testimonials/alex-johnson.jpeg"
            },
            {
                "name": "Samantha Lee",
                "content": "Implementing CodePilot into our development workflow has dramatically improved our effic    iency. The pre-configured environments and best practices embedded in the platform have significantly reduced our onboarding time for new developers.",
                "role": "Project Manager at Digital Solutions Corp.",
                "avatar": "/images/testimonials/samanta.jpeg"
            },
            {
                "name": "Ethan Rivera",
                "content": "As a freelancer, every minute counts, and CodePilot has been instrumental in helping me deliver high-quality work on tight deadlines. The ease of use, coupled with powerful customization options, means I can cater to diverse client needs without starting from zero each time.",
                "role": "Freelance App Developer",
                "avatar": "/images/testimonials/ethan.jpeg"
            }
        ]
    },
    featuresSection:
    {
        features: [
            {
                title: "Pre-Configured Templates",
                description: "CodePilot offers a wide range of customizable templates that serve as a starting point for various types of applications, enabling developers to skip the initial setup and dive straight into the development of unique features.",
                image: "/images/hero-image.jpeg"
            },
            {
                title: "Built-In Best Practices",
                description: "With CodePilot, developers benefit from integrated best practices for coding, security, and scalability. This ensures that projects are not only developed faster but also maintain high standards of quality and performance..",
                image: "/images/hero-image.jpeg",
                direction: "rtl"
            },
            {
                title: "Scalability and Performance Optimization",
                description: "CodePilot is designed with scalability in mind, allowing applications to grow seamlessly in terms of user base and functionality. It includes optimized configurations for performance, ensuring that applications remain fast and responsive as they scale.",
                image: "/images/hero-image.jpeg"
            },

        ],
    },
    faqSection: {
        title: "FAQ",
        description: "Frequently Asked Questions",
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

    },
    footer: {
        description: "CodePilot accelerates development by providing a pre-configured foundation that saves time, ensures best practices, and facilitates scalability, empowering you to focus on innovation.",
        footnote: "@%Date% CodePilot. All rights reserved."
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
