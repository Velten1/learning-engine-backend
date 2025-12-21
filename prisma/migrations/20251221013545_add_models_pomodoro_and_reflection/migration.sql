-- CreateTable
CREATE TABLE `Pomodoro` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `endedAt` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reflection` (
    `id` VARCHAR(191) NOT NULL,
    `pomodoroId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `whatIThought` VARCHAR(191) NOT NULL,
    `whatItActuallyIs` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `mandatoryQuestion` VARCHAR(191) NOT NULL,
    `optionalQuestion` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
