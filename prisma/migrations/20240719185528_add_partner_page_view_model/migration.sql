-- CreateTable
CREATE TABLE "PartnerPageViews" (
    "id" TEXT NOT NULL,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "pageConfigId" TEXT NOT NULL,
    "partnerPageConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerPageViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PartnerPageViews_pageConfigId_idx" ON "PartnerPageViews"("pageConfigId");

-- AddForeignKey
ALTER TABLE "PartnerPageViews" ADD CONSTRAINT "PartnerPageViews_pageConfigId_fkey" FOREIGN KEY ("pageConfigId") REFERENCES "MemberBenefitPageConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
