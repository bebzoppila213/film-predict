-- CreateIndex
CREATE FULLTEXT INDEX `Film_name_russian_description_genres_idx` ON `Film`(`name_russian`, `description`, `genres`);
