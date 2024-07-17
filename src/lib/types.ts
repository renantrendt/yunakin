import { MemberBenefit } from "@prisma/client"
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

export type MemberBenefitLinkClickDto = {
    memberBenefitId: string
    otherMemberBenefitId?: string
    device?: string
    browser?: string
    os?: string
    event: MemberBenefitClickType
}
export type MemberPageViewDto = {
    memberBenefitPageConfigId: string
    device?: string
    browser?: string
    os?: string
}


export enum MemberBenefitClickType {
    SAVE_BENEFIT = "SAVE_BENEFIT",
    CLAIM_BENEFIT = "CLAIM_BENEFIT",
    LOCATION_CLICK = "LOCATION_CLICK",
    WEBSITE_CLICK = "WEBSITE_CLICK",
}



export enum MemberBenefitVisibility {
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
    OWNED_PRIVATE = "OWNED_PRIVATE",
    OWNED_PUBLIC = "OWNED_PUBLIC",
}

export enum PartnershipType {
    ADS = "ADS",
    SPONSOR = "SPONSOR",
    NEEDS_APPROVAL = "NEEDS_APPROVAL",
}

export enum DealType {
    COMPANY = "COMPANY",
    PARTNER = "PARTNER"
}


export const selectMemberBenefitFilter = {
    NEW: "New",
    FEATURED: "Featured",
}
export type MemberBenefitFilter = keyof typeof selectMemberBenefitFilter

export interface SelectedMemberBenefit extends MemberBenefit {
    selected: boolean
}


export interface MemberBenefitWithImport extends MemberBenefit {
    import?: boolean
}

export type MemberBenefitFilterOptions = {
    category?: {
        label: string; selected: boolean;
    }[];
    imported?: {
        label: string; selected: boolean;
    }[];
    partnership_types?: {
        label: string; selected: boolean;
    }[];
    location?: {
        label: string; selected: boolean;
    }[];
    status?: {
        label: string; selected: boolean;
    }[];
};

export type Filter = { [K in keyof MemberBenefitFilterOptions]?: MemberBenefitFilterOptions[K]; };