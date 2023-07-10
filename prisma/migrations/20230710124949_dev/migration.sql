/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "User_role_key" ON "User"("role");
