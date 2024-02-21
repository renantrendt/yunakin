export enum Plans {
  PRO,
  BUSINESS,
  ADVANCED
}
const platformConfig = {
  name: 'NextSaaSStack',
  stripe: {
    plans: [
      {
        "name": "Pro",
        "price_id": "price_1OcSRuDikzGwEbQe1s3fsSEQ"
      },
      {
        name: "Business",
        price_id: "price_1OcSSdDikzGwEbQe2hJq3Ljk"
      },
      {
        name: "Premium",
        price_id: "price_1OcSSyDikzGwEbQeVMVeiGts"
      },
    ]
  },
  features: {
    blog: {
      "strapi_enabled": false,
    },
  },
  pricing: {
    plans: {
      pro: {
        name: "Pro",
        price: 29.99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID,
      },
      business: {
        name: "Business",
        price: 59.99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID
      },
      advanced: {
        name: "Startup",
        price: 79.99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: process.env.NEXT_PUBLIC_STRIPE_ADVANCED_PLAN_ID
      },
      pro_yearly: {
        name: "Pro",
        price: 19.99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID,
      },
      business_yearly: {
        name: "Business",
        price: 49.99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID
      },
      advanced_yearly: {
        name: "Startup",
        price: 69.99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: process.env.NEXT_PUBLIC_STRIPE_ADVANCED_PLAN_ID
      },
    },
    features: [
      {
        name: "Feature 1",
        plans: [Plans.PRO, Plans.BUSINESS, Plans.ADVANCED],
      },
      {
        name: "Feature 2",
        plans: [Plans.PRO, Plans.BUSINESS, Plans.ADVANCED],
      },
      {
        name: "Feature 3",
        plans: [Plans.PRO, Plans.BUSINESS, Plans.ADVANCED],
      },
      {
        name: "Feature 4",
        plans: [Plans.BUSINESS, Plans.ADVANCED],
      },
      {
        name: "Feature 5",
        plans: [Plans.BUSINESS, Plans.ADVANCED],
      },
      {
        name: "Feature 6",
        plans: [Plans.BUSINESS, Plans.ADVANCED],
      },
      {
        name: "Feature 7",
        plans: [Plans.ADVANCED],
      },
      {
        name: "Feature 8",
        plans: [Plans.ADVANCED],
      },
      {
        name: "Feature 9",
        plans: [Plans.ADVANCED],
      }
    ]
  },
  variables: {
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    NEXT_PUBLIC_PAGE_LIMIT: process.env.NEXT_PUBLIC_PAGE_LIMIT,
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_JWT_SECRET: process.env.NEXTAUTH_JWT_SECRET,
    NEXT_URL: process.env.NEXT_URL,
    NEXT_PUBLIC_STRAPI_API_URL_LOCAL: process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL,
    NEXT_PUBLIC_STRIPE_PRO_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID,
    GOOGLE_ANALYTICS_ENABLED: process.env.GOOGLE_ANALYTICS_ENABLED,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  }
}

export default platformConfig
