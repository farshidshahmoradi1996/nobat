/*
  Warnings:

  - You are about to drop the column `cityId` on the `clinics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[city_id]` on the table `clinics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_id` to the `clinics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_cityId_fkey";

-- DropIndex
DROP INDEX "clinics_cityId_key";

-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "cityId",
ADD COLUMN     "city_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "clinic_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "clinics_city_id_key" ON "clinics"("city_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
