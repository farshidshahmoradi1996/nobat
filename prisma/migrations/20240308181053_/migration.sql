/*
  Warnings:

  - You are about to drop the column `telphone` on the `clinics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "telphone",
ADD COLUMN     "telephone" VARCHAR(30);
