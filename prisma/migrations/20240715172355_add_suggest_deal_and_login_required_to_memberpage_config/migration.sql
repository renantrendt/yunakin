-- AlterTable
ALTER TABLE "MemberBenefitPageConfig" ADD COLUMN     "loginRequired" BOOLEAN DEFAULT false,
ADD COLUMN     "suggestDeal" BOOLEAN DEFAULT true;
