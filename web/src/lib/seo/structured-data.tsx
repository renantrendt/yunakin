import { Metadata } from "next";

import Head from "next/head";

export type SEOSchemaType = "Article" | "WebPage" | "ProfilePage" | "SearchResultsPage";

export interface BlogSchemaOptions {
    title: string;
    datePublished: string;
    dateModified: string;
}


const renderArticleSchema = (options = {}) => {
    return `{
        "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Title of a News Article",
    "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
    ],
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T09:20:00+08:00",
    "author": [{
        "@type": "Person",
    "name": "Jane Doe",
    "url": "https://example.com/profile/janedoe123"
    },
    {
        "@type": "Person",
    "name": "John Doe",
    "url": "https://example.com/profile/johndoe123"
    }
    ]
     }`;
};

function renderSchematags(schemaType: SEOSchemaType = "Article", options: BlogSchemaOptions) {
    let content = "";

    switch (schemaType) {
        case "Article":
            content = renderArticleSchema(options);
        default:
    }


    return <>
        <Head>
            <script type="application/ld+json"

                dangerouslySetInnerHTML={{
                    __html: content
                }}
            >
            </script>
        </Head>
    </>
}

export default renderSchematags;