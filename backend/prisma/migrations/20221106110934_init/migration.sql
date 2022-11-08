-- CreateIndex
CREATE FULLTEXT INDEX `Film_name_russian_slogan_countries_idx` ON `Film`(`name_russian`, `slogan`, `countries`);
