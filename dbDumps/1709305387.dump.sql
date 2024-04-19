/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: plantcares
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `plantcares` (
  `id` varchar(255) NOT NULL,
  `operations` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: plants
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `plants` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `origin` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `plantTypeId` varchar(255) DEFAULT NULL,
  `plantCareId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plantTypeId` (`plantTypeId`),
  KEY `plantCareId` (`plantCareId`),
  CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`plantTypeId`) REFERENCES `planttypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `plants_ibfk_2` FOREIGN KEY (`plantCareId`) REFERENCES `plantcares` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `plants_ibfk_3` FOREIGN KEY (`plantTypeId`) REFERENCES `planttypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `plants_ibfk_4` FOREIGN KEY (`plantCareId`) REFERENCES `plantcares` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `Plants_plantCareId_foreign_idx` FOREIGN KEY (`plantCareId`) REFERENCES `plantcares` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `Plants_plantTypeId_foreign_idx` FOREIGN KEY (`plantTypeId`) REFERENCES `planttypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: planttypes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `planttypes` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: userplants
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `userplants` (
  `id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `plantId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `plantId` (`plantId`),
  CONSTRAINT `userplants_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userplants_ibfk_2` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userplants_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userplants_ibfk_4` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `UserPlants_plantId_foreign_idx` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `UserPlants_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: userrequests
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `userrequests` (
  `id` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `plantId` varchar(255) DEFAULT NULL,
  `userRequestTypeId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `plantId` (`plantId`),
  KEY `userRequestTypeId` (`userRequestTypeId`),
  CONSTRAINT `userrequests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_2` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_3` FOREIGN KEY (`userRequestTypeId`) REFERENCES `userrequesttypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_5` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_6` FOREIGN KEY (`userRequestTypeId`) REFERENCES `userrequesttypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_8` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `userrequests_ibfk_9` FOREIGN KEY (`userRequestTypeId`) REFERENCES `userrequesttypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: userrequesttypes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `userrequesttypes` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `userTypeId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email` (`email`),
  KEY `userTypeId` (`userTypeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `usertypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`userTypeId`) REFERENCES `usertypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `Users_userTypeId_foreign_idx` FOREIGN KEY (`userTypeId`) REFERENCES `usertypes` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usertasks
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usertasks` (
  `id` varchar(255) NOT NULL,
  `operationName` varchar(255) DEFAULT NULL,
  `operationDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isCompleted` tinyint(1) DEFAULT '0',
  `userId` varchar(255) DEFAULT NULL,
  `plantId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `plantId` (`plantId`),
  CONSTRAINT `usertasks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `usertasks_ibfk_2` FOREIGN KEY (`plantId`) REFERENCES `userplants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `usertasks_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `usertasks_ibfk_4` FOREIGN KEY (`plantId`) REFERENCES `userplants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `UserTasks_plantId_foreign_idx` FOREIGN KEY (`plantId`) REFERENCES `userplants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `UserTasks_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usertaskshistories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usertaskshistories` (
  `id` varchar(255) NOT NULL,
  `operationName` varchar(255) DEFAULT NULL,
  `operationDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isNewTaskCreated` tinyint(1) DEFAULT '0',
  `taskId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `plantId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `plantId` (`plantId`),
  CONSTRAINT `usertaskshistories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `usertaskshistories_ibfk_2` FOREIGN KEY (`plantId`) REFERENCES `userplants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `usertaskshistories_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `usertaskshistories_ibfk_4` FOREIGN KEY (`plantId`) REFERENCES `userplants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `UserTasksHistories_plantId_foreign_idx` FOREIGN KEY (`plantId`) REFERENCES `userplants` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `UserTasksHistories_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usertypes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usertypes` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: gettasksdescription
# ------------------------------------------------------------

CREATE OR REPLACE VIEW `gettasksdescription` AS
select
  `usertasks`.`id` AS `id`,
  `usertasks`.`operationName` AS `operationName`,
  `usertasks`.`operationDate` AS `operationDate`,
  `usertasks`.`userId` AS `userId`,
  `usertasks`.`plantId` AS `plantId`,
  `usertasks`.`isCompleted` AS `isCompleted`,
  `userplants`.`name` AS `userPlantName`,
  `plants`.`name` AS `plantName`
from
  (
  (
    `usertasks`
    join `userplants` on((`userplants`.`id` = `usertasks`.`plantId`))
  )
  join `plants` on((`plants`.`id` = `userplants`.`plantId`))
  );

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: getusers
# ------------------------------------------------------------

CREATE OR REPLACE VIEW `getusers` AS
select
  `users`.`id` AS `id`,
  `users`.`firstName` AS `firstName`,
  `users`.`lastName` AS `lastName`,
  `users`.`email` AS `email`,
  `usertypes`.`name` AS `role`,
  `usertypes`.`id` AS `roleId`
from
  (
  `users`
  join `usertypes` on((`users`.`userTypeId` = `usertypes`.`id`))
  )
order by
  `usertypes`.`name`;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: getusersrequests
# ------------------------------------------------------------

CREATE OR REPLACE VIEW `getusersrequests` AS
select
  `userrequests`.`id` AS `requestId`,
  `userrequests`.`description` AS `requestDescription`,
  `plants`.`name` AS `plantName`,
  `userrequests`.`createdAt` AS `requestDate`,
  `userrequests`.`userId` AS `userId`,
  `userrequesttypes`.`id` AS `userRequestTypeId`,
  `userrequesttypes`.`name` AS `requestStatus`
from
  (
  (
    `userrequests`
    join `plants` on((`userrequests`.`plantId` = `plants`.`id`))
  )
  join `userrequesttypes` on(
    (
    `userrequests`.`userRequestTypeId` = `userrequesttypes`.`id`
    )
  )
  )
order by
  `userrequests`.`createdAt` desc;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: plantslist
# ------------------------------------------------------------

CREATE OR REPLACE VIEW `plantslist` AS
select
  `plants`.`id` AS `id`,
  `plants`.`name` AS `name`,
  `plants`.`description` AS `description`,
  `plants`.`origin` AS `origin`,
  `plants`.`imageUrl` AS `imageUrl`,
  `plants`.`createdAt` AS `createdAt`,
  `planttypes`.`id` AS `plantTypeId`,
  `planttypes`.`name` AS `plantType`,
  `plantcares`.`id` AS `plantCareId`,
  `plantcares`.`operations` AS `plantCareOperations`
from
  (
  (
    `plants`
    left join `planttypes` on((`plants`.`plantTypeId` = `planttypes`.`id`))
  )
  left join `plantcares` on((`plants`.`plantCareId` = `plantcares`.`id`))
  )
order by
  `plants`.`createdAt` desc;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: userplantslist
# ------------------------------------------------------------

CREATE OR REPLACE VIEW `userplantslist` AS
select
  `userplants`.`userId` AS `userId`,
  `userplants`.`id` AS `userPlantId`,
  `userplants`.`name` AS `userPlantName`,
  `plants`.`id` AS `id`,
  `plants`.`name` AS `name`,
  `plants`.`description` AS `description`,
  `plants`.`origin` AS `origin`,
  `plants`.`imageUrl` AS `imageUrl`,
  `plants`.`createdAt` AS `createdAt`,
  `planttypes`.`id` AS `plantTypeId`,
  `planttypes`.`name` AS `plantType`,
  `plantcares`.`id` AS `plantCareId`,
  `plantcares`.`operations` AS `plantCareOperations`
from
  (
  (
    (
    `userplants`
    join `plants` on((`userplants`.`plantId` = `plants`.`id`))
    )
    left join `planttypes` on((`plants`.`plantTypeId` = `planttypes`.`id`))
  )
  left join `plantcares` on((`plants`.`plantCareId` = `plantcares`.`id`))
  )
order by
  `plants`.`createdAt` desc;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: plantcares
# ------------------------------------------------------------

INSERT INTO
  `plantcares` (`id`, `operations`, `createdAt`, `updatedAt`)
VALUES
  (
    '16cfd493-1ea6-4d51-a451-025d8155566d',
    '[{\"name\":\"watering\",\"frequency\":2}]',
    '2024-02-29 22:03:17',
    '2024-02-29 22:03:17'
  );
INSERT INTO
  `plantcares` (`id`, `operations`, `createdAt`, `updatedAt`)
VALUES
  (
    '3023a3b9-0e85-4d80-8557-925e6eb366af',
    '[{\"name\":\"watering\",\"frequency\":1},{\"name\":\"fertilizer\",\"frequency\":7}]',
    '2024-02-29 21:52:34',
    '2024-02-29 21:52:34'
  );
INSERT INTO
  `plantcares` (`id`, `operations`, `createdAt`, `updatedAt`)
VALUES
  (
    '545f5ade-891f-4655-ae3a-da7ac307351c',
    '[{\"name\":\"watering\",\"frequency\":1}]',
    '2024-02-29 21:59:17',
    '2024-02-29 21:59:17'
  );
INSERT INTO
  `plantcares` (`id`, `operations`, `createdAt`, `updatedAt`)
VALUES
  (
    'bda40879-bc82-4006-ab0a-ccba89d116bc',
    '[{\"name\":\"watering\",\"frequency\":2},{\"name\":\"feeding\",\"frequency\":5}]',
    '2024-02-29 22:01:01',
    '2024-02-29 22:01:01'
  );
INSERT INTO
  `plantcares` (`id`, `operations`, `createdAt`, `updatedAt`)
VALUES
  (
    'fc25408f-51bf-4f76-9f9a-0a6ee18d1736',
    '[{\"name\":\"watering\",\"frequency\":2}]',
    '2024-02-29 22:02:18',
    '2024-02-29 22:02:18'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: plants
# ------------------------------------------------------------

INSERT INTO
  `plants` (
    `id`,
    `name`,
    `description`,
    `origin`,
    `imageUrl`,
    `createdAt`,
    `updatedAt`,
    `plantTypeId`,
    `plantCareId`
  )
VALUES
  (
    '0e1068f9-a209-4087-a3b0-74532e43d422',
    'ZZ Plant (Zamioculcas zamiifolia)',
    ' ZZ plants have shiny, waxy leaves that grow upright from rhizomes. They are drought-tolerant and can thrive in low light conditions.\nCare Operations:\nLight: Low to moderate indirect light.\nWatering: Allow soil to dry out completely between waterings, as they are susceptible to root rot.\nSoil: Well-draining potting mix.\nTemperature: Can tolerate a wide range of temperatures but prefers warm conditions.\nMaintenance: Prune away any dead or yellowing leaves.',
    'East Africa',
    '/assets/download.jpg',
    '2024-02-29 22:03:17',
    '2024-02-29 22:03:17',
    '02751079-811d-4399-a7b8-351e8c9e2fb2',
    '16cfd493-1ea6-4d51-a451-025d8155566d'
  );
INSERT INTO
  `plants` (
    `id`,
    `name`,
    `description`,
    `origin`,
    `imageUrl`,
    `createdAt`,
    `updatedAt`,
    `plantTypeId`,
    `plantCareId`
  )
VALUES
  (
    '3a5f7c43-50c2-4fc9-a150-8b0a8cc72eea',
    'False Aralia',
    'A False Aralia, native to New Caledonia, has many different names depending who you ask: Dizygothica elegantissima, Schefflera Elegantissima, or Spider Aralia. Whatever you call it, this is a beautiful plant with long, narrow, serrated leaves in a palmate (finger-like) arrangement. The color of the leaves starts out as a reddish, coppery green and gradually turns into a lovely dark green. A False Aralia can be used as a table plant when small and, when it matures, as a tall, exotic looking indoor tree.  It’s a great plant to propagate using stem tip cuttings.\n\nTemperature:\nThese plants like warm temperatures between 65°-85°F (18-29°C). If the temperature dips below 60°F (15.6°C) a false aralia may drop leaves.\n\nHumidity:\nAralias require moderate to high humidity. If the air is too dry, a false aralia loses leaves.\n\nPests:\nSpider mites, scale, mealybugs, and aphids can all be aproble. Read more about these plant pests in the Glossary of the website.\n\nSoil:\nUse a good quality potting soil that retains moisture but still drains quickly.\n\nPot Size:\nAralias like to be a bit root- bound in small pots. Once the roots have filled the existing container, re-pot in the spring to the next size pot (nothing larger). Be sure there are drip holes in the bottom of the pot so excess water can escape.',
    'New Caledonia',
    '/assets/False-Aralia-100x150.jpg',
    '2024-02-29 21:52:34',
    '2024-02-29 21:52:34',
    '9f01fde7-86eb-4afc-b4bd-61e39798132d',
    '3023a3b9-0e85-4d80-8557-925e6eb366af'
  );
INSERT INTO
  `plants` (
    `id`,
    `name`,
    `description`,
    `origin`,
    `imageUrl`,
    `createdAt`,
    `updatedAt`,
    `plantTypeId`,
    `plantCareId`
  )
VALUES
  (
    '696010dd-7bc0-45c5-9cad-636d944c3dc6',
    'Peace Lily (Spathiphyllum spp.)',
    'Peace lilies feature glossy, dark green leaves and distinctive white flowers that resemble a white flag. They are known for their air-purifying properties. Care Operations:\nLight: Thrives in low to moderate indirect light.\nWatering: Keep soil consistently moist but not soggy. Wilting indicates it needs water.\nSoil: Well-draining potting mix with organic matter.\nTemperature: Prefers warm environments, avoid cold drafts.\nMaintenance: Wipe leaves to keep them clean and free of dust.',
    'Colombia ',
    '/assets/peace_plant_georgina198_gettyimages_0.jpg',
    '2024-02-29 22:02:18',
    '2024-02-29 22:02:18',
    'f687c49e-b0ec-49eb-af5b-307854246099',
    'fc25408f-51bf-4f76-9f9a-0a6ee18d1736'
  );
INSERT INTO
  `plants` (
    `id`,
    `name`,
    `description`,
    `origin`,
    `imageUrl`,
    `createdAt`,
    `updatedAt`,
    `plantTypeId`,
    `plantCareId`
  )
VALUES
  (
    '6af697fe-a1e7-49e0-b742-d306208d6f3c',
    'Snake Plant (Sansevieria trifasciata)',
    'Snake plants have long, upright leaves that are typically variegated with shades of green and yellow. They are known for their air-purifying abilities and can thrive in low light conditions.\nCare Operations:\nLight: Thrives in indirect light but can tolerate low light conditions.\nWatering: Allow soil to dry between waterings, as overwatering can cause root rot.\nSoil: Well-draining potting mix.\nTemperature: Prefers temperatures between 60-85°F (15-29°C).\nMaintenance: Wipe leaves occasionally to keep them dust-free.',
    'western Africa',
    '/assets/sansevieria-zeylanica-plant.jpg',
    '2024-02-29 21:59:17',
    '2024-02-29 21:59:17',
    '81883f0e-c583-4652-b677-5ba342eb3aa8',
    '545f5ade-891f-4655-ae3a-da7ac307351c'
  );
INSERT INTO
  `plants` (
    `id`,
    `name`,
    `description`,
    `origin`,
    `imageUrl`,
    `createdAt`,
    `updatedAt`,
    `plantTypeId`,
    `plantCareId`
  )
VALUES
  (
    'a29d2233-b1e9-4271-aecf-6047c8ef2564',
    'Spider Plant (Chlorophytum comosum)',
    'Spider plants have long, arching leaves that are often variegated with green and white stripes. They produce small white flowers and baby spider plantlets.\nCare Operations:\nLight: Moderate to bright, indirect light.\nWatering: Keep soil consistently moist but not waterlogged. Reduce watering in winter.\nSoil: Well-draining potting mix.\nTemperature: Average room temperature, avoid cold drafts.\nMaintenance: Remove spiderettes for propagation.',
    'South Africa',
    '/assets/Hierbabuena_0611_Revised.jpg',
    '2024-02-29 22:01:01',
    '2024-02-29 22:01:01',
    'f1a5eddb-1515-4f68-8e90-c617e374552e',
    'bda40879-bc82-4006-ab0a-ccba89d116bc'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: planttypes
# ------------------------------------------------------------

INSERT INTO
  `planttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '02751079-811d-4399-a7b8-351e8c9e2fb2',
    'Zamiifolia',
    '2024-02-29 22:03:17',
    '2024-02-29 22:03:17'
  );
