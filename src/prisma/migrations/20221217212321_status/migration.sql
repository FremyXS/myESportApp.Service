/*
  Warnings:

  - You are about to drop the column `liked` on the `Swipes` table. All the data in the column will be lost.
  - Added the required column `status` to the `Swipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('accepted', 'waiting', 'canceled');

-- AlterTable
ALTER TABLE "Swipes" DROP COLUMN "liked",
ADD COLUMN     "status" "Status" NOT NULL;
