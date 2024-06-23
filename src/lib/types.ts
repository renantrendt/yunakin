import { Message } from "ai"

export interface Chat extends Record<string, any> {
    id: string
    title: string
    createdAt: Date
    userId: string
    path: string
    messages: Message[]
    sharePath?: string
}

export type ServerActionResult<Result> = Promise<
    | Result
    | {
        error: string
    }
>


export interface MemberBenefit {
    title:string;
    description:string;
    imageURL:string;
    domain:string;
    location:string;
    code:string;
    link:string;
}
