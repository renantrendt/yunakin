/*
  Warnings:

  - Added the required column `updatedAt` to the `MemberBenefitPageConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberBenefit" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MemberBenefitPageConfig" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "OtherMemberBenefit" (
    "id" TEXT NOT NULL,
    "memberBenefitId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtherMemberBenefit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OtherMemberBenefit" ADD CONSTRAINT "OtherMemberBenefit_memberBenefitId_fkey" FOREIGN KEY ("memberBenefitId") REFERENCES "MemberBenefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherMemberBenefit" ADD CONSTRAINT "OtherMemberBenefit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
