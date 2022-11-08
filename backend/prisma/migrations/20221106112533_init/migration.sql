-- DropIndex
DROP INDEX `Film_description_idx` ON `film`;

-- DropIndex
DROP INDEX `Film_name_russian_idx` ON `film`;

-- CreateIndex
CREATE FULLTEXT INDEX `Film_name_russian_description_idx` ON `Film`(`name_russian`, `description`);
