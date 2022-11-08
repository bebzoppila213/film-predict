/*
  Warnings:

  - Made the column `description` on table `film` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `film` MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Film_description_idx` ON `Film`(`description`);
