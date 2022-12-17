/*
  Warnings:

  - You are about to drop the column `userVk_id` on the `Interest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_userVk_id_fkey";

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "userVk_id";
