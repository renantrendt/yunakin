/*
  Warnings:

  - Made the column `pageConfigId` on table `MemberBenefit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MemberBenefit" ALTER COLUMN "pageConfigId" SET NOT NULL;
