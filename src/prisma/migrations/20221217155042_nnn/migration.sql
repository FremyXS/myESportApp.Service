/*
  Warnings:

  - Added the required column `pet_breed_id` to the `UserPet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPet" ADD COLUMN     "pet_breed_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserInterests" (
    "id" INTEGER NOT NULL,
    "userVk_id" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "UserInterests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInterests" ADD CONSTRAINT "UserInterests_userVk_id_fkey" FOREIGN KEY ("userVk_id") REFERENCES "User"("vk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterests" ADD CONSTRAINT "UserInterests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
