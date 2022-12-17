/*
  Warnings:

  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE pet_pet_id_seq;
ALTER TABLE "Pet" ALTER COLUMN "pet_id" SET DEFAULT nextval('pet_pet_id_seq');
ALTER SEQUENCE pet_pet_id_seq OWNED BY "Pet"."pet_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAchievement" ALTER COLUMN "count" SET DEFAULT 0,
ALTER COLUMN "count" DROP DEFAULT;
DROP SEQUENCE "UserAchievement_count_seq";
