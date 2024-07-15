import React from "react";
import Typography from "../atomic/typography/Typography";
import { MemberBenefitPageConfig } from "@prisma/client";
interface PageHeaderProps {
    title: string
    description: string
    config?: MemberBenefitPageConfig
}

export default function PageHeader({ title, description, config }: PageHeaderProps) {
    return (
        <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5'>
            <Typography type="h1" className={`font-black text-center text-[32px] leading-[110%] lg:text-5xl font-${config?.primaryFont}`}
                style={{
                    color: config?.textColor as string,
                }}
            >{title}</Typography>
            <Typography type="p" className="text-base text-neutral-600 font-normal lg:text-xl"
                style={{
                    color: config?.textColor as string,
                }}
            >{description}</Typography>

        </div>
    );
}