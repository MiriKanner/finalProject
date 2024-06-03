CREATE SCHEMA `albumdb` ;

CREATE TABLE `albumdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `isactive` TINYINT NOT NULL DEFAULT 1,
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
    
    
INSERT INTO `albumdb`.`users` (`username`, `nickname`, `email`) VALUES ('MiriK', 'miri', 'm@gmail.com');
INSERT INTO `albumdb`.`users` (`username`, `nickname`, `email`) VALUES ('ayalaSch', 'ayala', 'a@gmail.com');

INSERT INTO `albumdb`.`auth` (`username`, `password`) VALUES ('ayalaSch', '47deee49b97a135b068c0833d4aeb57f3ff16fd3e47771e52d7e2da42acdf5a9');
INSERT INTO `albumdb`.`auth` (`username`, `password`) VALUES ('MiriK', '537d8f7ebb5487e3d0e9ae2c42d12d779e1385a6a6bf3e465640b03198509335');

INSERT INTO `albumdb`.`users` ( `username`, `nickname`, `email`, `isactive`) VALUES ( 'Hadasa', 'Dasi', 'd@gmailcom', '1');
INSERT INTO `albumdb`.`users` ( `username`, `nickname`, `email`, `isactive`) VALUES ( 'Michal', 'Michali', 'michal@gmailcom', '1');
INSERT INTO `albumdb`.`users` ( `username`, `nickname`, `email`, `isactive`) VALUES ( 'Tamar', 'Tami', 't@gmailcom', '1');
INSERT INTO `albumdb`.`users` ( `username`, `nickname`, `email`, `isactive`) VALUES ( 'YaelGlik', 'Yael', 'y@gmailcom', '1');
INSERT INTO `albumdb`.`childandparent` ( `idparent`, `idchild`, `isactive`) VALUES ( '1', '3', '1');
INSERT INTO `albumdb`.`childandparent` ( `idparent`, `idchild`, `isactive`) VALUES ( '2', '1', '1');
INSERT INTO `albumdb`.`childandparent` ( `idparent`, `idchild`, `isactive`) VALUES ( '2', '4', '1');
INSERT INTO `albumdb`.`childandparent` ( `idparent`, `idchild`, `isactive`) VALUES ( '1', '5', '1');
INSERT INTO `albumdb`.`childandparent` ( `idparent`, `idchild`, `isactive`) VALUES ( '1', '6', '1');


INSERT INTO `albumdb`.`album` (`id`, `name`, `childandparentid`, `creationdate`, `isactive`) VALUES ('1', 'myBirth', '1', '2024.2.1', '1');
INSERT INTO `albumdb`.`album` ( `name`, `childandparentid`, `creationdate`, `isactive`) VALUES ( 'myBirth', '2', '2024.2.1', '1');

ALTER TABLE `albumdb`.`users` 
ADD COLUMN `birthday` DATE NULL AFTER `isactive`;
ALTER TABLE `albumdb`.`auth` 
ADD UNIQUE INDEX `username_UNIQUE` (`username` ASC);
;
