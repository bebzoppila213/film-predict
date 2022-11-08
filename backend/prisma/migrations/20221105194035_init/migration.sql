-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_russian` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `rating_kp` INTEGER NOT NULL,
    `rating_imdb` INTEGER NOT NULL,
    `age_restriction` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `slogan` VARCHAR(191) NOT NULL,
    `small_poster` VARCHAR(191) NOT NULL,
    `big_poster` VARCHAR(191) NOT NULL,
    `genres` VARCHAR(191) NOT NULL,
    `countries` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnFilms` (
    `userId` INTEGER NOT NULL,
    `filmId` INTEGER NOT NULL,
    `like` BOOLEAN NOT NULL,

    PRIMARY KEY (`userId`, `filmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnFilms` ADD CONSTRAINT `UsersOnFilms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnFilms` ADD CONSTRAINT `UsersOnFilms_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
