/*
  Warnings:

  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(180)`.
  - You are about to alter the column `roles` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `settings` JSON NULL,
    MODIFY `email` VARCHAR(180) NOT NULL,
    MODIFY `roles` VARCHAR(20) NOT NULL DEFAULT 'user',
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `phone` VARCHAR(45) NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `allergenek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `neve` VARCHAR(255) NOT NULL,
    `kod` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asztalok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `etterem_id` INTEGER NOT NULL,
    `ferohely` INTEGER NOT NULL,
    `elerheto` INTEGER NOT NULL DEFAULT 1,
    `kod` VARCHAR(45) NOT NULL,

    INDEX `FK_asztalok_etteremId_ettermek`(`etterem_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city_zip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cit_zip` VARCHAR(8) NULL,
    `cit_name` VARCHAR(64) NULL,
    `cit_cty_code` VARCHAR(2) NULL,
    `cit_lat` FLOAT NULL,
    `cit_long` FLOAT NULL,
    `cit_cso_code` INTEGER NULL,
    `cit_rig_id` INTEGER NULL,
    `cit_range` FLOAT NULL,
    `cit_population` INTEGER NULL,
    `cit_homes` INTEGER NULL,

    INDEX `cit_zip`(`cit_zip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etterem_kategoria_rend` (
    `etterem_id` INTEGER NOT NULL,
    `kategoria_id` INTEGER NOT NULL,

    INDEX `FK_etteremKategoriaRend_etteremId_ettermek`(`etterem_id`),
    INDEX `FK_etteremKategoriaRend_kategoriaId_kategoriak`(`kategoria_id`),
    PRIMARY KEY (`etterem_id`, `kategoria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etterem_konyhatipus_rend` (
    `konyha_tipus_id` INTEGER NOT NULL,
    `etterem_id` INTEGER NOT NULL,

    INDEX `FK_etteremKonyhatipusRend_tipusId_konyhatipusok`(`konyha_tipus_id`),
    INDEX `FK_etteremKonyhatipusokRend_etteremId_ettermek`(`etterem_id`),
    PRIMARY KEY (`etterem_id`, `konyha_tipus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etterem_nyelv` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kod` VARCHAR(2) NOT NULL,
    `etterem_id` INTEGER NOT NULL,
    `nyelv` VARCHAR(45) NOT NULL,

    INDEX `etterem_nyelv_ettermek_id_fk`(`etterem_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etterem_tipus_rend` (
    `etterem_id` INTEGER NOT NULL,
    `tipus_id` INTEGER NOT NULL,

    INDEX `FK_EtteremKatRend_etteremId_ettermek`(`etterem_id`),
    INDEX `FK_EtteremKatRend_kategoriaId_kategoriak`(`tipus_id`),
    PRIMARY KEY (`etterem_id`, `tipus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etterem_tipusok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipus` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ettermek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_id` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `adoszam` VARCHAR(13) NOT NULL,
    `lang` FLOAT NULL,
    `long` FLOAT NULL,
    `telefon` VARCHAR(45) NULL,
    `email` VARCHAR(255) NULL,
    `nyitvatartas` JSON NULL,
    `weblap` VARCHAR(255) NULL,
    `img_path` VARCHAR(255) NULL,
    `img_bg_path` VARCHAR(255) NULL,

    INDEX `FK_ettermek_cityId_cityZip`(`city_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foglalasok` (
    `id` INTEGER NOT NULL,
    `asztal_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,
    `etterem_id` INTEGER NOT NULL,
    `kezdet` DATETIME(0) NOT NULL,
    `vege` DATETIME(0) NOT NULL,
    `foglalas_ideje` TIMESTAMP(0) NOT NULL,

    INDEX `FK_foglalasok_asztalId_asztalok`(`asztal_id`),
    INDEX `FK_foglalasok_etteremId_ettermek`(`etterem_id`),
    INDEX `FK_foglalasok_userId_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategoriak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategoria` VARCHAR(255) NOT NULL,
    `parent_id` INTEGER NULL,

    INDEX `asd_idx`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konyhatipusok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipus` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `etterem_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `muvelet` VARCHAR(45) NOT NULL,
    `Table_name` VARCHAR(45) NOT NULL,
    `FIeld_name` VARCHAR(45) NOT NULL,
    `Field_value_old` VARCHAR(45) NOT NULL,
    `Field_value_new` VARCHAR(45) NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rendeles_statusz` (
    `id` INTEGER NOT NULL,
    `statusz` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rendelesek` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `etterem_id` INTEGER NOT NULL,
    `statusz_id` INTEGER NOT NULL,
    `termek_id` INTEGER NOT NULL,
    `asztal_id` INTEGER NULL,
    `mennyiseg` INTEGER NOT NULL,
    `rendeles_ideje` TIMESTAMP(0) NOT NULL,
    `kupon` VARCHAR(45) NULL,
    `rendeles_id` INTEGER NOT NULL,

    INDEX `FK_rendelesek_asztalId_asztalok`(`asztal_id`),
    INDEX `FK_rendelesek_etteremId_ettermek`(`etterem_id`),
    INDEX `FK_rendelesek_statuszId_rendelesStatusz`(`statusz_id`),
    INDEX `FK_rendelesek_termekId_termekek`(`termek_id`),
    INDEX `FK_rendelesek_userId_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `termekek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `etterem_id` INTEGER NOT NULL,
    `kategoria_id` INTEGER NULL,
    `ar_forint` DOUBLE NOT NULL,
    `ar_euro` DOUBLE NULL,
    `mennyiség` VARCHAR(45) NULL,
    `img_path` VARCHAR(255) NULL,
    `elerheto` INTEGER NOT NULL DEFAULT 0,

    INDEX `FK_termekek_etteremId_ettermek`(`etterem_id`),
    INDEX `FK_termekek_kategoriaId_kategoriak`(`kategoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `termekek_allergenek_rend` (
    `allergen_id` INTEGER NOT NULL,
    `termek_id` INTEGER NOT NULL,

    INDEX `FK_allergenekRend_termekId_termekek`(`termek_id`),
    INDEX `FK_termekekAllergenekRend_allergenId_allergenek`(`allergen_id`),
    PRIMARY KEY (`allergen_id`, `termek_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `termekek_fordito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `termek_id` INTEGER NOT NULL,
    `nyelv_kod` VARCHAR(2) NOT NULL,
    `termek_nev` VARCHAR(45) NULL,
    `termek_leiras` VARCHAR(255) NULL,

    INDEX `FK_312`(`termek_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_user_etteremId_ettermek` ON `user`(`etterem_id`);

-- AddForeignKey
ALTER TABLE `asztalok` ADD CONSTRAINT `FK_asztalok_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_kategoria_rend` ADD CONSTRAINT `FK_etteremKategoriaRend_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_kategoria_rend` ADD CONSTRAINT `FK_etteremKategoriaRend_kategoriaId_kategoriak` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_konyhatipus_rend` ADD CONSTRAINT `FK_etteremKonyhatipusokRend_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_konyhatipus_rend` ADD CONSTRAINT `FK_etteremKonyhatipusRend_tipusId_konyhatipusok` FOREIGN KEY (`konyha_tipus_id`) REFERENCES `konyhatipusok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_nyelv` ADD CONSTRAINT `etterem_nyelv_ettermek_id_fk` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_tipus_rend` ADD CONSTRAINT `FK_EtteremKatRend_kategoriaId_kategoriak` FOREIGN KEY (`tipus_id`) REFERENCES `etterem_tipusok`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etterem_tipus_rend` ADD CONSTRAINT `FK_EtteremKatRend_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ettermek` ADD CONSTRAINT `FK_ettermek_cityId_cityZip` FOREIGN KEY (`city_id`) REFERENCES `city_zip`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `foglalasok` ADD CONSTRAINT `FK_foglalasok_asztalId_asztalok` FOREIGN KEY (`asztal_id`) REFERENCES `asztalok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `foglalasok` ADD CONSTRAINT `FK_foglalasok_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `foglalasok` ADD CONSTRAINT `FK_foglalasok_userId_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `kategoriak` ADD CONSTRAINT `FK_kategoria_parent` FOREIGN KEY (`parent_id`) REFERENCES `kategoriak`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rendelesek` ADD CONSTRAINT `FK_rendelesek_asztalId_asztalok` FOREIGN KEY (`asztal_id`) REFERENCES `asztalok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rendelesek` ADD CONSTRAINT `FK_rendelesek_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rendelesek` ADD CONSTRAINT `FK_rendelesek_statuszId_rendelesStatusz` FOREIGN KEY (`statusz_id`) REFERENCES `rendeles_statusz`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rendelesek` ADD CONSTRAINT `FK_rendelesek_termekId_termekek` FOREIGN KEY (`termek_id`) REFERENCES `termekek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rendelesek` ADD CONSTRAINT `FK_rendelesek_userId_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `termekek` ADD CONSTRAINT `FK_termekek_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `termekek` ADD CONSTRAINT `FK_termekek_kategoriaId_kategoriak` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `termekek_allergenek_rend` ADD CONSTRAINT `FK_termekekAllergenekRend_allergenId_allergenek` FOREIGN KEY (`allergen_id`) REFERENCES `allergenek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `termekek_allergenek_rend` ADD CONSTRAINT `FK_allergenekRend_termekId_termekek` FOREIGN KEY (`termek_id`) REFERENCES `termekek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `termekek_fordito` ADD CONSTRAINT `FK_310` FOREIGN KEY (`termek_id`) REFERENCES `termekek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `FK_user_etteremId_ettermek` FOREIGN KEY (`etterem_id`) REFERENCES `ettermek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `UNIQ_8D93D649E7927C74`;
