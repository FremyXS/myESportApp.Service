/*
  Warnings:

  - You are about to drop the `Apply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('female', 'male');

-- DropForeignKey
ALTER TABLE "Apply" DROP CONSTRAINT "Apply_game_id_fkey";

-- DropTable
DROP TABLE "Apply";

-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "User" (
    "vk_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "my_sex" "Sex" NOT NULL,
    "my_age" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("vk_id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "Swipes" (
    "id" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "To" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Swipes_pkey" PRIMARY KEY ("from")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "achievement_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("achievement_id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "achievment_id" TEXT NOT NULL,
    "count" SERIAL NOT NULL,
    "userVk_id" INTEGER NOT NULL,
    "achievementAchievement_id" INTEGER NOT NULL,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("achievment_id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userVk_id" INTEGER,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPet" (
    "id" TEXT NOT NULL,
    "pet_sex" "Sex" NOT NULL,
    "pet_name" TEXT NOT NULL,
    "pet_age" INTEGER NOT NULL,
    "userVk_id" INTEGER,
    "petPet_id" INTEGER NOT NULL,

    CONSTRAINT "UserPet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_vk_id_key" ON "User"("vk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_pet_id_key" ON "Pet"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Swipes_id_key" ON "Swipes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Swipes_from_key" ON "Swipes"("from");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_achievement_id_key" ON "Achievement"("achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_achievment_id_key" ON "UserAchievement"("achievment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_id_key" ON "Interest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPet_id_key" ON "UserPet"("id");

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userVk_id_fkey" FOREIGN KEY ("userVk_id") REFERENCES "User"("vk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementAchievement_id_fkey" FOREIGN KEY ("achievementAchievement_id") REFERENCES "Achievement"("achievement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userVk_id_fkey" FOREIGN KEY ("userVk_id") REFERENCES "User"("vk_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPet" ADD CONSTRAINT "UserPet_petPet_id_fkey" FOREIGN KEY ("petPet_id") REFERENCES "Pet"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPet" ADD CONSTRAINT "UserPet_userVk_id_fkey" FOREIGN KEY ("userVk_id") REFERENCES "User"("vk_id") ON DELETE SET NULL ON UPDATE CASCADE;
