import { Metadata } from "next";

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
        title: "Create high-converting funnels in just 60 minutes",
        description: "Generate a steady flow of customers or talents with lightning-fast and easy-to-build Perspective Funnels. No design or programming skills required.",
        image: "https://s3-alpha-sig.figma.com/img/120e/c241/8f0118fdb790196d933c064ff2113490?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eX9qwXwHonKWPqjJM18Q7nYyr5P-LnvMc9VU4l3KY8rnrSGpcsc1BW3f1a0t5ZQCuzS5VbO6dG4AmzwAS-z9Duh42DuDSoTtuD6Ib4UWErZpoD79P1Hgt3miY6O-NzhVQ60S6tsXjsbSbbURiMNHSkPcxWdf63AO4o1Og~nL6tfo~0LDz5gesR4sXg7azrAdlvAJYghzjrN~RBK8rnIAqDLcSLrru6bR1yzSYJyp5kwFFbxrBpye2ZJg71tfVKSP9y8-aeEcCPIgCw3XEvCgqEQUU~oX4S70ULw57tRoDwwiUj2ZFB~eI32KOJ3ep7QeaPpgMdjfbHQfRHkqCz5tSg__"
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
    }
}

export const siteConfig: Metadata = {
    applicationName: 'Landing Page',
    title: 'Landing Page',
    description: 'Landing Page',
    keywords: ['Landing Page'],
    openGraph: {
        type: 'website',
        locale: 'en',
        siteName: 'Landing Page',
        url: '',
        title: 'Landing Page',
        description: 'Landing Page',
    },
    twitter: {
        card: 'summary',
        creator: '@Landing Page',
        creatorId: '',
    },
};
export default siteUrls