INSERT INTO
  `planttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '81883f0e-c583-4652-b677-5ba342eb3aa8',
    'Eva',
    '2024-02-29 21:59:17',
    '2024-02-29 21:59:17'
  );
INSERT INTO
  `planttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '9f01fde7-86eb-4afc-b4bd-61e39798132d',
    'Aralia',
    '2024-02-29 21:52:34',
    '2024-02-29 21:52:34'
  );
INSERT INTO
  `planttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    'f1a5eddb-1515-4f68-8e90-c617e374552e',
    'Spider plants',
    '2024-02-29 22:01:01',
    '2024-02-29 22:01:01'
  );
INSERT INTO
  `planttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    'f687c49e-b0ec-49eb-af5b-307854246099',
    'Spathiphyllum',
    '2024-02-29 22:02:18',
    '2024-02-29 22:02:18'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: userplants
# ------------------------------------------------------------

INSERT INTO
  `userplants` (
    `id`,
    `createdAt`,
    `updatedAt`,
    `name`,
    `userId`,
    `plantId`
  )
VALUES
  (
    '05ed4ada-01d0-43eb-9e8b-fa18bf667e8d',
    '2024-02-29 22:09:56',
    '2024-03-01 08:18:22',
    'ZZ Plant (Zamioculcas zamiifolia)',
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '0e1068f9-a209-4087-a3b0-74532e43d422'
  );
