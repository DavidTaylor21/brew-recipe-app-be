-- DropForeignKey
ALTER TABLE "Grinder" DROP CONSTRAINT "Grinder_userId_fkey";

-- CreateTable
CREATE TABLE "_GrinderToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GrinderToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GrinderToUser_B_index" ON "_GrinderToUser"("B");

-- AddForeignKey
ALTER TABLE "_GrinderToUser" ADD CONSTRAINT "_GrinderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Grinder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrinderToUser" ADD CONSTRAINT "_GrinderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
