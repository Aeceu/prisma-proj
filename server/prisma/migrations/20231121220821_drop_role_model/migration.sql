/*
  Warnings:

  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `Role_userId_fkey`;

-- DropTable
DROP TABLE `role`;
