/*
  Warnings:

  - The primary key for the `Interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Interest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Swipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Swipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserAchievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `achievment_id` column on the `UserAchievement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserPet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserPet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Swipes_from_key";

-- AlterTable
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Interest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Swipes" DROP CONSTRAINT "Swipes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Swipes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_pkey",
DROP COLUMN "achievment_id",
ADD COLUMN     "achievment_id" SERIAL NOT NULL,
ADD CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("achievment_id");

-- AlterTable
ALTER TABLE "UserPet" DROP CONSTRAINT "UserPet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserPet_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_id_key" ON "Interest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Swipes_id_key" ON "Swipes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_achievment_id_key" ON "UserAchievement"("achievment_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPet_id_key" ON "UserPet"("id");