INSERT INTO
  `userplants` (
    `id`,
    `createdAt`,
    `updatedAt`,
    `name`,
    `userId`,
    `plantId`
  )
VALUES
  (
    '127b24bc-75fc-47d4-a32c-a62fce8957c7',
    '2024-03-01 08:30:34',
    '2024-03-01 08:30:34',
    NULL,
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '696010dd-7bc0-45c5-9cad-636d944c3dc6'
  );
INSERT INTO
  `userplants` (
    `id`,
    `createdAt`,
    `updatedAt`,
    `name`,
    `userId`,
    `plantId`
  )
VALUES
  (
    'fdbf326f-f851-415a-bab7-7f3ba60c40f7',
    '2024-02-29 22:09:55',
    '2024-02-29 22:09:55',
    NULL,
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '696010dd-7bc0-45c5-9cad-636d944c3dc6'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: userrequests
# ------------------------------------------------------------

INSERT INTO
  `userrequests` (
    `id`,
    `description`,
    `createdAt`,
    `updatedAt`,
    `userId`,
    `plantId`,
    `userRequestTypeId`
  )
VALUES
  (
    '0d35aed0-ca3c-4765-a628-9541d64510d0',
    'Watering: Allow soil to dry out completely between waterings, as they are susceptible to root rot. Soil: Well-draining potting mix. - not correct',
    '2024-03-01 08:04:24',
    '2024-03-01 08:17:55',
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '0e1068f9-a209-4087-a3b0-74532e43d422',
    '7e781a8d-2b85-4a1f-8c4b-ddc91bd3e8c1'
  );
INSERT INTO
  `userrequests` (
    `id`,
    `description`,
    `createdAt`,
    `updatedAt`,
    `userId`,
    `plantId`,
    `userRequestTypeId`
  )
VALUES
  (
    '3719b648-94db-4706-8ed1-a683b72dd71a',
    'Incorrect information Maintenance: Prune away any dead or yellowing leaves.',
    '2024-02-29 22:56:39',
    '2024-02-29 22:57:07',
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '0e1068f9-a209-4087-a3b0-74532e43d422',
    '7e781a8d-2b85-4a1f-8c4b-ddc91bd3e8c1'
  );
INSERT INTO
  `userrequests` (
    `id`,
    `description`,
    `createdAt`,
    `updatedAt`,
    `userId`,
    `plantId`,
    `userRequestTypeId`
  )
VALUES
  (
    'c0a8fb01-581f-4b20-9688-f00019332c4c',
    'Temperature: Can tolerate a wide range of temperatures but prefers warm conditions. Maintenance: Prune away any dead or yellowing leaves. - incorrect',
    '2024-03-01 08:18:33',
    '2024-03-01 08:18:33',
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '0e1068f9-a209-4087-a3b0-74532e43d422',
    '7e781a8d-2b85-4a1f-8c4b-ddc91bd3e8c1'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: userrequesttypes
# ------------------------------------------------------------

INSERT INTO
  `userrequesttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '09e34511-3bd9-433b-8f89-2a423179f864',
    'Approved',
    '2024-03-01 08:01:38',
    '2024-03-01 08:01:38'
  );
INSERT INTO
  `userrequesttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '7e781a8d-2b85-4a1f-8c4b-ddc91bd3e8c1',
    'In review',
    '2024-03-01 08:01:38',
    '2024-03-01 08:01:38'
  );
INSERT INTO
  `userrequesttypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '8dc34344-4a1c-4978-8c72-f77d8673911f',
    'Canceled',
    '2024-03-01 08:01:38',
    '2024-03-01 08:01:38'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `email`,
    `password`,
    `firstName`,
    `lastName`,
    `createdAt`,
    `updatedAt`,
    `imageUrl`,
    `userTypeId`
  )
VALUES
  (
    '0bc0c5d5-bc91-499f-b5a8-53505942f9c1',
    'content_manager_user@gmail.com',
    '12345',
    'Manager1',
    'Manager',
    '2024-02-29 21:46:39',
    '2024-02-29 21:46:39',
    NULL,
    '8112134e-4e87-4aaa-96bd-d7574513fd69'
  );
INSERT INTO
  `users` (
    `id`,
    `email`,
    `password`,
    `firstName`,
    `lastName`,
    `createdAt`,
    `updatedAt`,
    `imageUrl`,
    `userTypeId`
  )
VALUES
  (
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    'test_user@gmail.com',
    '123456',
    'User',
    'User',
    '2024-02-29 21:46:39',
    '2024-03-01 08:43:19',
    '/assets/icons8_flower_400px.png',
    'f7a73bc3-eaaf-4edd-ba48-b341145d8361'
  );
INSERT INTO
  `users` (
    `id`,
    `email`,
    `password`,
    `firstName`,
    `lastName`,
    `createdAt`,
    `updatedAt`,
    `imageUrl`,
    `userTypeId`
  )
VALUES
  (
    '86c96832-de78-4046-a471-d724f36a2eff',
    'admin_user@gmail.com',
    'admin',
    'Admin',
    'Admin',
    '2024-02-29 21:46:39',
    '2024-02-29 21:46:39',
    NULL,
    '0c0ed5dc-de3c-419c-b1de-595ce6b43804'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usertasks
# ------------------------------------------------------------

INSERT INTO
  `usertasks` (
    `id`,
    `operationName`,
    `operationDate`,
    `createdAt`,
    `updatedAt`,
    `isCompleted`,
    `userId`,
    `plantId`
  )
VALUES
  (
    '57a72c97-afd2-4587-acb8-69a0fca3e5a1',
    'watering',
    '2024-03-03',
    '2024-02-29 22:09:56',
    '2024-02-29 22:09:56',
    0,
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '05ed4ada-01d0-43eb-9e8b-fa18bf667e8d'
  );
INSERT INTO
  `usertasks` (
    `id`,
    `operationName`,
    `operationDate`,
    `createdAt`,
    `updatedAt`,
    `isCompleted`,
    `userId`,
    `plantId`
  )
VALUES
  (
    '7bbafa0b-d014-4c84-ae95-38b70373d7ee',
    'watering',
    '2024-03-03',
    '2024-03-01 08:30:34',
    '2024-03-01 08:30:34',
    0,
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    '127b24bc-75fc-47d4-a32c-a62fce8957c7'
  );
INSERT INTO
  `usertasks` (
    `id`,
    `operationName`,
    `operationDate`,
    `createdAt`,
    `updatedAt`,
    `isCompleted`,
    `userId`,
    `plantId`
  )
VALUES
  (
    'a94d13f6-aed9-4c5c-b04e-3dcf6696312f',
    'watering',
    '2024-03-02',
    '2024-02-29 22:09:55',
    '2024-03-01 08:22:42',
    1,
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    'fdbf326f-f851-415a-bab7-7f3ba60c40f7'
  );
INSERT INTO
  `usertasks` (
    `id`,
    `operationName`,
    `operationDate`,
    `createdAt`,
    `updatedAt`,
    `isCompleted`,
    `userId`,
    `plantId`
  )
VALUES
  (
    'b6f4fdf7-0a84-4489-8207-6496bf31085f',
    'watering',
    '2024-03-04',
    '2024-03-01 08:22:42',
    '2024-03-01 08:22:42',
    0,
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    'fdbf326f-f851-415a-bab7-7f3ba60c40f7'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usertaskshistories
# ------------------------------------------------------------

INSERT INTO
  `usertaskshistories` (
    `id`,
    `operationName`,
    `operationDate`,
    `createdAt`,
    `updatedAt`,
    `isNewTaskCreated`,
    `taskId`,
    `userId`,
    `plantId`
  )
VALUES
  (
    '7ecf2088-fa9e-431a-aad2-6159fbae3d04',
    'watering',
    '2024-03-02',
    '2024-03-01 08:22:42',
    '2024-03-01 08:22:42',
    1,
    'a94d13f6-aed9-4c5c-b04e-3dcf6696312f',
    '7cedbf32-bb90-4fe7-b163-9a9a03ee6ef4',
    'fdbf326f-f851-415a-bab7-7f3ba60c40f7'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usertypes
# ------------------------------------------------------------

INSERT INTO
  `usertypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '0c0ed5dc-de3c-419c-b1de-595ce6b43804',
    'Admin',
    '2024-02-29 21:44:50',
    '2024-02-29 21:44:50'
  );
