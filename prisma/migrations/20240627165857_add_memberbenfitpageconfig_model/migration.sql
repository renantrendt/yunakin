-- CreateTable
CREATE TABLE "MemberBenefitPageConfig" (
    "id" TEXT NOT NULL,
    "clientSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MemberBenefitPageConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberBenefitPageConfig_clientSlug_key" ON "MemberBenefitPageConfig"("clientSlug");

-- AddForeignKey
ALTER TABLE "MemberBenefitPageConfig" ADD CONSTRAINT "MemberBenefitPageConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
