CREATE SCHEMA `albumdb` ;

CREATE TABLE `albumdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `isactive` TINYINT NOT NULL DEFAULT 1,
  `userscol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));
  
CREATE TABLE `albumdb`.`childandparent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idparent` INT NOT NULL,
  `idchild` INT NOT NULL,
    `isactive` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `idparent_idx` (`idparent` ASC),
  INDEX `idchild_idx` (`idchild` ASC),
  CONSTRAINT `idparent`
    FOREIGN KEY (`idparent`)
    REFERENCES `albumdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `idchild`
    FOREIGN KEY (`idchild`)
    REFERENCES `albumdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
    
    
    CREATE TABLE `albumdb`.`album` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL DEFAULT '\"My Album\"',
  `childandparentid` INT NOT NULL,
  `creationdate` DATE NOT NULL,
  `isactive` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `c_idx` (`childandparentid` ASC),
  CONSTRAINT `childsalbum`
    FOREIGN KEY (`childandparentid`)
    REFERENCES `albumdb`.`childandparent` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
    
    CREATE TABLE `albumdb`.`auth` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `user_idx` (`username` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`username`)
    REFERENCES `albumdb`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
    
