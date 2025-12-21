/*
  Warnings:

  - A unique constraint covering the columns `[pomodoroId]` on the table `Reflection` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pomodoro` ADD COLUMN `abandonmentReason` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'COMPLETED', 'ABANDONED') NOT NULL DEFAULT 'ACTIVE',
    MODIFY `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `endedAt` DATETIME(3) NULL,
    MODIFY `duration` INTEGER NULL;

-- AlterTable
ALTER TABLE `reflection` MODIFY `optionalQuestion` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Pomodoro_userId_idx` ON `Pomodoro`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Reflection_pomodoroId_key` ON `Reflection`(`pomodoroId`);

-- CreateIndex
CREATE INDEX `Reflection_userId_idx` ON `Reflection`(`userId`);

-- CreateIndex
CREATE INDEX `Reflection_pomodoroId_idx` ON `Reflection`(`pomodoroId`);

-- AddForeignKey
ALTER TABLE `Pomodoro` ADD CONSTRAINT `Pomodoro_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reflection` ADD CONSTRAINT `Reflection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reflection` ADD CONSTRAINT `Reflection_pomodoroId_fkey` FOREIGN KEY (`pomodoroId`) REFERENCES `Pomodoro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
