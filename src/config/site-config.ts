import { Metadata } from "next";
import platformConfig from "./app-config";


interface SiteUrls {
    navbar: {
        [key: string]: {
            label: string;
            url: string;
        }
    },
    general: {
        [key: string]: any;
    }

}

const siteUrls: SiteUrls = {
    navbar: {
        pricing: {
            label: "navbar.pricing",
            url: "/#pricing",
        },
        blog: {
            label: "navbar.blog",
            url: "/blogs",
        },
        features: {
            label: "navbar.features",
            url: "/#features",
        },
        docs: {
            label: "navbar.docs",
            url: "https://docs.codepilot.dev",
        }
    },
    general: {
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
}

export const siteCopy = {
    heroSection: {
        title: "heroSection.title",
        description: "heroSection.description",
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
        usedByCopy: "heroSection.usedByCopy",
    },
    ctaSection: {
        title: "ctaSection.title",
        description: "Codepilot accelerates development by providing a pre-configured foundation that saves time, ensures best practices, and facilitates scalability, empowering you to focus on innovation.",
        reasons: [
            {
                metric: "ctaSection.reasons.0.title",
                description: "ctaSection.reasons.0.description",
            },
            {
                metric: "ctaSection.reasons.1.title",
                description: "ctaSection.reasons.1.description",
            },
            {
                metric: "ctaSection.reasons.2.title",
                description: "ctaSection.reasons.2.description",
            },
        ]
    },

    featuresSection:
    {
        features: [
            {
                title: "features.feature.0.title",
                description: "features.feature.0.description",
                image: "/images/hero-image.jpeg"
            },
            {
                title: "features.feature.1.title",
                description: "features.feature.1.description",
                image: "/images/hero-image.jpeg",
                direction: "rtl"
            },
            {
                title: "features.feature.2.title",
                description: "features.feature.2.description",
                image: "/images/hero-image.jpeg"
            },

        ],
    },
    faqSection: {
        title: "faq.title",
        description: "faq.description",
        faqs: "faq.faqs",
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
    pricingPage: {
        title: "Enable the best experience",
        description: "Choose a plan and start your 14-day free trial. Generate appointments and leads or source talent online, risk-free.",
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
