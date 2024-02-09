import { Metadata } from "next";

import { siteConfig } from "@/config/site-config";
// eslint-disable-next-line 
function getSeoMetadata(options: Metadata): Metadata {
    return {
        title: siteConfig.siteName,
        applicationName: siteConfig.siteName,
        description: siteConfig.siteDescription,
        keywords: siteConfig.keywords,
        ...options
    };
}