INSERT INTO
  `usertypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    '8112134e-4e87-4aaa-96bd-d7574513fd69',
    'Content Manager',
    '2024-02-29 21:44:50',
    '2024-02-29 21:44:50'
  );
INSERT INTO
  `usertypes` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (
    'f7a73bc3-eaaf-4edd-ba48-b341145d8361',
    'User',
    '2023-10-11 18:28:34',
    '2023-10-11 18:28:34'
  );

# ------------------------------------------------------------
# TRIGGER DUMP FOR: after_insert_user_plant
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS after_insert_user_plant;
DELIMITER ;;
CREATE TRIGGER `after_insert_user_plant` AFTER INSERT ON `userplants` FOR EACH ROW BEGIN
  	CALL createNewTasks(NEW.id, NEW.userId, DATE(NOW()), '');
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: before_delete_user_plant
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS before_delete_user_plant;
DELIMITER ;;
CREATE TRIGGER `before_delete_user_plant` BEFORE DELETE ON `userplants` FOR EACH ROW BEGIN
 	DELETE FROM usertasks WHERE plantId = OLD.id;
 	DELETE FROM usertaskshistories WHERE plantId = OLD.id;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: users_BEFORE_DELETE
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS users_BEFORE_DELETE;
DELIMITER ;;
CREATE TRIGGER `users_BEFORE_DELETE` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
	DELETE FROM userplants WHERE userId = OLD.id;
	DELETE FROM userrequests WHERE userId = OLD.id;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: after_update_user_task
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS after_update_user_task;
DELIMITER ;;
CREATE TRIGGER `after_update_user_task` AFTER UPDATE ON `usertasks` FOR EACH ROW BEGIN
	DECLARE result INT;
    IF (NEW.isCompleted = 1) THEN
		SELECT createTaskHistory(NEW.id) INTO result;
	END IF;
END;;
DELIMITER ;

# ------------------------------------------------------------
# TRIGGER DUMP FOR: after_update_user_task_history
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS after_update_user_task_history;
DELIMITER ;;
CREATE TRIGGER `after_update_user_task_history` AFTER UPDATE ON `usertaskshistories` FOR EACH ROW BEGIN
	IF (NEW.isNewTaskCreated = 1) THEN
    	CALL createNewTasks(NEW.plantId, NEW.userId, NEW.operationDate, NEW.operationName);
	END IF;
END;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
