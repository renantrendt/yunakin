/*
  Warnings:

  - Made the column `visibility` on table `MemberBenefit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MemberBenefit" ALTER COLUMN "visibility" SET NOT NULL;
