/*
  Warnings:

  - Added the required column `expiresAt` to the `Pomodoro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pomodoro` ADD COLUMN `expiresAt` DATETIME(3) NOT NULL;
