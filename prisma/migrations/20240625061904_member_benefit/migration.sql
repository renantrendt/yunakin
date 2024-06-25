-- CreateTable
CREATE TABLE "MemberBenefit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MemberBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberBenefitClick" (
    "id" TEXT NOT NULL,
    "memberBenefitId" TEXT NOT NULL,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberBenefitClick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberBenefit" ADD CONSTRAINT "MemberBenefit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberBenefitClick" ADD CONSTRAINT "MemberBenefitClick_memberBenefitId_fkey" FOREIGN KEY ("memberBenefitId") REFERENCES "MemberBenefit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
