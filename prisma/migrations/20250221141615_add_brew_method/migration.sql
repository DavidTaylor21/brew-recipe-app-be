/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Grinder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brewMethod` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "brewMethod" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Grinder_name_key" ON "Grinder"("name");
