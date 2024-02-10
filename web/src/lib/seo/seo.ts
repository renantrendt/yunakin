import { Metadata } from "next";

import { siteConfig } from "@/config/site-config";
function getSeoMetadata(options?: Metadata): Metadata {
    return {
        title: siteConfig.title,
        applicationName: siteConfig.applicationName,
        description: siteConfig.description,
        keywords: siteConfig.keywords,
        openGraph: {
            ...siteConfig.openGraph,
            ...options?.openGraph
        },
        twitter: {
            ...siteConfig.twitter,
            ...options?.twitter
        },
        ...options
    };
}


export default getSeoMetadata;