import { allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

    const base_url = process.env.NEXT_URL || "https://demo.codepilot.dev"
    const landingPages = [
        "/",
        "/pricing",
    ]

    return [
        ...landingPages.map((page) => ({
            url: base_url + page,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 0.8
        })),
        ...allPosts.map((post) => ({
            url: `${base_url}/blogs${post.slug}`,
            lastModified: post.publishedAt,
            changeFrequency: "daily" as const,
            priority: 0.8
        }))
    ]
}