-- AlterTable
ALTER TABLE `film` MODIFY `year` INTEGER NULL,
    MODIFY `rating_kp` INTEGER NULL,
    MODIFY `rating_imdb` INTEGER NULL,
    MODIFY `age_restriction` INTEGER NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `slogan` VARCHAR(191) NULL,
    MODIFY `small_poster` VARCHAR(191) NULL,
    MODIFY `big_poster` VARCHAR(191) NULL,
    MODIFY `genres` VARCHAR(191) NULL,
    MODIFY `countries` VARCHAR(191) NULL;
