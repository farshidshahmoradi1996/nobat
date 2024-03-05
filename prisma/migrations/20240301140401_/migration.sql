/*
  Warnings:

  - You are about to drop the column `userId` on the `specifics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "specifics" DROP CONSTRAINT "specifics_userId_fkey";

-- AlterTable
ALTER TABLE "specifics" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_SpecificToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecificToUser_AB_unique" ON "_SpecificToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecificToUser_B_index" ON "_SpecificToUser"("B");

-- AddForeignKey
ALTER TABLE "_SpecificToUser" ADD CONSTRAINT "_SpecificToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "specifics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecificToUser" ADD CONSTRAINT "_SpecificToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
