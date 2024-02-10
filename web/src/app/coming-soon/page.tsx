import localFont from 'next/font/local'

import ComingSoonClient from "@/components/client/ComingSoonClient";
import getSeoMetadata from "@/lib/seo/seo";
import { Metadata } from "next";
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
    return getSeoMetadata({
        title: 'Coming Soon',
        description: 'Ready to accelerate your development process? Sign up to find out when we launch',
        openGraph: {
            title: 'Coming Soon',
            description: 'Ready to accelerate your development process? Sign up to find out when we launch',
            url: '/coming-soon',
            images: ["./images/logo.png"],
        }
    });
}
const uniSans = localFont({ src: '../fonts/uni-sans.heavy-caps.otf' });
const monaSans = localFont({ src: '../fonts/Mona-Sans-Light.otf' });
const ComingSoon = () => {
    return <ComingSoonClient uniSans={uniSans} monaSans={monaSans} />;
}

export default ComingSoon