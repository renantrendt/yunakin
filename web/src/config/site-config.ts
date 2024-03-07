import { Metadata } from "next";
import platformConfig from "./app-config";

const siteUrls = {
    home: '/',
    dashboard: '/dashboard',
    docs: "https://docs.Codepilot.dev",
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
        title: "Elevate Your Development Journey with Codepilot",
        description: "The ultimate SaaS boilerplate, designed to fast-track your application development with ease and precision.",
        image: "/images/hero-image.jpeg",
        usedBy: [
            {
                name: "John Doe",
                avatar: "/images/used-by/first.jpeg"
            },
            {
                name: "John Doe",
                avatar: "/images/used-by/second.jpeg"
            },
            {
                name: "John Doe",
                avatar: "/images/used-by/third.jpeg"
            },
            {
                name: "John Doe",
                avatar: "/images/used-by/fourth.jpeg"
            },

        ],
        usedByCopy: "Used by <b>100+</b> developers",
    },
    ctaSection: {
        title: "Why use Codepilot?",
        description: "Codepilot accelerates development by providing a pre-configured foundation that saves time, ensures best practices, and facilitates scalability, empowering you to focus on innovation.",
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
                "content": "Codepilot has been a game-changer for our startup. The reduction in development time allowed us to launch our app weeks ahead of schedule, giving us a significant advantage in a competitive market. Highly recommend it to any team looking to make a mark fast",
                "role": "CTO of StartTech Innovations",
                "avatar": "/images/testimonials/alex-johnson.jpeg"
            },
            {
                "name": "Samantha Lee",
                "content": "Implementing Codepilot into our development workflow has dramatically improved our effic    iency. The pre-configured environments and best practices embedded in the platform have significantly reduced our onboarding time for new developers.",
                "role": "Project Manager at Digital Solutions Corp.",
                "avatar": "/images/tes  timonials/samanta.jpeg"
            },
            {
                "name": "Ethan Rivera",
                "content": "As a freelancer, every minute counts, and Codepilot has been instrumental in helping me deliver high-quality work on tight deadlines. The ease of use, coupled with powerful customization options, means I can cater to diverse client needs without starting from zero each time.",
                "role": "Freelance App Developer",
                "avatar": "/images/testimonials/ethan.jpeg"
            }
        ]
    },
    featuresSection:
    {
        features: [
            {
                title: "Templates",
                description: "Codepilot offers a wide range of customizable templates that serve as a starting point for various types of applications, enabling developers to skip the initial setup and dive straight into the development of unique features.",
                image: "/images/hero-image.jpeg"
            },
            {
                title: "Built-In Practices",
                description: "With Codepilot, developers benefit from integrated best practices for coding, security, and scalability. This ensures that projects are not only developed faster but also maintain high standards of quality and performance..",
                image: "/images/hero-image.jpeg",
                direction: "rtl"
            },
            {
                title: "Scale and Perform",
                description: "Codepilot is designed with scalability in mind, allowing applications to grow seamlessly in terms of user base and functionality. It includes optimized configurations for performance, ensuring that applications remain fast and responsive as they scale.",
                image: "/images/hero-image.jpeg"
            },

        ],
    },
    faqSection: {
        title: "FAQ",
        description: "Frequently Asked Questions",
        faqs: [
            {
                "question": "What is Codepilot?",
                "answer": "Codepilot is a comprehensive SaaS boilerplate designed to help developers launch applications faster by providing a pre-configured foundation, ensuring best practices, and facilitating scalability."
            },
            {
                "question": "How can Codepilot reduce development time?",
                "answer": "Codepilot reduces development time by offering customizable templates and state-of-the-art tools that eliminate the need to build from scratch, allowing developers to focus on creating unique features."
            },
            {
                "question": "Is Codepilot suitable for beginners?",
                "answer": "Yes, Codepilot is designed to be user-friendly for beginners while offering advanced features for experienced developers, making it an ideal tool for projects of any size and complexity."
            },
            {
                "question": "Can I use Codepilot for commercial projects?",
                "answer": "Absolutely. Codepilot is built to support both personal and commercial projects, providing the scalability and robustness needed for enterprise-grade applications."
            },
            {
                "question": "What kind of support does Codepilot offer?",
                "answer": "Codepilot offers comprehensive support through documentation, a dedicated support team, and a community forum where users can share insights and seek help from fellow developers."
            },
            {
                "question": "How often is Codepilot updated?",
                "answer": "Codepilot is regularly updated to incorporate the latest development trends, security patches, and community feedback to ensure it remains at the forefront of technology."
            },
            {
                "question": "Does Codepilot offer customization options?",
                "answer": "Yes, Codepilot provides extensive customization options to ensure that developers can tailor their projects to meet specific requirements, making it a flexible solution for a wide range of applications."
            }
        ]

    },
    footer: {
        description: "Codepilot accelerates development by providing a pre-configured foundation that saves time, ensures best practices, and facilitates scalability, empowering you to focus on innovation.",
        footnote: "@%Date% Codepilot. All rights reserved."
    },
    loginPage: {
        title: "Log in",
        description: "Enter your credentials to access your account",
        forgotPassword: "Forgot your password?",
        remember: "Remember me",
        email: "Email",
        password: "Password",
        emailPlaceholder: "name@company.com",
        passwordPlaceholder: "Password",
        login: "Log in",
        register: "Sign up",
        notMember: "Not a member?",
        signWithGoogle: "Sign in with Google",
        signWithTwitter: "Sign in with Twitter",
    },
    registerPage: {
        title: "Sign Up",
        description: "Enter your credentials to register your account",
        forgotPassword: "Forgot your password?",
        remember: "Remember me",
        name: "Name",
        email: "Email",
        password: "Password",
        namePlaceholder: "John Doe",
        emailPlaceholder: "name@company.com",
        passwordPlaceholder: "Password",
        createAccount: "Create Account",
        register: "Sign up",
        notMember: "Not a member?",
        signWithGoogle: "Continue with Google",
        signWithTwitter: "Continue with Twitter",
    },
    forgotPasswordPage: {
        title: "Forgot your Password?",
        description: "Enter your email below and we’ll send you password reset instructions.",
        email: "Email",
        emailPlaceholder: "name@company.com",
        submit: "Submit",
    },
    resetPasswordPage: {
        title: "Reset password",
        description: "Enter your new password.",
        password: "Password",
        passwordPlaceholder: "Password",
        submit: "Confirm",
    },
}

export const siteConfig: Metadata = {
    applicationName: 'Codepilot',
    title: 'Codepilot - Launch in days, not weeks.',
    description: 'Ready to accelerate your development process?!',
    keywords: ['SaaS', 'boilerplate'],
    openGraph: {
        type: 'website',
        locale: 'en',
        siteName: 'Codepilot',
        url: 'www.Codepilot.dev',
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
