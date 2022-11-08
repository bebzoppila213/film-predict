-- DropIndex
DROP INDEX `Film_name_russian_slogan_countries_idx` ON `film`;

-- CreateIndex
CREATE FULLTEXT INDEX `Film_name_russian_idx` ON `Film`(`name_russian`);
