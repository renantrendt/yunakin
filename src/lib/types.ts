import { MemberBenefit, MemberBenefitPageConfig, OtherMemberBenefit } from "@prisma/client"
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
    partnerPageConfigIds?: string[]
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
    // FEATURED: "Featured",
    CATEGORY: "Category"
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

export interface OtherMemberBenefitWithMemberBenefit extends OtherMemberBenefit {
    memberBenefit: {
        id: string
        pageConfigId: string | null
    }
}

export interface AnalyticsCardStats {
    totalBenefits: number;
    totalWaitingBenefits: number;
    pageViews: number;
}
export interface AnalyticsChartNumberStats {
    totalSaves: number;
    totalClicks: number;
    totalClaims: number;
}
export interface AnalyticsChartStats {
    benefitsClicks: {
        title: string
        count: number
    }[]
    benefitsClaims: {
        title: string
        count: number
    }[]
    benefitsSaves: {
        title: string
        count: number
    }[]
    benefitsLiveAds: {
        title: string
        count: number
    }[]
}

export interface AnalyticsPartnerCardStats {
    totalPartners: number;
    totalWaitingPartners: number;
    pageViews: number;

}
export interface AnalyticsPartnerChartNumberStats {
    totalPageViews: number
    totalClicks: number
    totalClaims: number
    totalSaves: number
}

export interface AnalyticsPartnerChartStats {
    partnerPageViews: {
        title: string
        count: number
    }[]
    clicksByDeal: {
        title: string
        count: number
    }[]
    claimsByDeal: {
        title: string
        count: number
    }[]
    savesByDeal: {
        title: string
        count: number
    }[]
    revenueByAds: {
        title: string
        count: number
    }[]
}
export interface AnalyticsResponse {
    cardStats: AnalyticsCardStats
    chartNumberStats: AnalyticsChartNumberStats
    chartStats: AnalyticsChartStats
    partnerCardStats: AnalyticsPartnerCardStats
    partnerChartStats: AnalyticsPartnerChartStats
    partnerChartNumberStats: AnalyticsPartnerChartNumberStats
}