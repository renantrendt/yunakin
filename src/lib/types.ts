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


export type MemberBenefitPageConfigDto = {
    title: string
    description: string
    imageURL: string
    benefits?: string[]
    userId?: string
    clientSlug: string
}


export enum MemberBenefitClickType {
    SAVE_BENEFIT = "SAVE_BENEFIT",
    CLAIM_BENEFIT = "CLAIM_BENEFIT",
}