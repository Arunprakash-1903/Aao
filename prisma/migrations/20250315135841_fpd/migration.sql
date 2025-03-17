-- CreateTable
CREATE TABLE `FDP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `body` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `publishedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FDPapplyed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `fdpId` INTEGER NOT NULL,

    UNIQUE INDEX `FDPapplyed_userId_fdpId_key`(`userId`, `fdpId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FDPapplyed` ADD CONSTRAINT `FDPapplyed_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FDPapplyed` ADD CONSTRAINT `FDPapplyed_fdpId_fkey` FOREIGN KEY (`fdpId`) REFERENCES `FDP`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
