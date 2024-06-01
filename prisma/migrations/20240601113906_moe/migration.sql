/*
  Warnings:

  - You are about to drop the `UsersChats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersChats" DROP CONSTRAINT "UsersChats_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersChats" DROP CONSTRAINT "UsersChats_user_id_fkey";

-- DropTable
DROP TABLE "UsersChats";
