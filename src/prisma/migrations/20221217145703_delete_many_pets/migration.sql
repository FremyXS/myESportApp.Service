/*
  Warnings:

  - You are about to drop the column `userVk_id` on the `UserPet` table. All the data in the column will be lost.
  - Added the required column `image` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPetId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPet" DROP CONSTRAINT "UserPet_userVk_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserPet" DROP COLUMN "userVk_id";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPetId_fkey" FOREIGN KEY ("userPetId") REFERENCES "UserPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
