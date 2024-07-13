/*
  Warnings:

  - You are about to drop the column `font` on the `MemberBenefitPageConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MemberBenefitPageConfig" DROP COLUMN "font",
ADD COLUMN     "primaryFont" TEXT,
ADD COLUMN     "secondaryFont" TEXT;
