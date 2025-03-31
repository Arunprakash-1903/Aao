/*
  Warnings:

  - You are about to alter the column `jobType` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `jobTitle` VARCHAR(191) NULL,
    MODIFY `jobDescription` VARCHAR(191) NULL,
    MODIFY `jobType` VARCHAR(191) NULL;
