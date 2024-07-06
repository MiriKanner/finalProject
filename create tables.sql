CREATE SCHEMA `albumdb` ;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isactive` tinyint NOT NULL DEFAULT '1',
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);
  
CREATE TABLE `childandparent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idparent` int NOT NULL,
  `idchild` int NOT NULL,
  `isactive` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idparent_idx` (`idparent`),
  KEY `idchild_idx` (`idchild`),
  CONSTRAINT `idchild` FOREIGN KEY (`idchild`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `idparent` FOREIGN KEY (`idparent`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
); 
    
CREATE TABLE `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '"My Album"',
  `childandparentid` int NOT NULL,
  `creationdate` date NOT NULL,
  `isactive` tinyint NOT NULL DEFAULT '1',
  `albumPhoto` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `c_idx` (`childandparentid`),
  CONSTRAINT `childsalbum` FOREIGN KEY (`childandparentid`) REFERENCES `childandparent` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
);
    
CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `user_idx` (`username`),
  CONSTRAINT `user` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE
);

CREATE TABLE `datatype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `itemsofalbum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creationdate` date NOT NULL,
  `idalbum` int NOT NULL,
  `idtype` int NOT NULL,
  `data` longtext NOT NULL,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idalbum_idx` (`idalbum`),
  KEY `idtype_idx` (`idtype`),
  CONSTRAINT `idalbum` FOREIGN KEY (`idalbum`) REFERENCES `album` (`id`),
  CONSTRAINT `idtype` FOREIGN KEY (`idtype`) REFERENCES `datatype` (`id`)
);



INSERT INTO `albumdb`.`datatype` (`description`) VALUES ('image');
INSERT INTO `albumdb`.`datatype` (`description`) VALUES ('icon');
INSERT INTO `albumdb`.`datatype` (`description`) VALUES ('video');
INSERT INTO `albumdb`.`datatype` (`description`) VALUES ('story');