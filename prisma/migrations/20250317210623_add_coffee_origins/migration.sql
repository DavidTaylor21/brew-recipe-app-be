/*
  Warnings:

  - You are about to drop the column `originId` on the `Coffee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coffee" DROP CONSTRAINT "Coffee_originId_fkey";

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "originId";

-- CreateTable
CREATE TABLE "CoffeeOrigin" (
    "coffeeId" INTEGER NOT NULL,
    "originId" INTEGER NOT NULL,

    CONSTRAINT "CoffeeOrigin_pkey" PRIMARY KEY ("coffeeId","originId")
);

-- AddForeignKey
ALTER TABLE "CoffeeOrigin" ADD CONSTRAINT "CoffeeOrigin_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeOrigin" ADD CONSTRAINT "CoffeeOrigin_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Origin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
