-- DropForeignKey
ALTER TABLE "MemberBenefitClick" DROP CONSTRAINT "MemberBenefitClick_memberBenefitId_fkey";

-- AlterTable
ALTER TABLE "MemberBenefitClick" ADD COLUMN     "otherMemberBenefitId" TEXT,
ALTER COLUMN "memberBenefitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MemberBenefitClick" ADD CONSTRAINT "MemberBenefitClick_memberBenefitId_fkey" FOREIGN KEY ("memberBenefitId") REFERENCES "MemberBenefit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberBenefitClick" ADD CONSTRAINT "MemberBenefitClick_otherMemberBenefitId_fkey" FOREIGN KEY ("otherMemberBenefitId") REFERENCES "OtherMemberBenefit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
