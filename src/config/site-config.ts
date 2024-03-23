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
