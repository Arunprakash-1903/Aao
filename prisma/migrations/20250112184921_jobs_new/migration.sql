/*
  Warnings:

  - You are about to drop the column `role` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `role`,
    ADD COLUMN `Experience` INTEGER NULL,
    ADD COLUMN `company` VARCHAR(191) NULL,
    ADD COLUMN `company_about` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    MODIFY `salary` DOUBLE NULL;
