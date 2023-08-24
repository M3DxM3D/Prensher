-- Supprimer la base de données si elle existe
DROP DATABASE IF EXISTS `prensher`;

-- Créer la base de données
CREATE DATABASE `prensher`;

-- Utiliser la base de données créée
USE `prensher`;

-- -------------------------------------------------------
-- CRÉATION DES TABLES
-- -------------------------------------------------------
-- TABLE DES UTILISATEURS (USERS)
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `picture_url` LONGTEXT NULL,
    `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `has_accepted_invitation` TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- TABLE DES OBJETS (ITEMS)
DROP TABLE IF EXISTS `item`;

CREATE TABLE IF NOT EXISTS `item` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `picture` VARCHAR(255) NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `location` VARCHAR(255) NOT NULL,
    `is_available` TINYINT NULL,
    `type` VARCHAR(45) NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

-- TABLE DES COMMENTAIRES (COMMENT)
DROP TABLE IF EXISTS `comment`;

CREATE TABLE IF NOT EXISTS `comment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` MEDIUMTEXT NULL,
    `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `item_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

-- TABLE DES FAVORIS (FAVORITE)
DROP TABLE IF EXISTS `favorite`;

CREATE TABLE IF NOT EXISTS `favorite` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `item_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

-- TABLE DES CATÉGORIES (CATEGORY)
DROP TABLE IF EXISTS `category`;

CREATE TABLE IF NOT EXISTS `category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- TABLE DE LIAISON ENTRE CATÉGORIES ET OBJETS (CATEGORY_HAS_ITEM)
DROP TABLE IF EXISTS `category_has_item`;

CREATE TABLE IF NOT EXISTS `category_has_item` (
    `category_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
    FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB;

-- -------------------------------------------------------
-- AJOUT DU CONTENU
-- -------------------------------------------------------

-- UTILISATEURS
INSERT INTO `user` (
    `firstname`,
    `lastname`,
    `email`,
    `password`,
    `picture_url`,
    `has_accepted_invitation`
)
VALUES
    (
        'Mehdi',
        'Berbedj',
        'berbedj.mehdi@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$sFLuxVkfaF1+XG630y1VzQ$mZLbG8GWw6O3Fx0qUipFIHrmuRVktm2Cy5178IRbjOI',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/mehdi_zv4kmk.png',
        1
    ),
    -- Ajoutez d'autres utilisateurs si nécessaire
    (
        'Charlotte',
        'Garcia',
        'charlottegarcia@example.com',
        'hello',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        1
    );

-- OBJETS (ITEMS)
INSERT INTO `item` (
    `picture`,
    `title`,
    `description`,
    `location`,
    `is_available`,
    `type`,
    `user_id`
)
VALUES
   (
        'https://www.claires.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw0e2b3759/images/hi-res/97636_1.jpg?sw=2000&sh=2000&sm=fit',
        'sac',
        'joli sac en peau de nubuc, très peu porté, à prêter pour de super soirées',
        'paris',
        1,
        'accessoire',
        1
    ),
    -- Ajoutez d'autres objets si nécessaire
    (
        'https://pretik.org/media/o/o047d03bb4123479aaf1a3d03984f123b10754.jpg.200x200_q85_crop_detail_upscale.jpg',
        'sac',
        'joli sac en peau de nubuc, très peu porté, à prêter pour de super soirées',
        'paris',
        1,
        'accessoire',
        1
    );

-- COMMENTAIRES (COMMENT)
INSERT INTO `comment` (
    `content`,
    `creation_date`,
    `item_id`,
    `user_id`
)
VALUES
    (
        'Comment 1',
        '2023-06-21 12:00:00',
        1,
        1
    ),
    -- Ajoutez d'autres commentaires si nécessaire
    (
        'Comment 2',
        '2023-06-21 13:30:00',
        1,
        2
    );

-- FAVORIS (FAVORITE)
INSERT INTO `favorite` (`date`, `item_id`, `user_id`)
VALUES
    ('2023-06-21 12:00:00', 1, 1),
    -- Ajoutez d'autres favoris si nécessaire
    ('2023-06-21 13:30:00', 1, 2);

-- CATÉGORIES (CATEGORY)
INSERT INTO `category` (`name`)
VALUES
    ('Category 1'),
    ('Category 2');

-- TABLE DE LIAISON ENTRE CATÉGORIES ET OBJETS (CATEGORY_HAS_ITEM)
INSERT INTO `category_has_item` (`category_id`, `item_id`)
VALUES
    (1, 1),
    -- Ajoutez d'autres liaisons entre catégories et objets si nécessaire
    (2, 1);
