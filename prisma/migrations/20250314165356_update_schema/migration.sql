/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_GrinderToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `originId` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roasteryId` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GrinderToUser" DROP CONSTRAINT "_GrinderToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GrinderToUser" DROP CONSTRAINT "_GrinderToUser_B_fkey";

-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "custom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originId" INTEGER NOT NULL,
ADD COLUMN     "roasteryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "_GrinderToUser";

-- CreateTable
CREATE TABLE "UserGrinder" (
    "userId" INTEGER NOT NULL,
    "grinderId" INTEGER NOT NULL,

    CONSTRAINT "UserGrinder_pkey" PRIMARY KEY ("userId","grinderId")
);

-- CreateTable
CREATE TABLE "Origin" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Origin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roastery" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roastery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Origin_country_key" ON "Origin"("country");

-- CreateIndex
CREATE UNIQUE INDEX "Roastery_name_key" ON "Roastery"("name");

-- AddForeignKey
ALTER TABLE "UserGrinder" ADD CONSTRAINT "UserGrinder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGrinder" ADD CONSTRAINT "UserGrinder_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Origin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
