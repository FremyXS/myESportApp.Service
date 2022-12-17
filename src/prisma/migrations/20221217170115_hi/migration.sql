/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `UserInterests` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE userinterests_id_seq;
ALTER TABLE "UserInterests" ALTER COLUMN "id" SET DEFAULT nextval('userinterests_id_seq');
ALTER SEQUENCE userinterests_id_seq OWNED BY "UserInterests"."id";

-- CreateIndex
CREATE UNIQUE INDEX "UserInterests_id_key" ON "UserInterests"("id");
