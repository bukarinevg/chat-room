/*
  Warnings:

  - Added the required column `private` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "private" BOOLEAN NOT NULL;
