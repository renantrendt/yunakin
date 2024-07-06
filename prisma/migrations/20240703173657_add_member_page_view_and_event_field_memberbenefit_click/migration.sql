-- AlterTable
ALTER TABLE "MemberBenefitClick" ADD COLUMN     "event" TEXT DEFAULT 'SAVE_BENEFIT';

-- CreateTable
CREATE TABLE "MemberPageViews" (
    "id" TEXT NOT NULL,
    "memberBenefitPageConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "MemberPageViews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberPageViews" ADD CONSTRAINT "MemberPageViews_memberBenefitPageConfigId_fkey" FOREIGN KEY ("memberBenefitPageConfigId") REFERENCES "MemberBenefitPageConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberPageViews" ADD CONSTRAINT "MemberPageViews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
