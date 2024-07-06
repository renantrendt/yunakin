-- AlterTable
ALTER TABLE "MemberBenefitPageConfig" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OnboardingMemberBenefits" (
    "id" TEXT NOT NULL,
    "memberBenefitId" TEXT NOT NULL,
    "memberBenefitPageConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnboardingMemberBenefits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MemberBenefitPageConfig_clientSlug_idx" ON "MemberBenefitPageConfig"("clientSlug");

-- AddForeignKey
ALTER TABLE "OnboardingMemberBenefits" ADD CONSTRAINT "OnboardingMemberBenefits_memberBenefitId_fkey" FOREIGN KEY ("memberBenefitId") REFERENCES "MemberBenefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingMemberBenefits" ADD CONSTRAINT "OnboardingMemberBenefits_memberBenefitPageConfigId_fkey" FOREIGN KEY ("memberBenefitPageConfigId") REFERENCES "MemberBenefitPageConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
